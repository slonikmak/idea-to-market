import type {
  B2CProfile,
  B2BProfile,
  ProblemBlock,
  ProblemTa,
  CompetitionItem,
  Project,
} from '../types';

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Create empty B2C profile
export function createEmptyB2C(): B2CProfile {
  return {
    geography: '',
    sex: '',
    age: '',
    occupation: '',
    education: '',
    lifestyle: '',
    context: '',
  };
}

// Create empty B2B profile
export function createEmptyB2B(): B2BProfile {
  return {
    geography: '',
    sector: '',
    size: '',
    decisionMaker: '',
    urgencyTrigger: '',
    economicFactors: '',
  };
}

// Create empty problem block
export function createEmptyProblem(): ProblemBlock {
  return {
    what: '',
    when: '',
    howToMeasure: '',
  };
}

// Create empty ProblemTa
export function createEmptyProblemTa(): ProblemTa {
  return {
    projectName: '',
    hypothesis: '',
    b2c: createEmptyB2C(),
    b2b: createEmptyB2B(),
    problem: createEmptyProblem(),
    solution: '',
    votes: {},
  };
}

// Create empty competition item
export function createEmptyCompetitionItem(): CompetitionItem {
  return {
    id: generateId(),
    name: '',
    website: '',
    positioning: '',
    pricingPolicy: '',
    features: [],
    reviews: {},
  };
}

// Create empty project
export function createEmptyProject(): Project {
  return {
    id: generateId(),
    idea: '',
    problemTa: createEmptyProblemTa(),
    competition: [],
    markdownRaw: '',
  };
}
