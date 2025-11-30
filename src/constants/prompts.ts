export const PROBLEM_TA_PROMPT_TEMPLATE = `You are a product research assistant. I need help analyzing the target audience and problem definition for a product idea.

**Product Idea:**
{{IDEA}}

Please provide a structured analysis in the following markdown format:

## Problem+TA

### Basic
**Project Name**: [suggest a name]
**Hypothesis**: [formulate the core hypothesis]

### B2C
**Geography**: [target regions/countries]
**Sex**: [target gender if relevant, or "All"]
**Age**: [target age range]
**Occupation**: [target occupations]
**Education**: [education level]
**Lifestyle**: [describe lifestyle characteristics]
**Context**: [usage context - when/where they encounter the problem]

### B2B
**Geography**: [target regions for B2B]
**Sector**: [target industry sectors]
**Size**: [company size - SMB/Mid-market/Enterprise]
**Decision Maker**: [who makes the buying decision]
**Urgency Trigger**: [what triggers urgent need]
**Economic Factors**: [relevant economic considerations]

### Problem
**What**: [describe the problem in detail]
**When**: [when does the problem occur]
**How to measure**: [how to measure problem severity/impact]

### Solution
**Solution**: [describe the proposed solution approach]

### Votes
**Votes**: (to be filled after team review)
`;

export const COMPETITION_PROMPT_TEMPLATE = `You are a competitive analysis assistant. I need help researching competitors for a product idea.

**Product Idea:**
{{IDEA}}

Please provide a structured competitive analysis in the following markdown format. Include 3-5 relevant competitors:

## Competition

### [Competitor Name] (https://example.com)
**Positioning**: [how they position themselves]
**Pricing Policy**: [their pricing model]
**Features**:
- [key feature 1]
- [key feature 2]
- [key feature 3]
**Trustpilot**: [rating if available]
**G2**: [rating if available]
**Reddit**: [sentiment summary]
**Crunchbase**: [link if available]
**Founded In**: [year]
**Last Investment**: [amount and date if known]
**Total Investments**: [total raised if known]
**Monthly Visits**: [traffic estimate]
**LinkedIn**: [link if available]
**Comments**: [additional insights]

[Repeat for each competitor]
`;

export function generatePrompt(template: string, idea: string): string {
  return template.replace('{{IDEA}}', idea);
}
