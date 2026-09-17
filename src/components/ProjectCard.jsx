const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };
const geistStyle = { fontFamily: 'Geist, sans-serif' };

function LinkBtn({ href, icon, label, color = 'text-[#8b949e]' }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] transition-colors ${color}`}
      style={{ ...monoStyle, fontSize: 10 }}
    >
      <span className="material-symbols-outlined text-[12px]">{icon}</span>
      {label}
    </a>
  );
}

export default function ProjectCard({ project, onInspect }) {
  // Sheet-loaded project
  if (project.members) {
    return <SheetCard project={project} onInspect={onInspect} />;
  }
  // Legacy static project
  return <StaticCard project={project} onInspect={onInspect} />;
}

/** Card layout for Google Sheet–sourced data */
function SheetCard({ project, onInspect }) {
  const teamNum = project.team;
  const memberCount = project.members?.length || 0;

  return (
    <div
      className="group relative rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/40 transition-colors flex flex-col overflow-hidden shadow-sm cursor-pointer"
      onClick={() => onInspect(project)}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex flex-col gap-2.5">
        {/* Team badge row */}
        <div className="flex items-center justify-between" style={{ ...monoStyle, fontSize: 11 }}>
          <div className="flex items-center gap-1.5">
            <span className="text-[#58a6ff] font-medium">{teamNum}</span>
            <span className="text-[#6e7681]">// {project.teamCode}</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
            {memberCount} member{memberCount !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-semibold text-[#f0f6fc] group-hover:text-blue-400 transition-colors leading-tight"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 16, letterSpacing: '-0.01em' }}
          >
            {project.teamName}
          </h3>
          {project.problemStatement && (
            <p
              className="text-[#8b949e] mt-1 line-clamp-2"
              style={{ ...geistStyle, fontSize: 12, lineHeight: '18px' }}
            >
              {project.problemStatement}
            </p>
          )}
        </div>

        {/* Dataset badge */}
        {project.datasetName && (
          <div className="flex items-center gap-1.5" style={{ ...monoStyle, fontSize: 10 }}>
            <span className="text-[#6e7681]">DATASET:</span>
            {project.datasetUrl ? (
              <a
                href={project.datasetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#58a6ff] hover:text-blue-300 transition-colors truncate max-w-[180px]"
              >
                {project.datasetName}
              </a>
            ) : (
              <span className="text-[#c9d1d9] truncate max-w-[180px]">{project.datasetName}</span>
            )}
          </div>
        )}

        {/* Members list */}
        <div className="flex flex-col gap-1 border-t border-[#21262d] pt-2.5">
          <span className="text-[#6e7681] uppercase tracking-wider" style={{ ...monoStyle, fontSize: 9 }}>Members</span>
          {project.members.map((m, i) => (
            <div key={i} className="flex items-center justify-between gap-2" style={{ ...geistStyle, fontSize: 11 }}>
              <span className="text-[#c9d1d9] truncate">{m.name}</span>
              <span className="text-[#6e7681] shrink-0" style={monoStyle}>{m.rollNo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action tray */}
      <div className="mt-auto px-4 py-2.5 bg-[#11161d] border-t border-[#30363d] flex items-center gap-2 flex-wrap">
        <LinkBtn href={project.githubUrl} icon="code" label="GitHub" color="text-[#c9d1d9]" />
        <LinkBtn href={project.colabUrl} icon="science" label="Colab" color="text-[#e3b341]" />
        <LinkBtn href={project.youtubeUrl} icon="play_circle" label="Video" color="text-[#f87171]" />
        <button
          onClick={(e) => { e.stopPropagation(); onInspect(project); }}
          className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-colors"
          style={{ ...monoStyle, fontSize: 10 }}
        >
          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          Details
        </button>
      </div>
    </div>
  );
}

/** Original card layout for static/demo data */
function StaticCard({ project, onInspect }) {
  const tagColorMap = project.tagColors || {};

  return (
    <div className="group relative rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/40 transition-colors flex flex-col justify-between overflow-hidden shadow-sm">
      <div className="p-4 flex flex-col gap-3">
        {/* Meta header */}
        <div className="flex items-center justify-between" style={{ ...monoStyle, fontSize: 11 }}>
          <div className="flex items-center gap-1.5">
            <span className="text-[#58a6ff] font-medium">{project.team}</span>
            <span className="text-[#6e7681]">// {project.teamCode}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">{project.institution}</span>
            {project.levelVariant === 'green' ? (
              <span className="px-1.5 py-0.5 rounded bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 font-medium" style={{ ...monoStyle, fontSize: 11 }}>LVL {project.level}</span>
            ) : (
              <span className="px-1.5 py-0.5 rounded bg-blue-900/20 text-[#58a6ff] border border-blue-800/40 font-medium" style={{ ...monoStyle, fontSize: 11 }}>LVL {project.level}</span>
            )}
          </div>
        </div>

        {/* Preview */}
        {project.previewType === 'image' ? (
          <div className="relative w-full h-40 rounded bg-[#0d1117] overflow-hidden border border-[#30363d]">
            <img src={project.previewImage} alt={project.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-[#0d1117]/90 border border-[#30363d] text-[#c9d1d9]" style={{ ...monoStyle, fontSize: 11 }}>
              <span className={`material-symbols-outlined text-[13px] ${project.previewLabel?.color}`}>{project.previewLabel?.icon}</span>
              {project.previewLabel?.text}
            </div>
            <button onClick={() => onInspect(project)} className="absolute inset-0 flex items-center justify-center bg-[#0d1117]/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-3 py-1 rounded bg-[#21262d] text-white font-medium flex items-center gap-1.5 border border-[#30363d] shadow-sm" style={{ ...monoStyle, fontSize: 12 }}>
                <span className="material-symbols-outlined text-[15px]">visibility</span> Inspect Artifact
              </span>
            </button>
          </div>
        ) : (
          <div className="relative w-full h-40 rounded bg-[#0a0d12] p-3 border border-[#30363d] flex flex-col justify-between overflow-hidden" style={{ fontFamily: 'monospace', fontSize: 11 }}>
            <div className="flex items-center justify-between text-[#8b949e] pb-1.5 border-b border-[#21262d]" style={{ fontSize: 11 }}>
              <span className="text-[#c9d1d9]">{project.terminalData?.filename}</span>
              <span className="text-[#6e7681]">{project.terminalData?.meta}</span>
            </div>
            <div className="flex flex-col gap-1 flex-1 py-1.5">
              {project.terminalData?.lines.map((line, i) => {
                if (line.type === 'buffer') return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[#8b949e]">{line.label}</span>
                    <div className="flex-1 bg-[#21262d] h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${line.fill}%` }} />
                    </div>
                  </div>
                );
                if (line.prefix) return (
                  <span key={i} className={line.green ? 'text-[#3fb950]' : line.muted ? 'text-[#6e7681]' : 'text-[#8b949e]'}>
                    <span style={{ color: line.prefixColor }}>{line.prefix}</span>{line.text}
                  </span>
                );
                return <span key={i} style={{ color: line.color || '#c9d1d9' }}>{line.text}</span>;
              })}
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#21262d] text-[#6e7681]" style={{ fontSize: 10 }}>
              <span>{project.terminalData?.footer}</span>
              <span className="text-[#3fb950]">● {project.terminalData?.status}</span>
            </div>
          </div>
        )}

        {/* Title */}
        <div>
          <h3 className="font-semibold text-[#f0f6fc] group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: 17, lineHeight: '24px', letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
          <p className="text-[#8b949e] mt-1 line-clamp-2" style={{ ...geistStyle, fontSize: 12, lineHeight: '18px' }}>{project.shortDesc}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className={`px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d] ${tagColorMap[tag] || 'text-[#8b949e]'}`} style={{ ...monoStyle, fontSize: 11 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action tray */}
      <div className="px-4 py-2.5 bg-[#11161d] border-t border-[#30363d] flex items-center justify-between gap-1">
        <button onClick={() => onInspect(project)} className="inline-flex items-center gap-1.5 text-xs text-[#58a6ff] hover:text-blue-300 transition-colors" style={monoStyle}>
          <span className="material-symbols-outlined text-[15px]">play_circle</span>
          <span>Live Demo</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => onInspect(project)} className="p-1 rounded text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors">
            <span className="material-symbols-outlined text-[15px]">{project.actionIcon}</span>
          </button>
          <button className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-colors" style={{ ...monoStyle, fontSize: 11 }}>
            <span>Live Preview</span>
            <span className="material-symbols-outlined text-[13px]">north_east</span>
          </button>
        </div>
      </div>
    </div>
  );
}
