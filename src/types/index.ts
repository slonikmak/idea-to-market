// B2C Profile - Consumer targeting
export interface B2CProfile {
  geography: string;
  sex: string;
  age: string;
  occupation: string;
  education: string;
  lifestyle: string;
  context: string;
}

// B2B Profile - Business targeting
export interface B2BProfile {
  geography: string;
  sector: string;
  size: string;
  decisionMaker: string;
  urgencyTrigger: string;
  economicFactors: string;
}

// Problem definition block
export interface ProblemBlock {
  what: string;
  when: string;
  howToMeasure: string;
}

// Votes map: participant name -> rating (1-5)
export type VotesMap = Record<string, number>;

// Problem + Target Audience data
export interface ProblemTa {
  projectName: string;
  hypothesis: string;
  b2c: B2CProfile;
  b2b: B2BProfile;
  problem: ProblemBlock;
  solution: string;
  votes: VotesMap;
}

// Reviews from various platforms
export interface Reviews {
  trustpilot?: string;
  g2?: string;
  reddit?: string;
  github?: string;
  other?: string;
}

// Competition item (competitor)
export interface CompetitionItem {
  id: string;
  name: string;
  website: string;
  positioning: string;
  pricingPolicy: string;
  features: string[];
  reviews: Reviews;
  // Optional business metrics
  crunchbaseLink?: string;
  foundedIn?: string;
  lastInvestment?: string;
  totalInvestments?: string;
  monthlyVisits?: string;
  clientsAmount?: string;
  linkedinLink?: string;
  headcountGrowth?: string;
  comments?: string;
}

// Root project structure
export interface Project {
  id: string;
  idea: string;
  problemTa: ProblemTa;
  competition: CompetitionItem[];
  markdownRaw: string;
}

// Markdown mode for generation and parsing
export type MarkdownMode = 'all' | 'problemTa' | 'competition';

// Parse result with potential partial data and errors
export interface ParseResult {
  problemTa?: Partial<ProblemTa>;
  competition?: CompetitionItem[];
  errors: string[];
}
