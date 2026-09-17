import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import ProjectGrid from '../components/ProjectGrid';
import AboutSection from '../components/AboutSection';
import { LoadingState, ErrorState, SheetNotConfigured } from '../components/SheetStates';
import { useFilters } from '../hooks/useFilters';
import { useProjects } from '../context/ProjectsContext';

export default function HomePage() {
  const { projects: sheetProjects, error, refetch, isConfigured } = useProjects();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const isLoading = isConfigured && sheetProjects === null && !error;
  const projects  = useMemo(() => sheetProjects || [], [sheetProjects]);

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
            {/* onInspect now navigates to the detail page */}
            <ProjectGrid
              projects={filtered}
              onInspect={(project) => navigate(`/project/${project.id}`)}
            />
          </>
        )}
      </main>

      <AboutSection />
    </div>
  );
}
