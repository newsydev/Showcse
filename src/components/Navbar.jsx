import { useLiveVisitors } from '../hooks/useLiveVisitors';

export default function Navbar({ _onSearchFocus }) {
  const { liveCount, isConfigured } = useLiveVisitors();

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      <div className="w-full px-4 lg:px-12 py-2 flex items-center justify-between gap-4">
        
        {/* Left: University Seal, Names, and NAAC A++ Badge */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* University Seal */}
          <a href="#" className="shrink-0 flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/csjm_logo.png"
              alt="Chhatrapati Shahu Ji Maharaj University Kanpur Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-2xs"
            />
          </a>

          {/* University Names */}
          <div className="flex flex-col justify-center">
            <h1
              className="text-xs sm:text-[15px] font-bold text-[#1f2937] leading-tight tracking-tight"
              style={{ fontFamily: 'Hanken Grotesk, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Chhatrapati Shahu Ji Maharaj University, Kanpur
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#6b7280] font-medium tracking-tight">
              Uttar Pradesh State University (Formerly Kanpur University, Kanpur)
            </p>
          </div>

          {/* NAAC A++ Badge */}
          <div className="shrink-0 hidden md:flex items-center ml-1 sm:ml-2">
            <img
              src="/naaca++.png"
              alt="NAAC Accredited With Grade A++"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* Right Corner: Three Icons (Explore, All Builds, About) + Submission Count Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Three Navigation Icons */}
          <nav className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {/* 1. Explore Icon */}
            <a
              href="#explore"
              title="Explore"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition-all text-xs font-medium"
            >
              <span className="material-symbols-outlined text-[19px]">explore</span>
              <span className="hidden xl:inline text-xs font-semibold">Explore</span>
            </a>

            {/* 2. All Builds Icon */}
            <a
              href="#discover"
              title="All Builds"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition-all text-xs font-medium"
            >
              <span className="material-symbols-outlined text-[19px]">layers</span>
              <span className="hidden xl:inline text-xs font-semibold">All Builds</span>
            </a>

            {/* 3. About Icon */}
            <a
              href="#about"
              title="About"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition-all text-xs font-medium"
            >
              <span className="material-symbols-outlined text-[19px]">info</span>
              <span className="hidden xl:inline text-xs font-semibold">About</span>
            </a>
          </nav>

          {/* Live Visitor Count Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#238636] text-white text-xs font-semibold border border-[#3fb950]/30 transition-all shadow-xs select-none"
            title={isConfigured ? 'Real-time live visitors via Firebase' : 'Live on site'}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="font-mono text-xs font-bold tracking-tight">
              {liveCount} <span className="hidden sm:inline">{liveCount === 1 ? 'Live Visitor' : 'Live Visitors'}</span><span className="sm:hidden">Live</span>
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
