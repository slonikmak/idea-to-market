import type { Project, ProblemTa, CompetitionItem } from '../types';
import type { ReactNode } from 'react';

export interface ProjectContextValue {
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

export type ProjectProviderChildren = { children: ReactNode };
