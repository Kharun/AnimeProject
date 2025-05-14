# 🎬 Аниме хостинг

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-orange?logo=vite)](https://vitejs.dev/)
[![Anilibria API](https://img.shields.io/badge/API-Anilibria-green)](https://anilibria.tv/)

Проект предоставляет удобный интерфейс для просмотра аниме через Anilibria API с поддержкой десктопных и мобильных устройств.

<!-- ![Скриншот главной страницы](screenshot.jpg) -->

## ✨ Особенности

- 🎥 Просмотр аниме онлайн с Anilibria API
- 🔍 Быстрый поиск по всей базе аниме
- 📱 Адаптивный дизайн (десктоп + мобильные устройства)
- ⚡ Мгновенная загрузка благодаря Vite
- 🎨 Удобный интерфейс на React 18
- 🛠 Типобезопасность с TypeScript
- FSD-архитектура

## 🚀 Быстрый старт

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-username/anilibria-client.git
   cd anilibria-client
   ```
2. Установите зависимости:
   ```bash
   yarn install
   ```
3. Запустите проект:
   ```bash
   yarn dev
   ```
4. Откройте в браузере:
   ```bash
   http://localhost:5173
   ```

## 🛠 Технологии

- Frontend:

- React 18 (Hooks, Router 6)

- TypeScript 5

- Vite 4

- SCSS для стилей

- API:

- Anilibria API

- Дополнительно:

- Axios для запросов

- React Player для воспроизведения видео

- Дебаунс для поиска

## 🏗️ FSD-Архитектура

```
src/
├── app/               # App initialization, routing, providers
├── processes/         # (Optional) Complex multi-page processes
├── pages/             # Page components
├── widgets/           # Self-contained widgets (header/footer)
├── features/          # Feature modules (search, player, auth)
├── entities/          # Business entities (anime, user, review)
├── shared/            # Shared UI & utilities
└── index.tsx          # Entry point
```
