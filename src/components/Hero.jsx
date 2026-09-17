export default function Hero({ submissionCount = 0, institutionCount = 0 }) {
  const subLabel = submissionCount > 0 ? `${submissionCount} Active` : '—';
  const instLabel = institutionCount > 0 ? `${institutionCount} Labs` : '—';
  const pillLabel = submissionCount > 0 ? `${submissionCount} VERIFIED BUILDS ONLINE` : 'LOADING...';
  return (
    <section id="explore" className="w-full px-4 lg:px-12 pt-10 pb-8 relative">
      {/* Subtle background grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="matrix-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#8b949e" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-grid)" />
        </svg>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col items-center text-center gap-4">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
          <span className="uppercase tracking-wider text-[#3fb950] font-medium" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
            CAPSTONE 2025
          </span>
          <span className="text-[#30363d]">•</span>
          <span className="uppercase tracking-wider text-[#8b949e]" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
            {pillLabel}
          </span>
        </div>

        {/* Hero heading */}
        <div className="flex flex-col items-center max-w-4xl">
          <h1
            className="text-[32px] sm:text-[52px] leading-tight font-bold tracking-tight text-[#f0f6fc]"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '-0.03em' }}
          >
            ENGINEERED TO SHIP.<br />
            <span className="text-[#8b949e] font-normal">STUDENT PROJECT REGISTRY</span>
          </h1>
          <p className="text-[#8b949e] max-w-2xl mt-3 font-normal text-base leading-7" style={{ fontFamily: 'Geist, sans-serif' }}>
            Inspect verified production architectures, live interactive endpoints, and peer-audited repositories built across {institutionCount} engineering faculties.
          </p>
        </div>

        {/* Metric badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#161b22] border border-[#30363d]"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
          >
            <span className="text-[#6e7681] uppercase tracking-wider">SUBMISSIONS</span>
            <span className="text-[#58a6ff] font-semibold">{subLabel}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#161b22] border border-[#30363d]"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
          >
            <span className="text-[#6e7681] uppercase tracking-wider">INSTITUTIONS</span>
            <span className="text-[#f0f6fc] font-semibold">{instLabel}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#161b22] border border-[#30363d]"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
          >
            <span className="text-[#6e7681] uppercase tracking-wider">AVG COHORT XP</span>
            <span className="text-[#3fb950] font-semibold">92.4 / 100</span>
          </div>
          <a
            href="#hall-of-fame"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-all"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
          >
            <span className="material-symbols-outlined text-[15px] text-[#d29922]">military_tech</span>
            <span>Cohort XP Standings</span>
          </a>
        </div>
      </div>
    </section>
  );
}
