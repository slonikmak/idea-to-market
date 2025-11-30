# Деплой Vite React SPA на GitHub Pages

## Ключевые моменты ✅
- Vite по умолчанию собирает SPA в папку dist.
- Для GitHub Pages важно задать правильный `base` (обычно = `/<repo-name>/`) — иначе пути к ассетам будут относительными к корню домена.
- Можно публиковать dist на ветку `gh-pages` (через пакет `gh-pages`) или использовать GitHub Actions (рекомендуется для CI).

---

## Быстрый вариант — npm + gh-pages (простая настройка)
Подходит если вы хотите пушить из локального окружения и быстро проверить результат.

1. Установите зависимость:
   ```pwsh
   npm install --save-dev gh-pages
   ```

2. В vite.config.ts добавьте `base` с именем репозитория (предположим ваш репо называется `market-feet-tool`). Откройте vite.config.ts и измените:
   ```ts
   export default defineConfig({
     base: '/market-feet-tool/',
     plugins: [react()],
   })
   ```

3. В package.json добавьте скрипты:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   }
   ```
   И (опционально) полное имя репозитория в поле `homepage`:
   ```json
   "homepage": "https://<your-github-username>.github.io/market-feet-tool"
   ```

4. Сборка и деплой:
   ```pwsh
   npm run build
   npm run deploy
   ```
   gh-pages создаст ветку `gh-pages` и опубликует содержимое dist.

---

## Более надёжный вариант — GitHub Actions (recommended)
Плюсы: автоматический деплой при пуше в `main` (или другую ветку), не требует локального деплоя.

1. Оставьте в vite.config.ts `base: '/market-feet-tool/'` (как выше).

2. В репозитории создайте workflow `.github/workflows/deploy.yml`.

  Рекомендуемый, более надёжный pipeline (реализован в примере проекта):

  - Запускается на PR в `main` и при пуше в `main`.
  - Содержит два шага: `build` (lint → typecheck → build, с кэшем npm) и `deploy` (публикация `dist/` — только при успешной сборке на `main`).
  - Загружает артефакт `dist` для удобства отладки в Actions.

  Этот подход даёт быструю проверку PR'ов и уверенный автодеплой только при удачной сборке на `main`.

  Пример workflow (используйте secrets.GITHUB_TOKEN, ничего дополнительно не нужно):
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run lint
         - run: npm run typecheck
         - run: npm run build
         - name: Publish to gh-pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. Push -> GitHub Actions соберёт проект и опубликует сайт на ветке `gh-pages`.

---

## Рекомендации для локальной сборки и типичных проблем

- Если `npm run build` падает локально из-за `esbuild.exe` (Windows) — закройте редакторы/процессы, которые могут держать файл; иногда помогает удаление папки `node_modules` и запуск `npm ci` заново.
- Если система жалуется, что `tsc` не найден ("'tsc' is not recognized"), убедитесь, что dev-зависимости установлены локально (`npm ci`) — `tsc` используется из `node_modules/.bin`.
- Для быстрой локальной проверки CI выполняйте:
```pwsh
npm ci
npm run lint
npm run typecheck
npm run build
```

Эти шаги повторяют CI и помогут отловить проблемы ещё до пуша.

---

## Небольшие подсказки и ошибки, которые можно встретить ⚠️
- Убедитесь, что `base` совпадает с реальным именем репозитория (если сайт публикуется как project site, а не user/org site).
- Если вы хотите GitHub Pages как "user site" (username.github.io), то `base` обычно должен быть `'/'`.
- SPA маршрутизация: если у вас клиентский роутинг, нужно включить fallback (GitHub Pages поддерживает только static files). Обычно peaceiris/actions-gh-pages добавляет корректный `404.html` (или настраиваете вручную) для SPA fallback.
- Если планируете использовать GitHub Pages from /docs on main branch, вместо gh-pages ветки можно: а) положить dist в `docs/` и push в `main`, и в репо -> Pages выбрать `main / docs` как источник.

