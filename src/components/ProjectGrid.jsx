import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, onInspect }) {
  if (projects.length === 0) {
    return (
      <section className="w-full px-4 lg:px-12 pb-14">
        <div className="max-w-[1300px] mx-auto flex flex-col items-center justify-center py-24 gap-4">
          <span className="material-symbols-outlined text-[48px] text-[#30363d]">search_off</span>
          <p className="text-[#6e7681] text-sm" style={{ fontFamily: 'Geist, sans-serif' }}>No projects match your filters. Try adjusting your search.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 lg:px-12 pb-14 relative">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onInspect={onInspect} />
          ))}
        </div>
      </div>
    </section>
  );
}
