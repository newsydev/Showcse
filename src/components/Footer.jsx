const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };

export default function Footer({ submissionCount = 0 }) {
  return (
    <footer id="footer" className="w-full px-4 lg:px-12 py-10 border-t border-slate-200 bg-white">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-8">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                MACHINE LEARNING<br />PRACTICAL ASSIGNMENT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1" />
            </div>
            <p className="text-slate-500 text-xs" style={{ fontFamily: 'Geist, sans-serif' }}>
              Chhatrapati Shahu Ji Maharaj University, Kanpur • Data Preprocessing & Feature Selection Registry.
            </p>
          </div>

          {/* Live status block */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5" style={{ ...monoStyle, fontSize: 11 }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-700 font-semibold">REGISTRY STATUS:</span>
              <span className="text-slate-500 font-medium">ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div style={{ ...monoStyle, fontSize: 11 }}>
              <span className="text-slate-900 font-bold">
                {submissionCount > 0 ? `${submissionCount} SUBMISSIONS` : '—'}
              </span>
              <br />
              <span className="text-slate-400">REGISTERED</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <nav className="flex items-center gap-4 flex-wrap">
            {[
              { label: 'Explore', href: '#explore' },
              { label: 'All Builds', href: '#discover' },
              { label: 'About', href: '#about' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-slate-500 hover:text-slate-900 transition-colors text-xs font-medium"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="text-right">
            <div className="text-slate-700 font-bold" style={{ ...monoStyle, fontSize: 11 }}>
              CSJMU KANPUR
            </div>
            <div className="text-slate-400" style={{ fontFamily: 'Geist, sans-serif', fontSize: 12 }}>
              Computer Science & Engineering
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
