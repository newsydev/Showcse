const monoStyle = { fontFamily: 'JetBrains Mono, monospace', fontSize: 11 };

export default function FilterBar({
  search, setSearch,
  techFilter, setTechFilter,
  sortBy, setSortBy,
  searchRef,
  techFilters = [],
}) {
  return (
    <section id="discover" className="w-full px-4 lg:px-12 pt-2 pb-8 bg-white">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-3">

        {/* Search + sort dock */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
          {/* Search input */}
          <div className="relative flex-1 flex items-center min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">search</span>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams, datasets, problem statements..."
              className="w-full pl-9 pr-12 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-colors placeholder:text-slate-400 shadow-2xs"
              style={{ fontFamily: 'Geist, sans-serif' }}
            />
            <span className="absolute right-2.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200 font-mono text-[10px]">⌘K</span>
          </div>

          {/* Sort + validated badge */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-white py-1.5 px-2.5 rounded-lg border border-slate-200 text-slate-700 shadow-2xs" style={monoStyle}>
              <span className="material-symbols-outlined text-[15px] text-slate-400">swap_vert</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-700 focus:outline-none cursor-pointer pr-1 text-xs font-medium"
                style={monoStyle}
              >
                <option value="newest">Latest Submission</option>
                <option value="name">Team Name A–Z</option>
              </select>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold" style={monoStyle}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>VERIFIED SUBMISSIONS</span>
            </div>
          </div>
        </div>

        {/* Dataset quick-filter chips */}
        {techFilters.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="shrink-0 mr-1 flex items-center gap-1 text-slate-500 font-semibold text-[11px]" style={monoStyle}>
              <span className="material-symbols-outlined text-[14px]">dataset</span> DATASET:
            </span>
            {techFilters.map((t) => (
              <button
                key={t.value}
                onClick={() => setTechFilter(t.value)}
                className={`px-2.5 py-1 rounded-lg border transition-colors shrink-0 text-xs cursor-pointer ${
                  techFilter === t.value
                    ? 'bg-blue-900 text-white border-blue-900 font-semibold shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
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
