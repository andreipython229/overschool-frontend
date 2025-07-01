# Руководство разработчика: Переход с CRA на Vite

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

### CRA vs Vite

| Аспект | CRA | Vite |
|--------|-----|------|
| **Скорость запуска** | Медленный (webpack) | Очень быстрый (ES modules) |
| **Hot Module Replacement** | Стандартный | Мгновенный |
| **Конфигурация** | Скрытая (eject) | Прозрачная (vite.config.ts) |
| **Сборка** | webpack | Rollup |
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
├── index.html              # HTML шаблон (новое!)
├── vite.config.ts          # Конфигурация Vite
├── tsconfig.json           # TypeScript конфигурация
├── package.json            # Зависимости
└── scripts/                # Вспомогательные скрипты
```

---

## ⚡ Команды разработки

### Старые команды (CRA) → Новые команды (Vite)

| CRA | Vite | Описание |
|-----|------|----------|
| `npm start` | `yarn start` | Запуск dev сервера |
| `npm run build` | `yarn build` | Сборка для продакшена |
| `npm test` | `yarn test` | Запуск тестов |
| `npm run eject` | ❌ | Больше не нужно! |

### Дополнительные команды Vite

```bash
# Предварительный просмотр сборки
yarn preview

# Линтинг
yarn lint
yarn lint:fix

# Форматирование кода
yarn format

# SCSS утилиты
yarn update-scss
yarn fix-scss-mixed
yarn fix-scss-use-order
```

---

## ⚙️ Конфигурация

### Основные файлы конфигурации

1. **`vite.config.ts`** - главная конфигурация (заменяет webpack config)
2. **`tsconfig.json`** - TypeScript настройки
3. **`index.html`** - HTML шаблон (теперь в корне!)

### Ключевые особенности конфигурации

#### Алиасы путей
```typescript
// vite.config.ts
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
```typescript
// Автоматически добавляются в каждый SCSS файл
additionalData: `@use "@/scss/mixin.scss" as *; @use "@/scss/variable.scss" as *;`
```

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

!!! Первый вариант будет работать только при условии, что алиас определен в конфиге, второй вариант будет работать всегда !!!
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

В Vite миксины и переменные автоматически доступны во всех SCSS файлах:

```scss
// ❌ Больше не нужно импортировать в каждом файле
// @import '@/scss/mixin.scss';
// @import '@/scss/variable.scss';

// ✅ Можно сразу использовать
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

### SCSS утилиты

```bash
# Обновление SCSS импортов
yarn update-scss

# Исправление смешанных деклараций
yarn fix-scss-mixed

# Исправление порядка @use
yarn fix-scss-use-order
```

---

## 🔧 Переменные окружения

### Изменение префикса

| CRA | Vite |
|-----|------|
| `REACT_APP_API_URL` | `VITE_API_URL` |
| `REACT_APP_RUN_MODE` | `VITE_RUN_MODE` |

### Использование в коде

```typescript
// ❌ CRA
const apiUrl = process.env.REACT_APP_API_URL

// ✅ Vite
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

Vite использует Rollup для продакшн сборки с автоматической оптимизацией:

- **Code splitting** - автоматическое разделение кода
- **Tree shaking** - удаление неиспользуемого кода
- **Минификация** - сжатие кода
- **Оптимизация изображений** - автоматическая оптимизация

### Анализ бандла

```bash
yarn build
# Автоматически открывается stats.html с анализом
```

### Docker

```bash
# Сборка Docker образа
docker build -t overschool-front .

# Запуск с docker-compose
docker-compose up
```

---

## 🐛 Отладка и инструменты

### DevTools

1. **Vite DevTools** - встроенные инструменты разработки
2. **React DevTools** - стандартные React инструменты
3. **Redux DevTools** - для отладки состояния

### Source Maps

```typescript
// vite.config.ts
css: {
  devSourcemap: true, // Включены для CSS
},
build: {
  sourcemap: false, // Отключены для продакшена
}
```

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
**Решение**: Проверьте алиасы в `vite.config.ts` и `tsconfig.json`

### 2. SCSS переменные недоступны

**Проблема**: Переменные не распознаются
**Решение**: Убедитесь, что файлы `mixin.scss` и `variable.scss` существуют в `src/scss/`

### 3. Переменные окружения не работают

**Проблема**: `process.env` не определен
**Решение**: Используйте `import.meta.env` и префикс `VITE_`

### 4. Медленная сборка

**Проблема**: Сборка занимает много времени
**Решение**: Vite значительно быстрее CRA, но можно оптимизировать:
- Используйте динамические импорты
- Разделяйте вендорные библиотеки

### 5. Проблемы с TypeScript

**Проблема**: Ошибки типизации
**Решение**: 
- Проверьте `tsconfig.json`
- Убедитесь, что типы установлены: `@types/*`

---

## 📚 Полезные ссылки

- [Vite Documentation](https://vitejs.dev/)
- [Vite Migration Guide](https://vitejs.dev/guide/migration.html)
- [React + Vite](https://vitejs.dev/guide/features.html#react)
- [TypeScript + Vite](https://vitejs.dev/guide/features.html#typescript)

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
3. **Оптимизируйте изображения** через `vite-plugin-imagemin`
4. **Используйте React.memo** для предотвращения лишних ререндеров
5. **Применяйте code splitting** для разделения кода по маршрутам

---

*Последнее обновление: 23.06.2025