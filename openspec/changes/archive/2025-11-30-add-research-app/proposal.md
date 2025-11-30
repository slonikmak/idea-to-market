# Change: Add Product Research Application

## Why
Researchers need a tool to structure product idea validation—filling in Problem+TA and Competition data, generating LLM prompts, and importing markdown responses. Currently no tooling exists for this workflow.

## What Changes
- Add React/TypeScript SPA with two-column layout
- Left column: idea input, LLM prompt generation, markdown import/export
- Right column: tabbed forms for Problem+TA and Competition data
- localStorage persistence for project state
- Markdown parser and generator for LLM interop

## Impact
- Affected specs: `ui-layout`, `data-model`, `markdown-interop`, `state-management`
- Affected code: New application (greenfield)
- Breaking changes: None (new project)
