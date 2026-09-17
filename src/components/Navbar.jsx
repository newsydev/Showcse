import { useState } from 'react';
import { useLiveVisitors } from '../hooks/useLiveVisitors';

export default function Navbar({ _onSearchFocus }) {
  const { liveCount, isConfigured } = useLiveVisitors();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#explore',  icon: 'explore',  label: 'Explore'    },
    { href: '#discover', icon: 'layers',   label: 'All Builds' },
    { href: '#about',    icon: 'info',     label: 'About'      },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      {/* ── Main bar ── */}
      <div className="w-full px-4 lg:px-12 py-2 flex items-center justify-between gap-3">

        {/* Left: Logo + University Names */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* University Seal */}
          <a href="#" className="shrink-0 flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/csjm_logo.png"
              alt="Chhatrapati Shahu Ji Maharaj University Kanpur Logo"
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain drop-shadow-2xs"
            />
          </a>

          {/* University Names — truncate gracefully on small screens */}
          <div className="flex flex-col justify-center min-w-0">
            <h1
              className="text-[11px] sm:text-[14px] font-bold text-[#1f2937] leading-tight tracking-tight truncate"
              style={{ fontFamily: 'Hanken Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Chhatrapati Shahu Ji Maharaj University, Kanpur
            </h1>
            <p className="text-[9px] sm:text-[11px] text-[#6b7280] font-medium tracking-tight truncate hidden xs:block">
              Uttar Pradesh State University (Formerly Kanpur University, Kanpur)
            </p>
          </div>

          {/* NAAC A++ Badge — only on md+ */}
          <div className="shrink-0 hidden md:flex items-center ml-1">
            <img
              src="/naaca++.png"
              alt="NAAC Accredited With Grade A++"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Right: Nav icons (desktop) + Live badge + Hamburger (mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Nav icons — hidden on mobile, shown sm+ */}
          <nav className="hidden sm:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {navLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                title={label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition-all text-xs font-medium"
              >
                <span className="material-symbols-outlined text-[19px]">{icon}</span>
                <span className="hidden xl:inline text-xs font-semibold">{label}</span>
              </a>
            ))}
          </nav>

          {/* Live Visitor Count Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#238636] text-white text-xs font-semibold border border-[#3fb950]/30 shadow-xs select-none"
            title={isConfigured ? 'Real-time live visitors via Firebase' : 'Live on site'}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="font-mono text-xs font-bold tracking-tight whitespace-nowrap">
              {liveCount}
              <span className="hidden sm:inline"> {liveCount === 1 ? 'Live Visitor' : 'Live Visitors'}</span>
              <span className="sm:hidden"> Live</span>
            </span>
          </div>

          {/* Hamburger — only on mobile */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-all text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
