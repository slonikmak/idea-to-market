import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Project, ProblemTa, CompetitionItem } from '../types';
import { createEmptyProject, createEmptyCompetitionItem } from '../utils/factories';

const STORAGE_KEY = 'research-app-current-project';
const DEBOUNCE_MS = 500;

interface ProjectContextValue {
  project: Project;
  setProject: (project: Project) => void;
  updateIdea: (idea: string) => void;
  updateProblemTa: (problemTa: ProblemTa) => void;
  updateCompetition: (competition: CompetitionItem[]) => void;
  addCompetitor: () => void;
  updateCompetitor: (id: string, item: CompetitionItem) => void;
  removeCompetitor: (id: string) => void;
  updateMarkdownRaw: (markdown: string) => void;
  clearProject: () => void;
  isSaving: boolean;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

// Load from localStorage
function loadProject(): Project {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load project from localStorage:', e);
  }
  return createEmptyProject();
}

// Save to localStorage
function saveProject(project: Project): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  } catch (e) {
    console.warn('Failed to save project to localStorage:', e);
  }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProjectState] = useState<Project>(loadProject);
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeoutId, setSaveTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Debounced save effect
  useEffect(() => {
    if (saveTimeoutId) {
      clearTimeout(saveTimeoutId);
    }
    setIsSaving(true);
    const id = setTimeout(() => {
      saveProject(project);
      setIsSaving(false);
    }, DEBOUNCE_MS);
    setSaveTimeoutId(id);

    return () => {
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const setProject = useCallback((newProject: Project) => {
    setProjectState(newProject);
  }, []);

  const updateIdea = useCallback((idea: string) => {
    setProjectState((prev) => ({ ...prev, idea }));
  }, []);

  const updateProblemTa = useCallback((problemTa: ProblemTa) => {
    setProjectState((prev) => ({ ...prev, problemTa }));
  }, []);

  const updateCompetition = useCallback((competition: CompetitionItem[]) => {
    setProjectState((prev) => ({ ...prev, competition }));
  }, []);

  const addCompetitor = useCallback(() => {
    setProjectState((prev) => ({
      ...prev,
      competition: [...prev.competition, createEmptyCompetitionItem()],
    }));
  }, []);

  const updateCompetitor = useCallback((id: string, item: CompetitionItem) => {
    setProjectState((prev) => ({
      ...prev,
      competition: prev.competition.map((c) => (c.id === id ? item : c)),
    }));
  }, []);

  const removeCompetitor = useCallback((id: string) => {
    setProjectState((prev) => ({
      ...prev,
      competition: prev.competition.filter((c) => c.id !== id),
    }));
  }, []);

  const updateMarkdownRaw = useCallback((markdownRaw: string) => {
    setProjectState((prev) => ({ ...prev, markdownRaw }));
  }, []);

  const clearProject = useCallback(() => {
    // clear any pending save
    if (saveTimeoutId) {
      clearTimeout(saveTimeoutId);
      setSaveTimeoutId(null);
    }
    setIsSaving(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove project from localStorage:', e);
    }
    setProjectState(createEmptyProject());
  }, [saveTimeoutId]);

  const value: ProjectContextValue = {
    project,
    setProject,
    updateIdea,
    updateProblemTa,
    updateCompetition,
    addCompetitor,
    updateCompetitor,
    removeCompetitor,
    updateMarkdownRaw,
    clearProject,
    isSaving,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject(): ProjectContextValue {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
