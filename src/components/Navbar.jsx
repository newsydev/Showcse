export default function Navbar({ onSearchFocus }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-[#30363d]">
      <div className="h-14 w-full px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-7 h-7 rounded bg-[#161b22] border border-[#30363d] flex items-center justify-center text-blue-400 shadow-sm">
            <span className="material-symbols-outlined text-[17px]">terminal</span>
          </div>
          <a href="#" className="flex items-center gap-2 font-semibold tracking-wide text-white hover:text-blue-400 transition-colors text-[17px]" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
            <span>ASSIGNMENT SHOWCASE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </a>
        </div>

        {/* Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <a href="#explore" className="px-3 py-1.5 text-xs font-medium text-white bg-[#21262d] rounded border border-[#30363d]">Explore</a>
          <a href="#discover" className="px-3 py-1.5 text-xs font-medium text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] rounded transition-colors">All Builds</a>
          <a href="#footer" className="px-3 py-1.5 text-xs font-medium text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22] rounded transition-colors">About</a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">

          <a href="#discover" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium border border-[#3fb950]/30 transition-all shadow-sm">
            <span>Explore Builds</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>→</span>
          </a>

          <div className="w-7 h-7 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center shrink-0 text-[#c9d1d9]">
            <span className="material-symbols-outlined text-[16px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
