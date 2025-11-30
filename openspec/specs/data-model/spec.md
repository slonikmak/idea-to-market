# data-model Specification

## Purpose
TBD - created by archiving change add-research-app. Update Purpose after archive.
## Requirements
### Requirement: Project Data Model
The system SHALL define TypeScript interfaces for structured project data including `B2CProfile`, `B2BProfile`, `ProblemBlock`, `ProblemTa`, `CompetitionItem`, and `Project`.

#### Scenario: B2C Profile structure
- **WHEN** creating a B2C profile
- **THEN** it SHALL contain fields: geography, sex, age, occupation, education, lifestyle, context

#### Scenario: B2B Profile structure
- **WHEN** creating a B2B profile
- **THEN** it SHALL contain fields: geography, sector, size, decisionMaker, urgencyTrigger, economicFactors

#### Scenario: Problem Block structure
- **WHEN** creating a problem block
- **THEN** it SHALL contain fields: what, when, howToMeasure

#### Scenario: ProblemTa structure
- **WHEN** creating a ProblemTa record
- **THEN** it SHALL contain: projectName, hypothesis, b2c (B2CProfile), b2b (B2BProfile), problem (ProblemBlock), solution, votes (VotesMap)

#### Scenario: Competition Item structure
- **WHEN** creating a competition item
- **THEN** it SHALL contain required fields: id, name, website, positioning, pricingPolicy, features (string[]), reviews (Reviews object)
- **AND** optional fields: crunchbaseLink, foundedIn, lastInvestment, totalInvestments, monthlyVisits, clientsAmount, linkedinLink, headcountGrowth, comments

#### Scenario: Reviews structure
- **WHEN** creating reviews data
- **THEN** it MAY contain optional fields: trustpilot, g2, reddit, github, other

#### Scenario: Project structure
- **WHEN** creating a project
- **THEN** it SHALL contain: id, idea (string), problemTa (ProblemTa), competition (CompetitionItem[]), markdownRaw (string)

### Requirement: Votes Map
The system SHALL support a votes map structure where keys are participant names and values are numeric ratings from 1-5.

#### Scenario: Add vote
- **WHEN** a vote is added
- **THEN** the participant name is the key and the rating (1-5) is the value

#### Scenario: Vote value range
- **WHEN** a vote value is set
- **THEN** it SHALL be a number between 1 and 5 inclusive

