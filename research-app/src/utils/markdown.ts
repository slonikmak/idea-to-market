import type { Project, ProblemTa, CompetitionItem, MarkdownMode, ParseResult, VotesMap, Reviews } from '../types';

// ==================== GENERATION ====================

export function buildMarkdownFromState(project: Project, mode: MarkdownMode = 'all'): string {
  const sections: string[] = [];

  if (mode === 'all' || mode === 'problemTa') {
    sections.push(generateProblemTaMarkdown(project.problemTa));
  }

  if (mode === 'all' || mode === 'competition') {
    sections.push(generateCompetitionMarkdown(project.competition));
  }

  return sections.join('\n\n');
}

function generateProblemTaMarkdown(data: ProblemTa): string {
  const lines: string[] = ['## Problem+TA'];

  // Basic section
  lines.push('\n### Basic');
  lines.push(`**Project Name**: ${data.projectName}`);
  lines.push(`**Hypothesis**: ${data.hypothesis}`);

  // B2C section
  lines.push('\n### B2C');
  lines.push(`**Geography**: ${data.b2c.geography}`);
  lines.push(`**Sex**: ${data.b2c.sex}`);
  lines.push(`**Age**: ${data.b2c.age}`);
  lines.push(`**Occupation**: ${data.b2c.occupation}`);
  lines.push(`**Education**: ${data.b2c.education}`);
  lines.push(`**Lifestyle**: ${data.b2c.lifestyle}`);
  lines.push(`**Context**: ${data.b2c.context}`);

  // B2B section
  lines.push('\n### B2B');
  lines.push(`**Geography**: ${data.b2b.geography}`);
  lines.push(`**Sector**: ${data.b2b.sector}`);
  lines.push(`**Size**: ${data.b2b.size}`);
  lines.push(`**Decision Maker**: ${data.b2b.decisionMaker}`);
  lines.push(`**Urgency Trigger**: ${data.b2b.urgencyTrigger}`);
  lines.push(`**Economic Factors**: ${data.b2b.economicFactors}`);

  // Problem section
  lines.push('\n### Problem');
  lines.push(`**What**: ${data.problem.what}`);
  lines.push(`**When**: ${data.problem.when}`);
  lines.push(`**How to measure**: ${data.problem.howToMeasure}`);

  // Solution section
  lines.push('\n### Solution');
  lines.push(`**Solution**: ${data.solution}`);

  // Votes section
  lines.push('\n### Votes');
  if (Object.keys(data.votes).length > 0) {
    lines.push('**Votes**:');
    for (const [name, rating] of Object.entries(data.votes)) {
      lines.push(`- ${name}: ${rating}`);
    }
  } else {
    lines.push('**Votes**: (none)');
  }

  return lines.join('\n');
}

function generateCompetitionMarkdown(items: CompetitionItem[]): string {
  const lines: string[] = ['## Competition'];

  if (items.length === 0) {
    lines.push('\n(No competitors added)');
    return lines.join('\n');
  }

  for (const item of items) {
    lines.push(`\n### ${item.name} (${item.website})`);
    lines.push(`**Positioning**: ${item.positioning}`);
    lines.push(`**Pricing Policy**: ${item.pricingPolicy}`);

    // Features
    if (item.features.length > 0) {
      lines.push('**Features**:');
      for (const feature of item.features) {
        lines.push(`- ${feature}`);
      }
    }

    // Reviews
    if (item.reviews.trustpilot) lines.push(`**Trustpilot**: ${item.reviews.trustpilot}`);
    if (item.reviews.g2) lines.push(`**G2**: ${item.reviews.g2}`);
    if (item.reviews.reddit) lines.push(`**Reddit**: ${item.reviews.reddit}`);
    if (item.reviews.github) lines.push(`**GitHub**: ${item.reviews.github}`);
    if (item.reviews.other) lines.push(`**Other Reviews**: ${item.reviews.other}`);

    // Business metrics
    if (item.crunchbaseLink) lines.push(`**Crunchbase**: ${item.crunchbaseLink}`);
    if (item.foundedIn) lines.push(`**Founded In**: ${item.foundedIn}`);
    if (item.lastInvestment) lines.push(`**Last Investment**: ${item.lastInvestment}`);
    if (item.totalInvestments) lines.push(`**Total Investments**: ${item.totalInvestments}`);
    if (item.monthlyVisits) lines.push(`**Monthly Visits**: ${item.monthlyVisits}`);
    if (item.clientsAmount) lines.push(`**Clients Amount**: ${item.clientsAmount}`);
    if (item.linkedinLink) lines.push(`**LinkedIn**: ${item.linkedinLink}`);
    if (item.headcountGrowth) lines.push(`**Headcount Growth**: ${item.headcountGrowth}`);
    if (item.comments) lines.push(`**Comments**: ${item.comments}`);
  }

  return lines.join('\n');
}

