const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };

export default function Footer({ submissionCount = 0 }) {
  return (
    <footer id="footer" className="w-full px-4 lg:px-12 py-10 border-t border-[#30363d] bg-[#0d1117]">
      <div className="max-w-[1300px] mx-auto flex flex-col gap-8">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white" style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 17 }}>
                ASSIGNMENT<br />SHOWCASE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1" />
            </div>
            <p className="text-[#8b949e] text-xs" style={{ fontFamily: 'Geist, sans-serif' }}>
              Where ideas, code, and collaboration behind every engineering submission.
            </p>
          </div>

          {/* Live status block */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#161b22] border border-[#30363d]">
            <div className="flex items-center gap-1.5" style={{ ...monoStyle, fontSize: 11 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
              <span className="text-[#3fb950]">SYSTEM STATUS:</span>
              <span className="text-[#8b949e]">NORMAL</span>
            </div>
            <div className="w-px h-4 bg-[#30363d]" />
            <div style={{ ...monoStyle, fontSize: 11 }}>
              <span className="text-[#f0f6fc] font-semibold">
                {submissionCount > 0 ? `${submissionCount} SUBMISSIONS` : '—'}
              </span>
              <br />
              <span className="text-[#8b949e]">RECEIVED</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#30363d]">
          <nav className="flex items-center gap-4 flex-wrap">
            {[
              { label: 'Explore', href: '#explore' },
              { label: 'All Builds', href: '#discover' },
              { label: 'About', href: '#footer' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#8b949e] hover:text-[#f0f6fc] transition-colors text-xs"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="text-right">
            <div className="text-[#6e7681] font-semibold" style={{ ...monoStyle, fontSize: 11 }}>
              ASSIGNMENT SHOWCASE
            </div>
            <div className="text-[#8b949e]" style={{ fontFamily: 'Geist, sans-serif', fontSize: 12 }}>
              Built for engineering cohorts
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
