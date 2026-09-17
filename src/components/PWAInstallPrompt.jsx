import { useState, useEffect } from 'react';

/**
 * PWAInstallPrompt
 * Shows a bottom-of-screen install banner when the browser fires
 * the `beforeinstallprompt` event (Chrome / Edge / Android).
 * The banner is dismissed permanently once the user installs or dismisses it.
 */
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if user already dismissed this session
    const dismissed = sessionStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) return;

    const handler = (e) => {
      e.preventDefault();        // prevent the mini-infobar
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('pwa-prompt-dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm">
      <div className="flex items-center gap-3 bg-[#1e3a5f] text-white rounded-2xl px-4 py-3 shadow-2xl border border-white/10">
        {/* Icon */}
        <img
          src="/pwa-64x64.png"
          alt="App icon"
          className="w-10 h-10 rounded-xl shrink-0 object-contain bg-white/10 p-1"
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
            Install ML Showcase
          </p>
          <p className="text-[11px] text-white/70 mt-0.5 leading-snug" style={{ fontFamily: 'Geist, sans-serif' }}>
            Add to Home Screen for offline access
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDismiss}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
            aria-label="Dismiss"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-xl bg-white text-[#1e3a5f] text-xs font-bold hover:bg-white/90 transition-colors cursor-pointer"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
