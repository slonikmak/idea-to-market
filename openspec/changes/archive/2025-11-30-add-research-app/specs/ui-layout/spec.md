## ADDED Requirements

### Requirement: Two-Column Layout
The application SHALL display a two-column layout with a left column for idea/markdown work and a right column for structured form editing.

#### Scenario: Layout rendering
- **WHEN** the application loads
- **THEN** the left column SHALL contain IdeaInputSection, LLMPromptSection, and MarkdownSection
- **AND** the right column SHALL contain tabbed forms

### Requirement: Header
The application SHALL display a header with the application name.

#### Scenario: Header display
- **WHEN** the application loads
- **THEN** a header with the application title is visible at the top

### Requirement: Tab Navigation
The right column SHALL have tabs to switch between "Problem + TA" and "Competition" views.

#### Scenario: Tab switching
- **WHEN** user clicks on a tab
- **THEN** the corresponding form is displayed
- **AND** the other form is hidden

#### Scenario: Default tab
- **WHEN** the application loads
- **THEN** the "Problem + TA" tab SHALL be active by default

### Requirement: Idea Input Section
The left column SHALL contain a multi-line textarea for entering the product idea description.

#### Scenario: Idea editing
- **WHEN** user types in the idea textarea
- **THEN** the project.idea state is updated

### Requirement: LLM Prompt Section
The left column SHALL display buttons to generate and copy LLM prompts.

#### Scenario: Copy Problem+TA prompt
- **WHEN** user clicks "Copy prompt for Problem+TA"
- **AND** the idea field is not empty
- **THEN** the system generates a prompt using the Problem+TA template with the idea substituted
- **AND** copies it to clipboard
- **AND** displays a modal/panel showing the generated prompt

#### Scenario: Copy Competition prompt
- **WHEN** user clicks "Copy prompt for Competition"
- **AND** the idea field is not empty
- **THEN** the system generates a prompt using the Competition template with the idea substituted
- **AND** copies it to clipboard
- **AND** displays a modal/panel showing the generated prompt

#### Scenario: Empty idea warning
- **WHEN** user clicks a prompt copy button
- **AND** the idea field is empty
- **THEN** a notification is shown indicating the idea is required

### Requirement: Markdown Section
The left column SHALL contain a large textarea for markdown input/output and import/export buttons.

#### Scenario: Markdown textarea display
- **WHEN** the application loads
- **THEN** a large textarea for markdown is visible

#### Scenario: Mode selector
- **WHEN** user interacts with the markdown section
- **THEN** a mode selector (Problem+TA / Competition / All) determines which data is imported/exported

### Requirement: Problem+TA Form
The "Problem + TA" tab SHALL display a form with sections for Basic, B2C, B2B, Problem, Solution, and Votes.

#### Scenario: Form field editing
- **WHEN** user edits any field in the Problem+TA form
- **THEN** the corresponding state is updated

#### Scenario: Votes management
- **WHEN** user clicks "Add voter"
- **THEN** a new voter entry is added to the votes section
- **AND** user can set name and rating (1-5)

#### Scenario: Vote removal
- **WHEN** user clicks remove on a voter entry
- **THEN** that voter is removed from the votes map

### Requirement: Competition List
The "Competition" tab SHALL display a list of competitor entries with add functionality.

#### Scenario: Add competitor
- **WHEN** user clicks "Add Competitor"
- **THEN** a new empty CompetitionItem is added to the list

#### Scenario: Competitor summary
- **WHEN** the competition tab is active
- **THEN** a summary block showing the count of competitors is displayed

### Requirement: Competition Item Form
Each competitor entry SHALL have a collapsible form with all competitor fields.

#### Scenario: Collapsed view
- **WHEN** a competitor item is collapsed
- **THEN** only name, website, and positioning are visible

#### Scenario: Expanded view
- **WHEN** a competitor item is expanded
- **THEN** all fields are editable including features list, reviews, and business metrics

#### Scenario: Features management
- **WHEN** user adds a feature
- **THEN** a new feature string is added to the features array
- **AND** user can remove individual features
