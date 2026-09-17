const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };
const geistStyle = { fontFamily: 'Geist, sans-serif' };

export default function AboutSection() {
  const steps = [
    'Theory',
    'Formula',
    'From-Scratch Code',
    'Output',
    'Verification',
    'Interpretation',
  ];

  return (
    <section id="about" className="w-full px-4 lg:px-12 pt-12 pb-20 bg-white border-t border-slate-200">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            About The Machine Learning Practical Assignment
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium" style={geistStyle}>
            From Theory to Implementation: Data Preprocessing & Feature Selection Registry
          </p>
        </div>

        {/* Content Card with Dark Blue Border & White Inner */}
        <div className="rounded-2xl bg-white border-2 border-blue-900 p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          
          {/* Core Philosophy */}
          <div className="flex flex-col gap-2.5">
            <span
              className="text-xs font-bold text-blue-900 uppercase tracking-wider"
              style={monoStyle}
            >
              Core Philosophy of the Assignment
            </span>
            <blockquote
              className="text-lg sm:text-xl font-bold text-slate-900 leading-snug border-l-4 border-blue-900 pl-4 py-0.5"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              “Do not use Machine Learning as a black box. Understand what happens inside the function.”
            </blockquote>
            <p className="text-sm text-slate-600 leading-relaxed pt-1" style={geistStyle}>
              The final goal is not simply to produce a clean dataset, but to demonstrate a deep mathematical understanding of why each preprocessing and feature-selection technique is required, how it works internally, and how it should be correctly applied in a production-ready Machine Learning pipeline.
            </p>
          </div>

          {/* The 6-Step Learning Process */}
          <div className="pt-4 border-t border-blue-100 flex flex-col gap-3">
            <span
              className="text-xs font-bold text-blue-900 uppercase tracking-wider"
              style={monoStyle}
            >
              The 6-Step Learning Process
            </span>

            <div className="flex items-center flex-wrap gap-2 pt-1">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`px-3.5 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${
                      step === 'From-Scratch Code'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-2xs'
                        : 'bg-blue-50 text-blue-950 border-blue-200'
                    }`}
                    style={monoStyle}
                  >
                    {step}
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-slate-400 font-bold text-sm select-none">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
