import { useEffect } from 'react';

const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };
const geistStyle = { fontFamily: 'Geist, sans-serif' };

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function ActionLink({ href, icon, label, variant = 'slate', isYoutube = false }) {
  if (!href) return null;

  const styles = {
    slate: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200',
    red: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
    youtube: 'bg-red-50 hover:bg-red-100 text-[#b91c1c] border-red-200',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-2xs ${styles[variant] || styles.slate}`}
      style={monoStyle}
    >
      {isYoutube ? (
        <YouTubeIcon className="w-4 h-4 shrink-0" />
      ) : (
        <span className="material-symbols-outlined text-[15px]">{icon}</span>
      )}
      <span>{label}</span>
    </a>
  );
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border-2 border-blue-900 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/95 backdrop-blur-md border-b border-blue-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold border border-blue-200 text-xs font-mono">
              {project.team} // {project.teamCode}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Verified Submission
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5 text-slate-800">
          {/* Team Name */}
          <div>
            <h2
              className="font-bold text-slate-900 text-2xl tracking-tight"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              {project.teamName}
            </h2>
            <span className="text-slate-400 text-xs font-mono mt-0.5 block">
              {project.members?.length || 0} Team Contributors • {project.timestamp || 'Verified Entry'}
            </span>
          </div>

          {/* Problem Statement */}
          {project.problemStatement && (
            <div className="flex flex-col gap-1.5">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold font-mono">
                Problem Statement & Objective
              </span>
              <p
                className="text-slate-700 leading-relaxed text-xs sm:text-sm p-3.5 rounded-xl bg-slate-50 border border-slate-200 whitespace-pre-line"
                style={geistStyle}
              >
                {project.problemStatement}
              </p>
            </div>
          )}

          {/* Dataset & Target Variable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.datasetName && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 uppercase font-mono text-[10px] font-semibold block mb-1">
                  Dataset
                </span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm block truncate">
                  {project.datasetName}
                </span>
                {project.datasetUrl && (
                  <a
                    href={project.datasetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs font-medium inline-flex items-center gap-1 mt-1"
                  >
                    <span>View Dataset</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                )}
              </div>
            )}

            {project.targetVariable && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 uppercase font-mono text-[10px] font-semibold block mb-1">
                  Target Variable
                </span>
                <span className="font-mono font-semibold text-blue-900 text-xs sm:text-sm block truncate">
                  {project.targetVariable}
                </span>
                <span className="text-slate-400 text-[11px] block mt-1">Supervised Target</span>
              </div>
            )}
          </div>

          {/* Team Members List */}
          {project.members && project.members.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-slate-400 uppercase tracking-wider font-semibold font-mono text-[10px]">
                Team Members ({project.members.length})
              </span>
              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                <div className="grid grid-cols-12 bg-slate-50 px-3.5 py-2 font-mono text-[11px] text-slate-500 font-semibold uppercase">
                  <span className="col-span-4">Name</span>
                  <span className="col-span-4">Roll No</span>
                  <span className="col-span-4">Contact</span>
                </div>
                {project.members.map((m, i) => (
                  <div key={i} className="grid grid-cols-12 px-3.5 py-2.5 items-center text-xs hover:bg-slate-50 transition-colors">
                    <span className="col-span-4 font-semibold text-slate-900 truncate pr-2">{m.name}</span>
                    <span className="col-span-4 font-mono text-slate-600 text-[11px] truncate pr-2">{m.rollNo || '—'}</span>
                    <span className="col-span-4 text-slate-500 truncate text-[11px] font-mono">
                      {m.phone || m.email || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <ActionLink href={project.githubUrl} icon="code" label="GitHub Repository" variant="slate" />
            <ActionLink href={project.colabUrl} icon="science" label="Google Colab" variant="amber" />
            <ActionLink href={project.youtubeUrl} isYoutube label="YouTube Video" variant="youtube" />
            {project.datasetUrl && (
              <ActionLink href={project.datasetUrl} icon="dataset" label="Dataset Source" variant="slate" />
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">Machine Learning Practical Assignment</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
