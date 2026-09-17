const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };

export function LoadingState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-8 h-8 rounded-full border-2 border-[#30363d] border-t-blue-500 animate-spin" />
      <p className="text-[#6e7681]" style={{ ...monoStyle, fontSize: 11 }}>FETCHING SHEET DATA...</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-32 gap-4">
      <span className="material-symbols-outlined text-[48px] text-[#6e7681]">cloud_off</span>
      <div className="text-center">
        <p className="text-[#f0f6fc] font-medium" style={{ fontFamily: 'Geist, sans-serif', fontSize: 14 }}>Could not load Google Sheet</p>
        <p className="text-[#6e7681] mt-1" style={{ ...monoStyle, fontSize: 11 }}>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-colors text-xs"
          style={monoStyle}
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function SheetNotConfigured() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 gap-6 px-4">
      <div className="w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px] text-[#58a6ff]">table_chart</span>
      </div>
      <div className="text-center max-w-md">
        <h3 className="font-semibold text-[#f0f6fc] mb-2" style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 18 }}>
          Connect Your Google Sheet
        </h3>
        <p className="text-[#8b949e] text-sm leading-relaxed" style={{ fontFamily: 'Geist, sans-serif' }}>
          Open <code className="text-[#58a6ff] bg-[#161b22] px-1 rounded">src/sheetConfig.js</code> and paste your Google Sheet ID to load live submission data.
        </p>
      </div>
      <div className="w-full max-w-lg rounded-lg bg-[#0d1117] border border-[#30363d] p-4 text-left" style={{ ...monoStyle, fontSize: 11 }}>
        <div className="text-[#6e7681] mb-3 uppercase tracking-wider">Steps to connect</div>
        {[
          ['1', 'Go to sheets.google.com', 'Import your .xlsx file'],
          ['2', 'Click Share', 'Anyone with the link → Viewer'],
          ['3', 'Copy the Sheet ID', 'From the URL: /d/  <<ID>>  /edit'],
          ['4', 'Open src/sheetConfig.js', 'Paste the ID into SHEET_ID'],
        ].map(([num, title, sub]) => (
          <div key={num} className="flex gap-3 mb-2.5">
            <span className="w-5 h-5 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center shrink-0 text-[#58a6ff]">{num}</span>
            <div>
              <div className="text-[#c9d1d9]">{title}</div>
              <div className="text-[#6e7681]">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
