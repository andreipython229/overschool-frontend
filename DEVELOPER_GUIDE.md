# Руководство разработчика: Переход на Rsbuild

## 📋 Содержание
1. [Основные различия](#основные-различия)
2. [Структура проекта](#структура-проекта)
3. [Команды разработки](#команды-разработки)
4. [Конфигурация](#конфигурация)
5. [Импорты и алиасы](#импорты-и-алиасы)
6. [Стили и SCSS](#стили-и-scss)
7. [Переменные окружения](#переменные-окружения)
8. [Сборка и деплой](#сборка-и-деплой)
9. [Отладка и инструменты](#отладка-и-инструменты)
10. [Частые проблемы и решения](#частые-проблемы-и-решения)

---

## 🚀 Основные различия

### CRA vs Rsbuild

| Аспект | CRA | Rsbuild |
|--------|-----|--------|
| **Скорость запуска** | Медленный (webpack) | Очень быстрый (Rspack) |
| **Hot Module Replacement** | Стандартный | Мгновенный |
| **Конфигурация** | Скрытая (eject) | Прозрачная (rsbuild.config.ts) |
| **Сборка** | webpack | Rspack |
| **Точка входа** | src/index.js | index.html + src/index.tsx |
| **Переменные окружения** | REACT_APP_* | VITE_* |

---

## 📁 Структура проекта

```
overschool-front/
├── src/
│   ├── components/          # React компоненты
│   ├── Pages/              # Страницы приложения
│   ├── MobilePages/        # Мобильные страницы
│   ├── ServicePages/       # Сервисные страницы
│   ├── store/              # Redux store
│   ├── api/                # API клиенты
│   ├── utils/              # Утилиты
│   ├── customHooks/        # Кастомные хуки
│   ├── types/              # TypeScript типы
│   ├── enum/               # Перечисления
│   ├── selectors/          # Redux селекторы
│   ├── constants/          # Константы
│   ├── config/             # Конфигурация
│   ├── scss/               # SCSS стили
│   ├── assets/             # Статические ресурсы
│   ├── App.tsx             # Основное приложение
│   ├── AppMobile.tsx       # Мобильное приложение
│   └── index.tsx           # Точка входа
├── index.html              # HTML шаблон
├── rsbuild.config.ts       # Конфигурация Rsbuild
├── tsconfig.json           # TypeScript конфигурация
├── package.json            # Зависимости
└── scripts/                # Вспомогательные скрипты
```

---

## ⚡ Команды разработки

| CRA | Rsbuild | Описание |
|-----|---------|----------|
| `npm start` | `yarn start` | Запуск dev сервера |
| `npm run build` | `yarn build` | Сборка для продакшена |
| `npm test` | `yarn test` | Запуск тестов |
| `npm run eject` | ❌ | Больше не нужно! |

### Дополнительные команды

```bash
# Предпросмотр production-сборки
yarn preview

# Линтинг
yarn lint
yarn lint:fix

# Форматирование кода
yarn format
```

---

## ⚙️ Конфигурация

### Основные файлы конфигурации

1. **`rsbuild.config.ts`** — главная конфигурация (заменяет vite/webpack config)
2. **`tsconfig.json`** — TypeScript настройки
3. **`index.html`** — HTML шаблон

### Ключевые особенности конфигурации

#### Алиасы путей
```typescript
// rsbuild.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    'components': path.resolve(__dirname, './src/components'),
    'utils': path.resolve(__dirname, './src/utils'),
    // ... и другие
  }
}
```

#### SCSS глобальные импорты

Импорты миксинов и переменных автоматически добавлены в каждый SCSS-файл скриптом.

#### Прокси для API
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://sandbox.coursehb.ru',
      changeOrigin: true,
    }
  }
}
```

---

## 📦 Импорты и алиасы

### Использование алиасов

```typescript
// ❌ Старый способ (относительные пути)
import { Button } from '../../../components/Button'
import { apiClient } from '../../../../api/client'

// ✅ Новый способ (алиасы)
import { Button } from 'components/Button'
import { apiClient } from 'api/client'

или

import { Button } from '@/components/Button'
import { apiClient } from '@/api/client'
```

### Доступные алиасы

| Алиас | Путь |
|-------|------|
| `@/*` | `src/*` |
| `components/*` | `src/components/*` |
| `utils/*` | `src/utils/*` |
| `customHooks/*` | `src/customHooks/*` |
| `types/*` | `src/types/*` |
| `store/*` | `src/store/*` |
| `api/*` | `src/api/*` |
| `Pages/*` | `src/Pages/*` |
| `scss/*` | `src/scss/*` |

---

## 🎨 Стили и SCSS

### Глобальные миксины и переменные

Импорты миксинов и переменных уже добавлены в каждый SCSS-файл автоматически скриптом.

```scss
.my-component {
  @include flex-center;
  color: $primary-color;
}
```

### CSS модули

```typescript
// Импорт CSS модулей
import styles from './Component.module.scss'

// Использование
<div className={styles.container}>
```

---

## 🔧 Переменные окружения

### Изменение префикса

| CRA | Rsbuild |
|-----|---------|
| `REACT_APP_API_URL` | `VITE_API_URL` |
| `REACT_APP_RUN_MODE` | `VITE_RUN_MODE` |

### Использование в коде

```typescript
// ❌ CRA
const apiUrl = process.env.REACT_APP_API_URL

// ✅ Rsbuild
const apiUrl = import.meta.env.VITE_API_URL
```

### Типизация переменных

```typescript
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_RUN_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

---

## 🚀 Сборка и деплой

### Оптимизация сборки

Rsbuild использует Rspack для продакшн сборки с автоматической оптимизацией:

- **Code splitting** — автоматическое разделение кода
- **Tree shaking** — удаление неиспользуемого кода
- **Минификация** — сжатие кода
- **Сжатие изображений** — автоматическая оптимизация через плагин `@rsbuild/plugin-image-compress`

### Анализ бандла

```bash
yarn build
# После сборки можно анализировать размер build/
```

### Docker

```bash
# Сборка Docker образа
docker build -t overschool-front .

# Запуск с docker-compose
docker-compose up
```

**Для деплоя на сервер** используйте содержимое папки `build` с любым статическим сервером (например, nginx или serve).

---

## 🐛 Отладка и инструменты

### DevTools

1. **React DevTools** — стандартные React инструменты
2. **Redux DevTools** — для отладки состояния

### Source Maps

Source maps включены в dev-режиме, отключены в production по умолчанию.

### Линтинг и форматирование

```bash
# ESLint
yarn lint
yarn lint:fix

# Prettier
yarn format
```

---

## ❗ Частые проблемы и решения

### 1. Проблема с импортами

**Проблема**: `Module not found` ошибки
**Решение**: Проверьте алиасы в `rsbuild.config.ts` и `tsconfig.json`

### 2. SCSS переменные недоступны

**Проблема**: Переменные не распознаются
**Решение**: Убедитесь, что файлы `mixin.scss` и `variable.scss` существуют в `src/scss/`

### 3. Переменные окружения не работают

**Проблема**: `process.env` не определен
**Решение**: Используйте `import.meta.env` и префикс `VITE_`

### 4. Медленная сборка

**Проблема**: Сборка занимает много времени
**Решение**: Используйте динамические импорты, разделяйте вендорные библиотеки

### 5. Проблемы с TypeScript

**Проблема**: Ошибки типизации
**Решение**: 
- Проверьте `tsconfig.json`
- Убедитесь, что типы установлены: `@types/*`

---

## 📚 Полезные ссылки

- [Rsbuild Documentation](https://modernjs.dev/rsbuild/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 🎯 Чек-лист для новых разработчиков

- [ ] Установлены зависимости: `yarn install`
- [ ] Настроены переменные окружения
- [ ] Изучены алиасы путей
- [ ] Понятны различия в импортах
- [ ] Настроен линтер и форматтер
- [ ] Запущен dev сервер: `yarn start`
- [ ] Проверена работа SCSS
- [ ] Протестирована сборка: `yarn build`

---

## 💡 Советы по производительности

1. **Используйте алиасы** вместо относительных путей
2. **Применяйте динамические импорты** для больших компонентов
3. **Оптимизируйте изображения** — Rsbuild сжимает их автоматически
4. **Используйте React.memo** для предотвращения лишних ререндеров
5. **Применяйте code splitting** для разделения кода по маршрутам

---

*Последнее обновление: 23.06.2025