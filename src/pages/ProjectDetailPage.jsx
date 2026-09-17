import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import Navbar from '../components/Navbar';
import { LoadingState, ErrorState, SheetNotConfigured } from '../components/SheetStates';

const monoStyle  = { fontFamily: 'JetBrains Mono, monospace' };
const geistStyle = { fontFamily: 'Geist, sans-serif' };

function YouTubeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ActionLink({ href, icon, label, variant = 'slate', isYoutube = false }) {
  if (!href) return null;
  const styles = {
    slate:   'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200',
    amber:   'bg-amber-50  hover:bg-amber-100  text-amber-800  border-amber-200',
    youtube: 'bg-red-50    hover:bg-red-100    text-[#b91c1c]  border-red-200',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${styles[variant] || styles.slate}`}
      style={monoStyle}
    >
      {isYoutube ? <YouTubeIcon className="w-4 h-4 shrink-0" /> : <span className="material-symbols-outlined text-[16px]">{icon}</span>}
      <span>{label}</span>
    </a>
  );
}

function InfoBlock({ label, children }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
      <span className="text-slate-400 uppercase font-mono text-[10px] font-semibold tracking-wider">{label}</span>
      {children}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const { projects, error, isConfigured } = useProjects();

  const isLoading = isConfigured && projects === null && !error;

  const project = useMemo(
    () => (projects || []).find(p => p.id === id),
    [projects, id],
  );

  // ── Loading / error states ────────────────────────────────
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <SheetNotConfigured />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <ErrorState message={error} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
          <span className="material-symbols-outlined text-[64px] text-slate-300">search_off</span>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
            Project not found
          </h2>
          <p className="text-slate-500 text-sm max-w-xs">
            No project with ID <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{id}</code> exists.
          </p>
          <Link
            to="/"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  // ── Full detail page ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400" style={monoStyle}>
          <Link to="/" className="hover:text-blue-700 transition-colors">All Projects</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-slate-700 font-semibold">{project.teamCode}</span>
        </nav>

        {/* ── Header card ── */}
        <div className="rounded-2xl border-2 border-blue-900 bg-white overflow-hidden">
          <div className="p-5 sm:p-6 flex flex-col gap-3">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold border border-blue-200 text-xs" style={monoStyle}>
                {project.team} // {project.teamCode}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold" style={monoStyle}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified Submission
              </span>
              {project.timestamp && (
                <span className="text-slate-400 text-[11px] font-mono ml-auto">{project.timestamp}</span>
              )}
            </div>

            {/* Team name */}
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              {project.teamName}
            </h1>
            <p className="text-slate-500 text-xs" style={monoStyle}>
              {project.members?.length || 0} Team Contributors
            </p>
          </div>
        </div>

        {/* ── Problem Statement ── */}
        {project.problemStatement && (
          <div className="flex flex-col gap-2">
            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold" style={monoStyle}>
              Problem Statement &amp; Objective
            </span>
            <p
              className="text-slate-700 leading-relaxed text-sm p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 whitespace-pre-line"
              style={geistStyle}
            >
              {project.problemStatement}
            </p>
          </div>
        )}

        {/* ── Dataset + Target ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.datasetName && (
            <InfoBlock label="Dataset">
              <span className="font-semibold text-slate-900 text-sm truncate">{project.datasetName}</span>
              {project.datasetUrl && (
                <a
                  href={project.datasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs font-medium inline-flex items-center gap-1 mt-1"
                >
                  View Dataset
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
              )}
            </InfoBlock>
          )}
          {project.targetVariable && (
            <InfoBlock label="Target Variable">
              <span className="font-mono font-bold text-blue-900 text-sm truncate">{project.targetVariable}</span>
              <span className="text-slate-400 text-[11px] mt-1">Supervised Learning Target</span>
            </InfoBlock>
          )}
        </div>

        {/* ── Team Members Table ── */}
        {project.members?.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]" style={monoStyle}>
              Team Members ({project.members.length})
            </span>
            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {/* Table header */}
              <div className="grid grid-cols-12 bg-slate-50 px-4 py-2.5 font-mono text-[11px] text-slate-500 font-semibold uppercase">
                <span className="col-span-5">Name</span>
                <span className="col-span-4">Roll No</span>
                <span className="col-span-3 hidden sm:block">Contact</span>
              </div>
              {project.members.map((m, i) => (
                <div key={i} className="grid grid-cols-12 px-4 py-3 items-center text-xs hover:bg-slate-50 transition-colors">
                  <span className="col-span-5 font-semibold text-slate-900 truncate pr-2">{m.name}</span>
                  <span className="col-span-4 font-mono text-slate-600 text-[11px] truncate pr-2">{m.rollNo || '—'}</span>
                  <span className="col-span-3 text-slate-500 truncate text-[11px] font-mono hidden sm:block">
                    {m.phone || m.email || '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Links ── */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <ActionLink href={project.githubUrl}   icon="code"    label="GitHub Repository" variant="slate"   />
          <ActionLink href={project.colabUrl}    icon="science" label="Google Colab"       variant="amber"   />
          <ActionLink href={project.youtubeUrl}  isYoutube      label="YouTube Video"      variant="youtube" />
          {project.datasetUrl && (
            <ActionLink href={project.datasetUrl} icon="dataset" label="Dataset Source"    variant="slate"   />
          )}
        </div>

        {/* ── Back button ── */}
        <div className="pt-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to all projects
          </button>
        </div>

        {/* ── Footer note ── */}
        <p className="text-slate-400 text-xs text-center pb-4" style={monoStyle}>
          Machine Learning Practical Assignment — Data Preprocessing &amp; Feature Selection
        </p>

      </main>
    </div>
  );
}
