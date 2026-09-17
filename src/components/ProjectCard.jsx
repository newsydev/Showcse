const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };
const geistStyle = { fontFamily: 'Geist, sans-serif' };

function YouTubeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function LinkBtn({ href, icon, label, variant = 'slate', isYoutube = false }) {
  if (!href) return null;

  const styles = {
    slate: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200',
    youtube: 'bg-red-50 hover:bg-red-100 text-[#b91c1c] border-red-200',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all shadow-2xs ${styles[variant] || styles.slate}`}
      style={monoStyle}
    >
      {isYoutube ? (
        <YouTubeIcon className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <span className="material-symbols-outlined text-[13px]">{icon}</span>
      )}
      <span>{label}</span>
    </a>
  );
}

export default function ProjectCard({ project, onInspect }) {
  if (project.members) {
    return <SheetCard project={project} onInspect={onInspect} />;
  }
  return <StaticCard project={project} onInspect={onInspect} />;
}

/** Card layout for Google Sheet submissions - Dark blue borderline, white inside */
function SheetCard({ project, onInspect }) {
  const teamNum = project.team;
  const memberCount = project.members?.length || 0;

  return (
    <div
      className="group relative rounded-2xl bg-white border-2 border-blue-900 hover:border-blue-700 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs cursor-pointer"
      onClick={() => onInspect(project)}
    >
      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3.5 flex-1 bg-white">
        
        {/* Team badge row */}
        <div className="flex items-center justify-between" style={{ ...monoStyle, fontSize: 11 }}>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold border border-blue-200 text-xs">
              {teamNum}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {project.teamCode}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-slate-400">group</span>
            {memberCount} member{memberCount !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug text-base"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
          >
            {project.teamName}
          </h3>
          {project.problemStatement && (
            <p
              className="text-slate-600 mt-1.5 line-clamp-3 text-xs leading-relaxed"
              style={geistStyle}
            >
              {project.problemStatement}
            </p>
          )}
        </div>

        {/* Dataset & Target Variable */}
        <div className="space-y-1.5 pt-1">
          {project.datasetName && (
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="material-symbols-outlined text-blue-800 text-[15px] shrink-0">database</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Dataset:</span>
              {project.datasetUrl ? (
                <a
                  href={project.datasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium truncate max-w-[200px]"
                  title={project.datasetName}
                >
                  {project.datasetName}
                </a>
              ) : (
                <span className="font-medium text-slate-800 truncate max-w-[200px]" title={project.datasetName}>
                  {project.datasetName}
                </span>
              )}
            </div>
          )}

          {project.targetVariable && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-blue-800 text-[15px] shrink-0">adjust</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Target:</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-950 border border-blue-200 font-mono text-[11px] font-semibold truncate max-w-[200px]">
                {project.targetVariable}
              </span>
            </div>
          )}
        </div>

        {/* Members list */}
        {project.members && project.members.length > 0 && (
          <div className="flex flex-col gap-1 border-t border-slate-100 pt-2.5">
            <span className="text-slate-400 uppercase tracking-wider font-semibold font-mono text-[10px]">
              Team Members
            </span>
            <div className="flex flex-col gap-1">
              {project.members.map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-medium text-slate-800 truncate pr-2">{m.name}</span>
                  <span className="font-mono text-[11px] text-slate-500 shrink-0">{m.rollNo || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action tray */}
      <div className="px-5 py-3 bg-white border-t border-blue-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <LinkBtn href={project.githubUrl} icon="code" label="GitHub" variant="slate" />
          <LinkBtn href={project.colabUrl} icon="science" label="Colab" variant="amber" />
          <LinkBtn href={project.youtubeUrl} isYoutube label="YouTube" variant="youtube" />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onInspect(project); }}
          className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-700 transition-colors cursor-pointer group-hover:translate-x-0.5"
        >
          <span>Details</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

/** Fallback static card with dark blue border and white inner */
function StaticCard({ project, onInspect }) {
  return (
    <div
      className="group relative rounded-2xl bg-white border-2 border-blue-900 hover:border-blue-700 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs cursor-pointer p-5"
      onClick={() => onInspect(project)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between" style={{ ...monoStyle, fontSize: 11 }}>
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold border border-blue-200">
            {project.team}
          </span>
          <span className="text-slate-400">{project.institution}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-900 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 text-xs line-clamp-3">{project.shortDesc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">Static Artifact</span>
        <button className="text-xs font-bold text-blue-900 hover:text-blue-700">
          Inspect →
        </button>
      </div>
    </div>
  );
}
