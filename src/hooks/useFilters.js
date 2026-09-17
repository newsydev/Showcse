import { useState, useMemo } from 'react';

export function useFilters(projects) {
  const [search, setSearch]                     = useState('');
  const [techFilter, setTechFilter]             = useState('All');
  const [institutionFilter, setInstitutionFilter] = useState('All');
  const [sortBy, setSortBy]                     = useState('newest');

  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        const text = [p.teamName, p.problemStatement, p.datasetName, p.targetVariable]
          .join(' ')
          .toLowerCase();
        const matchesSearch = !search || text.includes(search.toLowerCase());
        const matchesTech   = techFilter === 'All' || p.datasetName === techFilter;
        return matchesSearch && matchesTech;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return (a.teamName || '').localeCompare(b.teamName || '');
        }
        // 'newest' — preserve original sheet order (latest row first)
        return 0;
      });
  }, [projects, search, techFilter, sortBy]);

  return {
    search, setSearch,
    techFilter, setTechFilter,
    institutionFilter, setInstitutionFilter,
    sortBy, setSortBy,
    filtered,
  };
}
