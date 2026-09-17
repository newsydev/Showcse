import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import {
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';

function getSessionId() {
  try {
    let id = sessionStorage.getItem('showcase_visitor_id');
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem('showcase_visitor_id', id);
    }
    return id;
  } catch {
    return 'v_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
  }
}

export function useLiveVisitors() {
  const [liveCount, setLiveCount] = useState(1);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLiveCount(1);
      setIsLive(false);
      return;
    }

    const sessionId = getSessionId();
    const myVisitorRef = ref(db, `online_visitors/${sessionId}`);
    const connectedRef = ref(db, '.info/connected');
    const allVisitorsRef = ref(db, 'online_visitors');

    const markOnline = () => {
      onDisconnect(myVisitorRef).remove();
      set(myVisitorRef, {
        active: true,
        joinedAt: serverTimestamp(),
        lastSeen: Date.now(),
      }).catch((err) => console.warn('Presence write error:', err));
    };

    // Mark online immediately
    markOnline();

    // Re-mark online whenever Firebase network reconnects
    const unsubscribeConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        markOnline();
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    });

    // Listen to all active visitors in real time
    const unsubscribeVisitors = onValue(allVisitorsRef, (snap) => {
      const data = snap.val();
      if (data && typeof data === 'object') {
        const count = Object.keys(data).length;
        setLiveCount(Math.max(1, count));
      } else {
        setLiveCount(1);
      }
    }, (err) => {
      console.warn('Presence read error:', err);
    });

    // Keep-alive heartbeat every 20 seconds
    const heartbeatTimer = setInterval(() => {
      set(myVisitorRef, {
        active: true,
        lastSeen: Date.now(),
      }).catch(() => {});
    }, 20000);

    // Clean up only on actual window unload or pagehide
    const handleUnload = () => {
      set(myVisitorRef, null);
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      unsubscribeConnected();
      unsubscribeVisitors();
      clearInterval(heartbeatTimer);
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
      // NOTE: We do NOT delete myVisitorRef here because React StrictMode
      // will immediately unmount and remount during development.
      // onDisconnect and beforeunload handle real tab closures.
    };
  }, []);

  return { liveCount, isLive, isConfigured: isFirebaseConfigured };
}
