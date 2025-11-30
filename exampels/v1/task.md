Ок, давай зафиксируем «боевую» спеку под чистый фронтэнд и ручную работу с LLM.

---

## 1. Цель и ограничения

Приложение помогает ресёрчить продуктовую идею:

* заполнять структуру **Problem + TA**;
* заполнять структуру **Competition**;
* генерировать подсказки (prompt’ы) для LLM на основе введённой идеи;
* принимать от LLM готовый markdown и визуализировать его в форме.

Ограничения:

* только фронтэнд (SPA на React/TypeScript или аналог);
* никакой работы с LLM по API — пользователь сам копирует/вставляет;
* хранение данных локально (в памяти +, по желанию, `localStorage`).

---

## 2. Стек (рекомендованный)

Можно заменить, если нужно, но в спеке будем отталкиваться от этого:

* React + TypeScript.
* Vite или Create React App.
* Любой вариант стилизации: CSS / CSS Modules / Tailwind (на твой выбор).
* Библиотека для парсинга/генерации markdown (например, `marked`, `remark` и т.п.) — не обязательно, можно и свой мини-парсер.

---

## 3. Модель данных (TypeScript интерфейсы)

```ts
// Блок Problem+TA

export interface B2CProfile {
  geography: string;
  sex: string;
  age: string;
  occupation: string;
  education: string;
  lifestyle: string; // текст + возможные списки
  context: string;
}

export interface B2BProfile {
  geography: string;
  sector: string;
  size: string;
  decisionMaker: string;
  urgencyTrigger: string;
  economicFactors: string;
}

export interface ProblemBlock {
  what: string;        // можно хранить как markdown-строки со списками
  when: string;
  howToMeasure: string;
}

export interface VotesMap {
  [person: string]: number; // 1–5
}

export interface ProblemTa {
  projectName: string;
  hypothesis: string;
  b2c: B2CProfile;
  b2b: B2BProfile;
  problem: ProblemBlock;
  solution: string;
  votes: VotesMap;
}

// Блок Competition

export interface Reviews {
  trustpilot?: string;
  g2?: string;
  reddit?: string;
  github?: string;
  other?: string;
}

export interface CompetitionItem {
  id: string;          // uuid или timestamp
  name: string;
  website: string;
  positioning: string;
  pricingPolicy: string;
  features: string[];  // список фич
  reviews: Reviews;
  crunchbaseLink?: string;
  foundedIn?: string;
  lastInvestment?: string;
  totalInvestments?: string;
  monthlyVisits?: string;
  clientsAmount?: string;
  linkedinLink?: string;
  headcountGrowth?: string;
  comments?: string;
}

export interface Project {
  id: string;
  idea: string;              // оригинальное описание идеи
  problemTa: ProblemTa;
  competition: CompetitionItem[];
  markdownRaw: string;       // последний markdown (при желании)
}
```

---

## 4. Структура приложения

### 4.1. Главный экран

Одна страница (один роут `/`):

* **Header** – название приложения.
* **Основная область**: две колонки.

Правая колонка — визуализация и редактирование структур (`Problem + TA`, `Competition`).
Левая колонка — работа с идеей и markdown/LLM.

### 4.2. Левая колонка (Idea + LLM + Markdown)

Секции сверху вниз:

1. **IdeaInputSection**

   * Многострочное поле `textarea` «Описание идеи».
   * Состояние: `project.idea`.
   * Авто-сохранение в state при изменении.

2. **LLMPromptSection**

   * Две кнопки:

     * «Скопировать промпт для Problem+TA»
     * «Скопировать промпт для Competition»

   * Логика кнопки:

     * Если `idea` пустая — показать уведомление.
     * Иначе:

       * Берём шаблон промпта (строка с плейсхолдером `<<<IDEA_DESCRIPTION>>>`).
       * Подставляем текст идеи.
       * Сохраняем готовый промпт во внутреннее состояние и кладём в буфер обмена (`navigator.clipboard.writeText`).
       * Отображаем модалку/панель с промптом «на всякий случай» (чтобы пользователь мог ещё раз скопировать, если clipboard не сработал).

   * Шаблоны промптов — константы в коде (те, что мы уже написали ранее).

3. **MarkdownSection**

   * Заголовок «Markdown от LLM».
   * Большой `textarea` для markdown.
   * Кнопки:

     * «Импортировать из Markdown»
       → парсинг `textarea.value` в `ProblemTa` и `CompetitionItem[]`, обновление state.
     * «Сгенерировать Markdown из формы»
       → построение markdown из текущих `problemTa` и `competition`, запись в `textarea` (и, по желанию, в `project.markdownRaw`).
   * Возможен переключатель вида: `tab = "Problem+TA" | "Competition" | "All"`, чтобы генерировать/импортировать только часть.

Ошибки парсинга:

* При ошибке — подсвечивать `textarea` и выводить сообщение: какая секция не распознана.
* При частичном успехе (например, распарсился `Problem+TA`, но нет `Competition`) — обновлять только те части, которые распарсились.

### 4.3. Правая колонка (визуальная форма)

Табы:

* `Problem + TA`
* `Competition`

#### 4.3.1. Таб «Problem + TA»

Компонент `ProblemTaForm`:

