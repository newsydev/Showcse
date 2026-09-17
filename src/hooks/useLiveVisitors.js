import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import {
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';

export function useLiveVisitors() {
  const [liveCount, setLiveCount] = useState(1);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLiveCount(1);
      setIsLive(false);
      return;
    }

    try {
      const connectedRef = ref(db, '.info/connected');
      const onlineVisitorsRef = ref(db, 'online_visitors');
      const myVisitorRef = push(onlineVisitorsRef);

      const unsubscribeConnected = onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          // Remove session automatically on disconnect/tab close
          onDisconnect(myVisitorRef).remove();

          // Mark this visitor as online
          set(myVisitorRef, {
            joinedAt: serverTimestamp(),
          });
          setIsLive(true);
        } else {
          setIsLive(false);
        }
      });

      // Track total active visitors count in real time
      const unsubscribeVisitors = onValue(onlineVisitorsRef, (snap) => {
        const val = snap.val();
        if (val) {
          const count = Object.keys(val).length;
          setLiveCount(Math.max(1, count));
        } else {
          setLiveCount(1);
        }
      });

      return () => {
        unsubscribeConnected();
        unsubscribeVisitors();
        set(myVisitorRef, null);
      };
    } catch (err) {
      console.warn('Firebase presence initialization note:', err);
      setLiveCount(1);
      setIsLive(false);
    }
  }, []);

  return { liveCount, isLive, isConfigured: isFirebaseConfigured };
}
