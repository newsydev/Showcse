export default function Hero() {
  return (
    <section id="explore" className="w-full px-4 lg:px-12 pt-10 pb-6 relative bg-white">
      {/* Subtle light background grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="matrix-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-grid)" />
        </svg>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col items-center text-center gap-4">
        {/* Hero heading */}
        <div className="flex flex-col items-center max-w-4xl gap-1.5">
          <h1
            className="text-[28px] sm:text-[42px] leading-tight font-extrabold tracking-tight text-slate-900"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            MACHINE LEARNING PRACTICAL ASSIGNMENT
          </h1>
          <h2
            className="text-[18px] sm:text-[24px] font-bold tracking-tight text-[#b91c1c]"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            DATA PREPROCESSING & FEATURE SELECTION
          </h2>
          <div
            className="text-[12px] sm:text-[15px] font-semibold uppercase tracking-wider text-slate-500"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            FROM THEORY TO IMPLEMENTATION
          </div>
        </div>
      </div>
    </section>
  );
}