* Поля:

  * Basic

    * `Project name` (input)
    * `Hypothesis` (textarea / input)
  * B2C (группа полей)
  * B2B
  * Problem
  * Solution
  * Vote

Реализация:

* Каждое текстовое поле → `input` или `textarea`, двустороннее связывание с `project.problemTa`.
* Для `votes`:

  * Список строк: «Имя участника» + `input type="number"` 1–5.
  * Кнопка «Добавить голосующего».
  * Кнопка удаления строки.

Отображение (кроме формы):

* Под формой можно вывести компактный preview-карточку:

  * Заголовок = `projectName`.
  * Подзаголовок = `Hypothesis`.
  * Две колонки с B2C/B2B.
  * Блок «Problem» (What/When/How to measure).
  * Блок «Solution».
  * Небольшой список голосов.

#### 4.3.2. Таб «Competition»

Компонент `CompetitionList`:

* Кнопка «Добавить конкурента» — создаёт `CompetitionItem` с пустыми полями.

* Для каждого конкурента — `CompetitionItemForm`:

  * Верхняя строка (компактный вид):

    * `name`, `website`, `positioning` (кратко), иконка свёрнут/развёрнут.
  * Развёрнутая часть:

    * `pricingPolicy` (input/textarea).
    * `features`:

      * список строк,
      * кнопка «Добавить фичу»,
      * возможность удалить строку.
    * Блок `reviews` (5 текстовых полей).
    * Блок бизнес-параметров (`foundedIn`, `lastInvestment`, `totalInvestments`, `monthlyVisits`, `clientsAmount`, `linkedinLink`, `headcountGrowth`).
    * `comments` (textarea).

* Сверху над списком — небольшой summary-блок:

  * количество конкурентов;
  * можно показать карточки с основными цифрами (опционально, но хорошо для визуализации).

---

## 5. Логика работы с markdown

Нужно две основные функции.

### 5.1. Генерация markdown

```ts
function buildMarkdownFromState(project: Project, mode: "all" | "problemTa" | "competition"): string
```

Требования:

* `mode = "all"`:

  * сначала блок `## Problem+TA` в том виде, как мы описали раньше;
  * затем пустая строка;
  * затем блок `## Competition`.
* Структура и заголовки **жёстко фиксированы**, чтобы парсер работал гарантированно.
* Для списков (`what`, `howToMeasure`, `lifestyle`, `features`, `comments`) допускается:

  * если в state лежит уже markdown-строка — вставлять как есть;
  * либо разбивать по `\n` и добавлять `- ` в начале.

Пример структуры для Problem+TA:

```md
## Problem+TA

### Basic
**Project name**: ...
**Hypothesis**: ...

### B2C
**Geography**: ...
**Sex**: ...
...
```

и так далее.

### 5.2. Парсинг markdown

```ts
interface ParseResult {
  problemTa?: ProblemTa;
  competition?: CompetitionItem[];
  errors: string[];
}

function parseMarkdown(markdown: string, mode: "all" | "problemTa" | "competition"): ParseResult
```

Упрощённая логика:

1. Разделить текст на блоки по заголовкам `## Problem+TA` и `## Competition`.
2. Для блока `Problem+TA`:

   * Разбить по строкам.
   * Ищем строки вида `**Имя поля**: значение`.
   * Многострочные поля (`Lifestyle`, `Context`, `What`, `How to measure`, `Solution`, `Comments`) собираем до следующей строки с `**...**:` или до следующего заголовка `###`.
   * `Votes`:

     * после строки `**Votes**:` читаем следующие строки `- Имя: Число`.
3. Для блока `Competition`:

   * Для каждого конкурента:

     * заголовок `### ... (url)`;
     * далее тот же шаблон `**Имя**: значение` + многострочные поля.
   * `Features` — список после строки `**Features**:` до следующего поля.

Ошибки:

* если не найден `## Problem+TA` при `mode="all"` или `"problemTa"` — добавляем в `errors` запись.
* аналогично для `## Competition`.
* если отсутствие какого-то конкретного поля не критично — подставлять пустую строку и не считать это ошибкой.

---

## 6. Управление состоянием и сохранение

* В корневом компоненте `App` хранить состояние `currentProject: Project`.
* Опционально: массив проектов `projects: Project[]` и боковую панель со списком идей (это можно сделать позже).
* При любом изменении `currentProject` — сохранять в `localStorage` под ключом, например, `grant-research-current-project` (дебаунс 500–1000 мс).

---

## 7. UX-поток «от идеи до визуализации»

1. Пользователь открывает приложение, видит пустую форму и левую колонку.
2. Вводит текст идеи в `IdeaInputSection`.
3. Нажимает:

   * «Скопировать промпт для Problem+TA».
4. Вставляет сгенерированный промпт в ChatGPT, получает ответ в markdown.
5. Копирует markdown-ответ LLM.
6. Вставляет его в `MarkdownSection` (textarea).
7. Жмёт «Импортировать из Markdown».
8. Приложение:

   * парсит markdown;
   * обновляет `ProblemTa` и/или `Competition`;
   * отображает структуру во вкладках справа.
9. Пользователь вручную правит поля в формах (если нужно).
10. При желании жмёт «Сгенерировать Markdown из формы», чтобы получить обновлённый markdown и, например, отправить его обратно в LLM.
