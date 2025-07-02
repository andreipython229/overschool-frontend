# 🚀 Быстрый старт для новых разработчиков

## ⚡ Установка и запуск

### 1. Клонирование и установка зависимостей
```bash
git clone <repository-url>
cd overschool-front
yarn install
```

### 2. Настройка переменных окружения
Создайте файл `.env` в корне проекта:
```env
VITE_RUN_MODE=DEV
VITE_API_URL=http://sandbox.coursehb.ru
```

### 3. Запуск проекта
```bash
yarn start
```
Приложение откроется на http://localhost:3000

---

## 🔑 Ключевые отличия

### Команды
| CRA | Rsbuild |
|-----|---------|
| `npm start` | `yarn start` |
| `npm run build` | `yarn build` |
| `npm test` | `yarn test` |
| `npm run eject` | ❌ |

### Переменные окружения
| CRA | Rsbuild |
|-----|---------|
| `REACT_APP_*` | `VITE_*` |
| `process.env.REACT_APP_API` | `import.meta.env.VITE_API` |

### Импорты
```typescript
// ❌ Старый способ
import { Button } from '../../../components/Button'

// ✅ Новый способ (используйте алиасы)
import { Button } from 'components/Button'
```

---

## 📁 Основные алиасы

```typescript
// Доступные алиасы для импортов
import { Component } from 'components/Component'
import { apiClient } from 'api/client'
import { utils } from 'utils/helpers'
import { types } from 'types/interfaces'
import { store } from 'store/store'
```

---

## 🎨 SCSS особенности

### Глобальные переменные и миксины
```scss
// Импорты миксинов и переменных уже добавлены в каждый SCSS-файл автоматически скриптом
.my-component {
  @include flex-center;
  color: $primary-color;
}
```

---

## 🛠️ Полезные команды

```bash
# Линтинг
yarn lint
yarn lint:fix

# Форматирование
yarn format

# Сборка
yarn build

# Предпросмотр production-сборки
yarn preview
```

---

## ❗ Частые проблемы

### 1. "Module not found"
- Проверьте алиасы в `rsbuild.config.ts` и `tsconfig.json`
- Используйте алиасы вместо относительных путей

### 2. SCSS переменные не работают
- Убедитесь, что файлы `mixin.scss` и `variable.scss` существуют в `src/scss/`

### 3. Переменные окружения недоступны
- Используйте префикс `VITE_`
- Используйте `import.meta.env` вместо `process.env`

---

## 🖼️ Сжатие изображений

Во время сборки Rsbuild автоматически сжимает изображения (png, jpg, webp, gif, svg) через плагин `@rsbuild/plugin-image-compress`.

---

## 📚 Дополнительная информация

- Полное руководство: [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- Документация Rsbuild: https://modernjs.dev/rsbuild/
- Документация React: https://react.dev/

---

**Удачи в разработке! 🎉** 