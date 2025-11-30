# Design: Product Research Application

## Context
This is a frontend-only SPA for product idea research. Users manually interact with LLMs (copy/paste), so no API integration is needed. The app structures Problem+TA and Competition data and provides markdown interop for LLM workflows.

**Stakeholders**: Product researchers, idea validators
**Constraints**: 
- No backend/API calls
- Browser-only (localStorage for persistence)
- Manual LLM interaction (clipboard-based)

## Goals / Non-Goals

### Goals
- Provide structured forms for Problem+TA and Competition data entry
- Generate LLM prompts with idea context substitution
- Parse LLM markdown responses into structured data
- Generate markdown from structured data
- Persist state locally in browser

### Non-Goals
- Direct LLM API integration
- Multi-user collaboration
- Backend server
- Cloud sync

## Decisions

### Decision 1: React + TypeScript + Vite
**Rationale**: Modern, fast dev experience, excellent TypeScript support. Vite provides fast HMR and simple configuration.

**Alternatives considered**:
- Create React App: Slower, less maintained
- Next.js: Overkill for SPA without backend

### Decision 2: CSS Modules for styling
**Rationale**: Scoped styles, no runtime overhead, works well with TypeScript.

**Alternatives considered**:
- Tailwind: Adds complexity, utility classes can be verbose
- Styled-components: Runtime overhead, separate dependency

### Decision 3: Custom markdown parser (regex-based)
**Rationale**: Fixed markdown structure allows simple regex parsing. No need for full AST parser.

**Alternatives considered**:
- remark/unified: Heavy for structured markdown with known format
- marked: Good for rendering, not for extracting structured data

### Decision 4: React Context for state management
**Rationale**: Simple, built-in, sufficient for single-page app with moderate state complexity.

**Alternatives considered**:
- Redux: Overkill for this app size
- Zustand: Good option, but Context is simpler for this use case

### Decision 5: Debounced localStorage persistence
**Rationale**: Auto-save with 500-1000ms debounce prevents data loss without excessive writes.

## Component Architecture

```
App
├── Header
├── MainLayout (two-column)
│   ├── LeftColumn
│   │   ├── IdeaInputSection
│   │   ├── LLMPromptSection
│   │   └── MarkdownSection
│   └── RightColumn
│       ├── TabNavigation (Problem+TA | Competition)
│       ├── ProblemTaForm (when tab active)
│       │   ├── BasicSection
│       │   ├── B2CSection
│       │   ├── B2BSection
│       │   ├── ProblemSection
│       │   ├── SolutionSection
│       │   └── VotesSection
│       └── CompetitionList (when tab active)
│           └── CompetitionItemForm[]
```

## Data Flow

```
User Input → State Update → localStorage (debounced)
                ↓
         Form Rendering

Markdown Import → Parser → State Update → Form Re-render

Form Data → Generator → Markdown Text → Textarea Display
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| localStorage quota exceeded | Limit stored data, warn user on large datasets |
| Markdown parsing errors | Graceful degradation, show unparsed sections, detailed error messages |
| Clipboard API not available | Fallback to manual copy from modal |

## Open Questions
- Should we support multiple projects? (Deferred to future change)
- Export/import project files? (Deferred to future change)
