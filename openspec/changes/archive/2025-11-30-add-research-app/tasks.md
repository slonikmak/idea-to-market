# Tasks: Add Product Research Application

## 1. Project Setup
- [x] 1.1 Initialize Vite + React + TypeScript project
- [x] 1.2 Configure CSS Modules
- [x] 1.3 Set up project structure (components, utils, types, hooks)
- [x] 1.4 Add basic global styles and CSS reset

## 2. Data Model
- [x] 2.1 Create TypeScript interfaces (`B2CProfile`, `B2BProfile`, `ProblemBlock`, `ProblemTa`, `CompetitionItem`, `Project`)
- [x] 2.2 Create React Context for project state
- [x] 2.3 Implement localStorage persistence with debounce
- [x] 2.4 Add initial empty state factory functions

## 3. Layout & Navigation
- [x] 3.1 Create `Header` component
- [x] 3.2 Create two-column `MainLayout` component
- [x] 3.3 Implement tab navigation for right column (Problem+TA / Competition)

## 4. Left Column Components
- [x] 4.1 Create `IdeaInputSection` with textarea
- [x] 4.2 Create `LLMPromptSection` with prompt template buttons
- [x] 4.3 Add prompt templates as constants (Problem+TA, Competition)
- [x] 4.4 Implement clipboard copy with fallback modal
- [x] 4.5 Create `MarkdownSection` with import/export buttons
- [x] 4.6 Add mode selector (Problem+TA / Competition / All)

## 5. Markdown Interop
- [x] 5.1 Implement `buildMarkdownFromState()` generator function
- [x] 5.2 Implement `parseMarkdown()` parser function
- [x] 5.3 Add error handling and partial parse support
- [x] 5.4 Add textarea error highlighting on parse failure

## 6. Problem+TA Form
- [x] 6.1 Create `ProblemTaForm` container component
- [x] 6.2 Create `BasicSection` (projectName, hypothesis)
- [x] 6.3 Create `B2CSection` form fields
- [x] 6.4 Create `B2BSection` form fields
- [x] 6.5 Create `ProblemSection` (what, when, howToMeasure)
- [x] 6.6 Create `SolutionSection`
- [x] 6.7 Create `VotesSection` with add/remove voter support
- [x] 6.8 Add preview card below form (optional)

## 7. Competition Form
- [x] 7.1 Create `CompetitionList` container with summary block
- [x] 7.2 Create `CompetitionItemForm` with collapsible sections
- [x] 7.3 Implement features list with add/remove
- [x] 7.4 Create reviews fields group
- [x] 7.5 Create business metrics fields group
- [x] 7.6 Add "Add Competitor" button functionality

## 8. Integration & Polish
- [x] 8.1 Wire up all components to context
- [x] 8.2 Add form validation indicators
- [x] 8.3 Add loading/saving indicators
- [x] 8.4 Test full UX flow (idea → prompt → markdown → form)
- [x] 8.5 Add basic error boundaries
