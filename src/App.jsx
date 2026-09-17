import { useState, useRef, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';
import { LoadingState, ErrorState, SheetNotConfigured } from './components/SheetStates';
import { useFilters } from './hooks/useFilters';
import { useSheetData } from './hooks/useSheetData';
import { SHEET_CSV_URL } from './sheetConfig';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const searchRef = useRef(null);

  const { projects: sheetProjects, error, refetch } = useSheetData(SHEET_CSV_URL);

  const isConfigured = !!SHEET_CSV_URL;
  const isLoading    = isConfigured && sheetProjects === null && !error;
  const projects     = useMemo(() => sheetProjects || [], [sheetProjects]);

  // Build dataset filter chips dynamically from real data
  const techFilters = useMemo(() => {
    const datasets = [...new Set(projects.map(p => p.datasetName).filter(Boolean))];
    return [
      { label: `All (${projects.length})`, value: 'All' },
      ...datasets.map(d => ({ label: d.length > 22 ? d.slice(0, 22) + '…' : d, value: d })),
    ];
  }, [projects]);

  const {
    search, setSearch,
    techFilter, setTechFilter,
    sortBy, setSortBy,
    filtered,
  } = useFilters(projects);

  // ⌘K / Ctrl+K → focus search
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onSearchFocus={() => searchRef.current?.focus()} />

      <main className="w-full min-h-[calc(100vh-14rem)]">
        <Hero />



        {/* Main content */}
        {!isConfigured ? (
          <SheetNotConfigured />
        ) : isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <>
            <FilterBar
              search={search} setSearch={setSearch}
              techFilter={techFilter} setTechFilter={setTechFilter}
              sortBy={sortBy} setSortBy={setSortBy}
              searchRef={searchRef}
              techFilters={techFilters}
            />
            <ProjectGrid projects={filtered} onInspect={setSelectedProject} />
          </>
        )}


      </main>

      <AboutSection />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
