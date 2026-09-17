import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, onInspect }) {
  if (projects.length === 0) {
    return (
      <section className="w-full px-4 lg:px-12 pb-16 bg-white">
        <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-2xl border border-slate-200 gap-3 text-center">
          <span className="material-symbols-outlined text-[44px] text-slate-300">search_off</span>
          <h4 className="font-bold text-slate-800 text-base">No Matching Projects Found</h4>
          <p className="text-slate-500 text-xs max-w-sm" style={{ fontFamily: 'Geist, sans-serif' }}>
            No submissions matched your search query or selected dataset filters. Try clearing your search.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 lg:px-12 pb-16 relative bg-white">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onInspect={onInspect} />
          ))}
        </div>
      </div>
    </section>
  );
}
