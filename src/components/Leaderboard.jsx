const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };

export default function Leaderboard({ projects = [], onInspect }) {
  // Show top 3 submissions (first 3 entries from the sheet)
  const top3 = projects.slice(0, 3);

  if (top3.length === 0) return null;

  return (
    <section id="hall-of-fame" className="w-full px-4 lg:px-12 py-10 border-t border-[#30363d] bg-[#11161d]">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#f0f6fc] font-semibold uppercase tracking-wider" style={{ ...monoStyle, fontSize: 11 }}>
            <span className="material-symbols-outlined text-[17px] text-[#d29922]">military_tech</span>
            <span>COHORT STANDINGS // TOP SUBMISSIONS</span>
          </div>
          <span className="hidden sm:inline text-[#6e7681]" style={{ ...monoStyle, fontSize: 11 }}>
            {projects.length} TOTAL SUBMISSIONS
          </span>
        </div>

        {/* Table */}
        <div className="rounded-lg bg-[#161b22] border border-[#30363d] divide-y divide-[#30363d] overflow-hidden">
          {top3.map((entry, i) => {
            const rank = String(i + 1).padStart(2, '0');
            const memberNames = entry.members?.map(m => m.name).join(', ') || '—';
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 sm:px-4 hover:bg-[#21262d]/50 transition-colors gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-6 h-6 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d] flex items-center justify-center font-semibold shrink-0"
                    style={{ ...monoStyle, fontSize: 12 }}
                  >
                    {rank}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-[#f0f6fc] truncate" style={{ fontFamily: 'Geist, sans-serif' }}>
                        {entry.teamName}
                      </span>
                      <span className="hidden sm:inline text-[#8b949e] truncate max-w-[200px]" style={{ ...monoStyle, fontSize: 10 }}>
                        {entry.datasetName}
                      </span>
                    </div>
                    <div className="text-[#6e7681] truncate" style={{ ...monoStyle, fontSize: 10 }}>
                      {memberNames}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Link badges */}
                  {entry.githubUrl && (
                    <a href={entry.githubUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="hidden md:flex items-center gap-1 text-[#c9d1d9] hover:text-white transition-colors"
                      style={{ ...monoStyle, fontSize: 10 }}
                    >
                      <span className="material-symbols-outlined text-[13px]">code</span> GitHub
                    </a>
                  )}
                  {entry.youtubeUrl && (
                    <a href={entry.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="hidden md:flex items-center gap-1 text-[#f87171] hover:text-red-400 transition-colors"
                      style={{ ...monoStyle, fontSize: 10 }}
                    >
                      <span className="material-symbols-outlined text-[13px]">play_circle</span> Demo
                    </a>
                  )}
                  <button
                    onClick={() => onInspect(entry)}
                    className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-colors"
                    style={{ ...monoStyle, fontSize: 11 }}
                  >
                    Inspect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
