## ADDED Requirements

### Requirement: Project State Context
The system SHALL provide a React Context for managing the current project state across all components.

#### Scenario: Context availability
- **WHEN** any component needs project data
- **THEN** it can access the current project via the ProjectContext

#### Scenario: State updates
- **WHEN** any component updates project data
- **THEN** all consuming components re-render with the new state

### Requirement: LocalStorage Persistence
The system SHALL persist project state to localStorage with debounced writes.

#### Scenario: Auto-save on change
- **WHEN** project state changes
- **THEN** the state is saved to localStorage after a 500-1000ms debounce

#### Scenario: Load on startup
- **WHEN** the application loads
- **THEN** project state is restored from localStorage if available
- **AND** an empty project is created if no saved state exists

#### Scenario: Storage key
- **WHEN** saving to localStorage
- **THEN** the key "grant-research-current-project" (or similar) is used

### Requirement: Empty State Factory
The system SHALL provide factory functions to create empty/default state objects.

#### Scenario: Create empty project
- **WHEN** a new project is needed
- **THEN** a factory function returns a Project with empty fields and generated id

#### Scenario: Create empty ProblemTa
- **WHEN** a new ProblemTa is needed
- **THEN** all string fields are empty and votes is an empty object

#### Scenario: Create empty CompetitionItem
- **WHEN** a new competitor is added
- **THEN** a factory function returns a CompetitionItem with generated id and empty fields
