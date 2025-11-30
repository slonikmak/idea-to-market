import { createContext } from 'react';
import type { ProjectContextValue } from './projectContextTypes';

export const ProjectContext = createContext<ProjectContextValue | null>(null);
