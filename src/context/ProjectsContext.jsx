import { createContext, useContext } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { SHEET_CSV_URL } from '../sheetConfig';

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const { projects, error, refetch } = useSheetData(SHEET_CSV_URL);
  return (
    <ProjectsContext.Provider value={{ projects, error, refetch, isConfigured: !!SHEET_CSV_URL }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
