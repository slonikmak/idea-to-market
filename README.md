# Product Research Tool — Short README

A compact React + TypeScript app that helps you research product ideas: capture an idea, analyze Problem + Target Audience, perform competitive research, and exchange results with LLMs via Markdown.

Key features
- Idea editor and structured forms for Problem + TA and Competition items
- Prompt generator (Problem+TA and Competition) — copy prompts for any LLM or research tool
- Markdown Import/Export: generate Markdown from the app or import LLM-generated Markdown back into the editor
- In-app help modal (click the ❓ next to the header title)

Why use "Deep Research" for Competition?
Competition analysis typically requires current, external data (web results, business profiles, reviews). The app creates structured prompts for Competition — run those prompts in a deep-research service (ChatGPT, Perplexity, or another LLM/search tool), then paste the LLM's Markdown output into the Markdown panel and import it into the app.

Quick start
1. Install dependencies:
```pwsh
npm install
```
2. Run the dev server:
```pwsh
npm run dev
```
3. Create a production build:
```pwsh
npm run build
```

Where to look in the code
- Header and help modal: `src/components/Header/Header.tsx`
- Prompt generator UI: `src/components/LeftColumn/LLMPromptSection.tsx`
- Markdown import/export logic: `src/components/LeftColumn/MarkdownSection.tsx` and `src/utils/markdown.ts`

Short workflow
1. Enter your idea in the left column.
2. Use the prompt generator to create Problem+TA and/or Competition prompts.
3. For Competition: run prompts using a deep-research LLM/service and copy the Markdown result.
4. Paste the LLM Markdown in the Markdown panel and use "Import from Markdown" to update structured data.

Contributing & next steps
- Add integrations for direct LLM API calls, improve parsing/mapping rules, and add localization or sample templates as needed.

---

Коротко (на русском)

Приложение для исследовательской работы над идеями: ввод идеи, Problem+TA, Competition, генерация подсказок и импорт/экспорт через Markdown. Для глубокого поиска в разделе Competition рекомендуется использовать внешние Deep Research сервисы (ChatGPT, Perplexity и т.п.).
  # Product Research Tool — Short README

  A compact React + TypeScript app that helps you research product ideas: capture an idea, analyze Problem + Target Audience, perform competitive research, and exchange results with LLMs via Markdown.

  Key features
  - Idea editor and structured forms for Problem + TA and Competition items
  - Prompt generator (Problem+TA and Competition) — copy prompts for any LLM or research tool
  - Markdown Import/Export: generate Markdown from the app or import LLM-generated Markdown back into the editor
  - In-app help modal (click the ❓ next to the header title)

  Why use "Deep Research" for Competition?
  Competition analysis typically requires current, external data (web results, business profiles, reviews). The app creates structured prompts for Competition — run those prompts in a deep-research service (ChatGPT, Perplexity, or another LLM/search tool), then paste the LLM's Markdown output into the Markdown panel and import it into the app.

  Quick start
  1. Install dependencies:
  ```pwsh
  npm install
  ```
  1. Run the dev server:
  ```pwsh
  npm run dev
  ```
  1. Create a production build:
  ```pwsh
  npm run build
  ```

  Where to look in the code
  - Header and help modal: `src/components/Header/Header.tsx`
  - Prompt generator UI: `src/components/LeftColumn/LLMPromptSection.tsx`
  - Markdown import/export logic: `src/components/LeftColumn/MarkdownSection.tsx` and `src/utils/markdown.ts`

  Short workflow
  1. Enter your idea in the left column.
  2. Use the prompt generator to create Problem+TA and/or Competition prompts.
  3. For Competition: run prompts using a deep-research LLM/service and copy the Markdown result.
  4. Paste the LLM Markdown in the Markdown panel and use "Import from Markdown" to update structured data.

