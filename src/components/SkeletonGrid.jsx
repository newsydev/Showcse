/**
 * SkeletonCard — mirrors the exact layout of SheetCard with a shimmer pulse.
 * Each block matches a real content region: badge row, title, description,
 * dataset/target rows, member list, and the action tray.
 */
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border-2 border-slate-200 flex flex-col overflow-hidden shadow-xs">
      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3.5 flex-1">

        {/* Badge row — team number + member count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 rounded-md bg-slate-200 animate-pulse" />
            <div className="h-4 w-10 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="h-5 w-20 rounded-full bg-slate-100 animate-pulse" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2 mt-0.5">
          <div className="h-4 w-4/5 rounded bg-slate-200 animate-pulse" />
          <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-slate-100 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-slate-100 animate-pulse" />
        </div>

        {/* Dataset row */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 w-4 rounded bg-slate-200 animate-pulse shrink-0" />
          <div className="h-3 w-12 rounded bg-slate-100 animate-pulse" />
          <div className="h-3 w-32 rounded bg-slate-200 animate-pulse" />
        </div>

        {/* Target variable row */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-slate-200 animate-pulse shrink-0" />
          <div className="h-3 w-10 rounded bg-slate-100 animate-pulse" />
          <div className="h-5 w-24 rounded-md bg-blue-50 animate-pulse border border-blue-100" />
        </div>

        {/* Member list */}
        <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2.5">
          <div className="h-2.5 w-24 rounded bg-slate-100 animate-pulse mb-0.5" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 rounded bg-slate-200 animate-pulse" style={{ width: `${48 + i * 8}%` }} />
              <div className="h-3 w-16 rounded bg-slate-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Action tray */}
      <div className="px-5 py-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-6 w-16 rounded-lg bg-slate-100 animate-pulse" />
          <div className="h-6 w-14 rounded-lg bg-amber-50 animate-pulse" />
        </div>
        <div className="h-4 w-12 rounded bg-slate-100 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * SkeletonGrid — renders N skeleton cards in the same grid as ProjectGrid.
 * Also fakes the FilterBar search + chip area above it.
 */
export function SkeletonGrid({ count = 9 }) {
  return (
    <section className="w-full px-4 lg:px-12 pt-2 pb-16 bg-white">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-6">

        {/* FilterBar skeleton */}
        <div className="flex flex-col gap-3">
          {/* Search + sort row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex-1 h-9 rounded-lg bg-slate-200 animate-pulse" />
            <div className="flex gap-2 shrink-0">
              <div className="h-9 w-36 rounded-lg bg-slate-100 animate-pulse" />
              <div className="h-9 w-32 rounded-lg bg-emerald-50 animate-pulse border border-emerald-100" />
            </div>
          </div>
          {/* Dataset chip row */}
          <div className="flex gap-2 overflow-hidden">
            {[80, 64, 96, 72, 88, 60].map((w, i) => (
              <div key={i} className="h-7 rounded-lg bg-slate-100 animate-pulse shrink-0" style={{ width: w }} />
            ))}
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
