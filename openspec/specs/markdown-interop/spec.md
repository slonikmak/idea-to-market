# markdown-interop Specification

## Purpose
TBD - created by archiving change add-research-app. Update Purpose after archive.
## Requirements
### Requirement: Markdown Generation
The system SHALL generate markdown from the current project state.

#### Scenario: Generate all markdown
- **WHEN** buildMarkdownFromState is called with mode "all"
- **THEN** markdown is generated with "## Problem+TA" section followed by "## Competition" section

#### Scenario: Generate Problem+TA markdown only
- **WHEN** buildMarkdownFromState is called with mode "problemTa"
- **THEN** only the "## Problem+TA" section is generated

#### Scenario: Generate Competition markdown only
- **WHEN** buildMarkdownFromState is called with mode "competition"
- **THEN** only the "## Competition" section is generated

#### Scenario: Markdown structure for Problem+TA
- **WHEN** Problem+TA markdown is generated
- **THEN** it SHALL contain sections: ### Basic, ### B2C, ### B2B, ### Problem, ### Solution, ### Votes
- **AND** each field is formatted as "**Field Name**: value"

#### Scenario: Markdown structure for Competition
- **WHEN** Competition markdown is generated
- **THEN** each competitor is a "### Name (url)" heading
- **AND** fields are formatted as "**Field Name**: value"
- **AND** features are formatted as a bullet list after "**Features**:"

### Requirement: Markdown Parsing
The system SHALL parse markdown text into structured project data.

#### Scenario: Parse full markdown
- **WHEN** parseMarkdown is called with mode "all"
- **THEN** both Problem+TA and Competition sections are parsed
- **AND** a ParseResult with problemTa and competition is returned

#### Scenario: Parse Problem+TA only
- **WHEN** parseMarkdown is called with mode "problemTa"
- **THEN** only the "## Problem+TA" section is parsed

#### Scenario: Parse Competition only
- **WHEN** parseMarkdown is called with mode "competition"
- **THEN** only the "## Competition" section is parsed

#### Scenario: Field extraction
- **WHEN** parsing markdown
- **THEN** lines matching "**Field Name**: value" are extracted to corresponding fields

#### Scenario: Multi-line field extraction
- **WHEN** parsing multi-line fields (Lifestyle, Context, What, How to measure, Solution, Comments)
- **THEN** content is collected until the next "**...**:" line or next "###" heading

#### Scenario: Votes parsing
- **WHEN** parsing the Votes section
- **THEN** lines matching "- Name: Number" after "**Votes**:" are extracted to the votes map

#### Scenario: Features parsing
- **WHEN** parsing Competition features
- **THEN** bullet list items after "**Features**:" are extracted to the features array

### Requirement: Parse Error Handling
The system SHALL handle parsing errors gracefully with partial results.

#### Scenario: Missing section error
- **WHEN** a required section (## Problem+TA or ## Competition) is not found
- **AND** that section is requested by the mode
- **THEN** an error is added to ParseResult.errors

#### Scenario: Partial parse success
- **WHEN** some sections parse successfully but others fail
- **THEN** the successfully parsed data is returned
- **AND** errors for failed sections are included in ParseResult.errors

#### Scenario: Missing field handling
- **WHEN** an optional field is not found during parsing
- **THEN** an empty string is used as the default value
- **AND** no error is reported

#### Scenario: Parse error display
- **WHEN** import fails with errors
- **THEN** the markdown textarea is highlighted
- **AND** error messages indicate which sections failed to parse

### Requirement: Import from Markdown
The system SHALL update project state from parsed markdown.

#### Scenario: Successful import
- **WHEN** user clicks "Import from Markdown"
- **THEN** the textarea content is parsed
- **AND** project state is updated with parsed data

#### Scenario: Partial import
- **WHEN** only some sections are successfully parsed
- **THEN** only those parts of the state are updated

### Requirement: Export to Markdown
The system SHALL generate markdown from current form state.

#### Scenario: Generate markdown button
- **WHEN** user clicks "Generate Markdown from form"
- **THEN** markdown is generated from current state
- **AND** the markdown textarea is updated with the generated content