// ==================== PARSING ====================

export function parseMarkdown(markdown: string, mode: MarkdownMode = 'all'): ParseResult {
  const result: ParseResult = { errors: [] };

  if (mode === 'all' || mode === 'problemTa') {
    const problemTaResult = parseProblemTaSection(markdown);
    if (problemTaResult.data) {
      result.problemTa = problemTaResult.data;
    }
    if (problemTaResult.error) {
      result.errors.push(problemTaResult.error);
    }
  }

  if (mode === 'all' || mode === 'competition') {
    const competitionResult = parseCompetitionSection(markdown);
    if (competitionResult.data) {
      result.competition = competitionResult.data;
    }
    if (competitionResult.error) {
      result.errors.push(competitionResult.error);
    }
  }

  return result;
}

function parseProblemTaSection(markdown: string): { data?: Partial<ProblemTa>; error?: string } {
  const sectionMatch = markdown.match(/## Problem\+TA([\s\S]*?)(?=## Competition|$)/i);
  if (!sectionMatch) {
    return { error: 'Problem+TA section not found' };
  }

  const content = sectionMatch[1];
  const data: Partial<ProblemTa> = {
    projectName: extractField(content, 'Project Name'),
    hypothesis: extractField(content, 'Hypothesis'),
    b2c: {
      geography: extractField(content, 'Geography', 'B2C'),
      sex: extractField(content, 'Sex'),
      age: extractField(content, 'Age'),
      occupation: extractField(content, 'Occupation'),
      education: extractField(content, 'Education'),
      lifestyle: extractMultilineField(content, 'Lifestyle'),
      context: extractMultilineField(content, 'Context'),
    },
    b2b: {
      geography: extractFieldInSection(content, 'Geography', 'B2B'),
      sector: extractField(content, 'Sector'),
      size: extractField(content, 'Size'),
      decisionMaker: extractField(content, 'Decision Maker'),
      urgencyTrigger: extractField(content, 'Urgency Trigger'),
      economicFactors: extractField(content, 'Economic Factors'),
    },
    problem: {
      what: extractMultilineField(content, 'What'),
      when: extractField(content, 'When'),
      howToMeasure: extractMultilineField(content, 'How to measure'),
    },
    solution: extractMultilineField(content, 'Solution'),
    votes: extractVotes(content),
  };

  return { data };
}

function parseCompetitionSection(markdown: string): { data?: CompetitionItem[]; error?: string } {
  const sectionMatch = markdown.match(/## Competition([\s\S]*?)(?=## Problem\+TA|$)/i);
  if (!sectionMatch) {
    return { error: 'Competition section not found' };
  }

  const content = sectionMatch[1];
  const items: CompetitionItem[] = [];

  // Match competitor headings: ### Name (url)
  const competitorRegex = /### ([^\n(]+)\s*\(([^)]+)\)([\s\S]*?)(?=### |$)/g;
  let match;

  while ((match = competitorRegex.exec(content)) !== null) {
    const name = match[1].trim();
    const website = match[2].trim();
    const itemContent = match[3];

    const item: CompetitionItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      website,
      positioning: extractField(itemContent, 'Positioning'),
      pricingPolicy: extractField(itemContent, 'Pricing Policy'),
      features: extractFeatures(itemContent),
      reviews: extractReviews(itemContent),
      crunchbaseLink: extractField(itemContent, 'Crunchbase'),
      foundedIn: extractField(itemContent, 'Founded In'),
      lastInvestment: extractField(itemContent, 'Last Investment'),
      totalInvestments: extractField(itemContent, 'Total Investments'),
      monthlyVisits: extractField(itemContent, 'Monthly Visits'),
      clientsAmount: extractField(itemContent, 'Clients Amount'),
      linkedinLink: extractField(itemContent, 'LinkedIn'),
      headcountGrowth: extractField(itemContent, 'Headcount Growth'),
      comments: extractMultilineField(itemContent, 'Comments'),
    };

    items.push(item);
  }

  return { data: items };
}

// Helper functions for field extraction

function extractField(content: string, fieldName: string, sectionHint?: string): string {
  // If sectionHint is provided, try to extract within that section
  let searchContent = content;
  if (sectionHint) {
    const sectionRegex = new RegExp(`### ${sectionHint}([\\s\\S]*?)(?=###|$)`, 'i');
    const sectionMatch = content.match(sectionRegex);
    if (sectionMatch) {
      searchContent = sectionMatch[1];
    }
  }

  const regex = new RegExp(`\\*\\*${fieldName}\\*\\*:\\s*(.*)`, 'i');
  const match = searchContent.match(regex);
  return match ? match[1].trim() : '';
}

function extractFieldInSection(content: string, fieldName: string, sectionName: string): string {
  const sectionRegex = new RegExp(`### ${sectionName}([\\s\\S]*?)(?=###|$)`, 'i');
  const sectionMatch = content.match(sectionRegex);
  if (!sectionMatch) return '';

  const regex = new RegExp(`\\*\\*${fieldName}\\*\\*:\\s*(.*)`, 'i');
  const match = sectionMatch[1].match(regex);
  return match ? match[1].trim() : '';
}

function extractMultilineField(content: string, fieldName: string): string {
  const regex = new RegExp(`\\*\\*${fieldName}\\*\\*:\\s*([\\s\\S]*?)(?=\\*\\*[^*]+\\*\\*:|### |$)`, 'i');
  const match = content.match(regex);
  if (!match) return '';
  return match[1].trim();
}

function extractVotes(content: string): VotesMap {
  const votes: VotesMap = {};
  const votesSection = content.match(/\*\*Votes\*\*:[\s\S]*?(?=###|$)/i);
  if (!votesSection) return votes;

  const voteRegex = /^- ([^:]+):\s*(\d+)/gm;
  let match;
  while ((match = voteRegex.exec(votesSection[0])) !== null) {
    const name = match[1].trim();
    const rating = parseInt(match[2], 10);
    if (rating >= 1 && rating <= 5) {
      votes[name] = rating;
    }
  }

  return votes;
}

function extractFeatures(content: string): string[] {
  const features: string[] = [];
  const featuresSection = content.match(/\*\*Features\*\*:[\s\S]*?(?=\*\*[^*]+\*\*:|### |$)/i);
  if (!featuresSection) return features;

  const featureRegex = /^- (.+)$/gm;
  let match;
  while ((match = featureRegex.exec(featuresSection[0])) !== null) {
    features.push(match[1].trim());
  }

  return features;
}

function extractReviews(content: string): Reviews {
  return {
    trustpilot: extractField(content, 'Trustpilot') || undefined,
    g2: extractField(content, 'G2') || undefined,
    reddit: extractField(content, 'Reddit') || undefined,
    github: extractField(content, 'GitHub') || undefined,
    other: extractField(content, 'Other Reviews') || undefined,
  };
}
