import { useState, useRef, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';
import { LoadingState, ErrorState, SheetNotConfigured } from './components/SheetStates';
import { useFilters } from './hooks/useFilters';
import { useSheetData } from './hooks/useSheetData';
import { SHEET_CSV_URL } from './sheetConfig';

const monoStyle = { fontFamily: 'JetBrains Mono, monospace' };

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const searchRef = useRef(null);

  const { projects: sheetProjects, error, lastUpdated, refetch } = useSheetData(SHEET_CSV_URL);

  const isConfigured = !!SHEET_CSV_URL;
  const isLoading    = isConfigured && sheetProjects === null && !error;
  const projects     = sheetProjects || [];

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
    institutionFilter, setInstitutionFilter,
    sortBy, setSortBy,
    filtered,
  } = useFilters(projects);

  const institutionCount = useMemo(
    () => new Set(projects.map(p => p.institution)).size,
    [projects]
  );

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
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar onSearchFocus={() => searchRef.current?.focus()} />

      <main className="w-full pt-14 min-h-[calc(100vh-14rem)]">
        <Hero
          submissionCount={projects.length}
          institutionCount={institutionCount || 0}
        />

        {/* Live sync bar */}
        {isConfigured && lastUpdated && (
          <div className="w-full px-4 lg:px-12">
            <div className="max-w-[1300px] mx-auto mb-2">
              <div
                className="flex items-center gap-2 py-2 px-3 rounded bg-[#161b22] border border-[#30363d] text-[#6e7681]"
                style={{ ...monoStyle, fontSize: 10 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#238636] shrink-0" />
                <span>LIVE — {projects.length} submissions loaded from Google Sheet</span>
                <span className="ml-auto shrink-0">Last synced: {lastUpdated.toLocaleTimeString()}</span>
                <button
                  onClick={refetch}
                  className="ml-2 text-[#58a6ff] hover:text-blue-300 transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-[12px]">refresh</span>
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}

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

      <Footer submissionCount={projects.length} />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
