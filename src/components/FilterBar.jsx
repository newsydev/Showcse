const monoStyle = { fontFamily: 'JetBrains Mono, monospace', fontSize: 11 };

export default function FilterBar({
  search, setSearch,
  techFilter, setTechFilter,
  sortBy, setSortBy,
  searchRef,
  techFilters = [],
}) {
  return (
    <section id="discover" className="w-full px-4 lg:px-12 pt-2 pb-8">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-3">

        {/* Search + sort dock */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 p-2 rounded-lg bg-[#161b22] border border-[#30363d] shadow-sm">
          {/* Search input */}
          <div className="relative flex-1 flex items-center min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 text-[#6e7681] text-[17px]">search</span>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams, datasets, problem statements..."
              className="w-full pl-9 pr-12 py-1.5 rounded bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-[#6e7681]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]" style={{ ...monoStyle, fontSize: 10 }}>⌘K</span>
          </div>

          {/* Sort + validated badge */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-[#0d1117] py-1 px-2.5 rounded border border-[#30363d] text-[#8b949e]" style={monoStyle}>
              <span className="material-symbols-outlined text-[15px] text-[#6e7681]">swap_vert</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#c9d1d9] focus:outline-none cursor-pointer pr-1 text-xs"
                style={monoStyle}
              >
                <option value="newest">Latest Submission</option>
                <option value="name">Team Name A–Z</option>
              </select>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#238636]/15 border border-[#238636]/40 text-[#3fb950]" style={monoStyle}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
              <span className="font-medium">VERIFIED SUBMISSIONS</span>
            </div>
          </div>
        </div>

        {/* Dataset quick-filter chips */}
        {techFilters.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="shrink-0 mr-1 flex items-center gap-1 text-[#6e7681]" style={monoStyle}>
              <span className="material-symbols-outlined text-[13px]">dataset</span> DATASET:
            </span>
            {techFilters.map((t) => (
              <button
                key={t.value}
                onClick={() => setTechFilter(t.value)}
                className={`px-2.5 py-1 rounded border transition-colors shrink-0 text-xs ${
                  techFilter === t.value
                    ? 'bg-[#21262d] text-white border-[#8b949e]/40 font-medium'
                    : 'bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#c9d1d9] border-[#30363d]'
                }`}
                style={monoStyle}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
