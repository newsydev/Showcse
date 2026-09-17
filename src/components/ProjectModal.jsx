import { useEffect } from 'react';

const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };
const geistStyle = { fontFamily: 'Geist, sans-serif' };

function ActionLink({ href, icon, label, className = '' }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-colors ${className}`}
      style={{ ...monoStyle, fontSize: 11 }}
    >
      <span className="material-symbols-outlined text-[15px]">{icon}</span>
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

  const isSheetProject = !!project.members;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12 bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-3.5 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#58a6ff] text-[18px]">terminal</span>
            <span className="font-semibold text-[#f0f6fc]" style={{ ...monoStyle, fontSize: 12 }}>
              {project.team} // {project.teamCode}
            </span>
            {!isSheetProject && (
              <>
                <span className="text-[#6e7681]" style={monoStyle}>•</span>
                <span className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]" style={{ ...monoStyle, fontSize: 11 }}>
                  {project.institution}
                </span>
              </>
            )}
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-5">

          {/* ── SHEET PROJECT LAYOUT ── */}
          {isSheetProject ? (
            <>
              {/* Team name + submission badge */}
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h2 className="font-bold text-[#f0f6fc]" style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 22, letterSpacing: '-0.015em' }}>
                    {project.teamName}
                  </h2>
                  <span className="text-[#6e7681]" style={{ ...monoStyle, fontSize: 10 }}>TEAM SUBMISSION • {project.members.length} MEMBERS</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30" style={{ ...monoStyle, fontSize: 11 }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" /> SUBMITTED
                </div>
              </div>

              {/* Problem Statement */}
              {project.problemStatement && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#6e7681] uppercase tracking-wider" style={{ ...monoStyle, fontSize: 10 }}>Problem Statement</span>
                  <p className="text-[#c9d1d9] leading-relaxed" style={{ ...geistStyle, fontSize: 14 }}>
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {/* Dataset */}
              {project.datasetName && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#6e7681] uppercase tracking-wider" style={{ ...monoStyle, fontSize: 10 }}>Dataset</span>
                  <div className="flex items-center gap-2 p-3 rounded bg-[#0d1117] border border-[#30363d]">
                    <span className="material-symbols-outlined text-[#58a6ff] text-[18px]">dataset</span>
                    <div className="flex flex-col">
                      <span className="text-[#f0f6fc] font-medium" style={{ ...geistStyle, fontSize: 13 }}>{project.datasetName}</span>
                      {project.datasetUrl && (
                        <a href={project.datasetUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[#58a6ff] hover:text-blue-300 transition-colors truncate max-w-xs"
                          style={{ ...monoStyle, fontSize: 10 }}>
                          {project.datasetUrl}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Members table */}
              <div className="flex flex-col gap-2">
                <span className="text-[#6e7681] uppercase tracking-wider" style={{ ...monoStyle, fontSize: 10 }}>Team Members</span>
                <div className="rounded-lg border border-[#30363d] divide-y divide-[#30363d] overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-4 px-3 py-2 bg-[#0d1117]" style={{ ...monoStyle, fontSize: 10 }}>
                    <span className="text-[#6e7681] uppercase">Name</span>
                    <span className="text-[#6e7681] uppercase">Roll No</span>
                    <span className="text-[#6e7681] uppercase">Email</span>
                    <span className="text-[#6e7681] uppercase">Phone</span>
                  </div>
                  {project.members.map((m, i) => (
                    <div key={i} className="grid grid-cols-4 px-3 py-2.5 hover:bg-[#21262d]/30 transition-colors" style={{ ...geistStyle, fontSize: 12 }}>
                      <span className="text-[#f0f6fc] font-medium truncate pr-2">{m.name}</span>
                      <span className="text-[#8b949e] truncate pr-2" style={monoStyle}>{m.rollNo || '—'}</span>
                      <span className="text-[#8b949e] truncate pr-2">{m.email || '—'}</span>
                      <span className="text-[#8b949e] truncate" style={monoStyle}>{m.phone || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#30363d]">
                <ActionLink href={project.githubUrl} icon="code" label="GitHub Repository" className="text-[#c9d1d9]" />
                <ActionLink href={project.colabUrl} icon="science" label="Google Colab" className="text-[#e3b341]" />
                <ActionLink href={project.youtubeUrl} icon="play_circle" label="YouTube Demo" className="text-[#f87171]" />
                {project.datasetUrl && (
                  <ActionLink href={project.datasetUrl} icon="dataset" label="Dataset" className="text-[#58a6ff]" />
                )}
              </div>
            </>
          ) : (
            /* ── STATIC PROJECT LAYOUT (original) ── */
            <>
              {/* Preview */}
              <div className="relative w-full aspect-video rounded bg-[#0a0d12] overflow-hidden border border-[#30363d] flex items-center justify-center">
                {project.previewType === 'image' ? (
                  <img src={project.previewImage} alt={project.title} className="w-full h-full object-cover opacity-90" />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-[48px] text-[#30363d]">terminal</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-[#0a0d12]/40 flex items-center justify-center">
                  <button className="w-14 h-14 rounded-full bg-[#1f6feb] hover:bg-blue-600 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px] text-white">play_arrow</span>
                  </button>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <span className="text-[#c9d1d9] font-medium tracking-wider" style={{ ...monoStyle, fontSize: 11 }}>LAUNCH RECORDED RUN (3:45)</span>
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-bold text-[#f0f6fc]" style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 22, letterSpacing: '-0.015em' }}>
                    {project.title}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30" style={{ ...monoStyle, fontSize: 11 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" /> JURY CERTIFIED
                  </div>
                </div>
                <p className="text-sm text-[#8b949e]" style={geistStyle}>{project.fullDesc}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className={`px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] ${project.tagColors?.[tag] || 'text-[#8b949e]'}`} style={{ ...monoStyle, fontSize: 11 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#30363d]">
                <div className="flex items-center gap-2">
                  <ActionLink href="#" icon="terminal" label="Repository" className="text-[#c9d1d9]" />
                  <ActionLink href="#" icon="schema" label="Database Schema" className="text-[#c9d1d9]" />
                </div>
                <a href="#" className="inline-flex items-center gap-1 px-4 py-1.5 rounded bg-[#1f6feb] hover:bg-blue-600 text-white font-semibold shadow-sm transition-colors text-xs" style={geistStyle}>
                  <span>Open Live Deployment</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
