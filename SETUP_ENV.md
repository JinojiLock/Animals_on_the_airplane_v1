# 🚀 QUICK START: Setup .env

## Проблема
После `git pull` файл `.env` может быть пустым или устаревшим, потому что он в `.gitignore`.

## ✅ Быстрое решение

### Вариант 1: Скопировать .env.development (рекомендуется)

```powershell
cd C:\all_projects_here_pls\Animals_on_the_airplane_v1

# Скопируй готовый dev конфиг
Copy-Item .env.development .env -Force

# Перезапусти dev server
npm run dev
```

### Вариант 2: Скопировать .env.example

```powershell
cd C:\all_projects_here_pls\Animals_on_the_airplane_v1

# Скопируй example в .env
Copy-Item .env.example .env -Force

# Перезапусти dev server
npm run dev
```

### Вариант 3: Создать вручную

Создай файл `.env` в корне проекта со следующим содержимым:

```env
VITE_API_URL=http://localhost:3001/api
VITE_ADMIN_URL=/admin-panel-7k3m9x
VITE_ADMIN_PASSWORD=admin123
VITE_TELEGRAM_BOT_TOKEN=
VITE_TELEGRAM_CHAT_ID=
```

## Проверка

После создания `.env`:

1. **Останови** dev server (Ctrl+C)
2. **Запусти** заново: `npm run dev`
3. Открой http://localhost:5173
4. Открой DevTools (F12) → Console
5. Должно быть:
   ```
   🔒 Admin configuration: {
     ADMIN_URL: "/admin-panel-7k3m9x",
     ENV_LOADED: "✓ Yes"
   }
   ```

## Доступ к админке

После правильной настройки `.env`:

```
http://localhost:5173/admin-panel-7k3m9x
```

Пароль: `admin123`

## Важно

- ⚠️ `.env` **НЕ** коммитится в Git (это правильно!)
- ✅ `.env.example` и `.env.development` коммитятся для примера
- 🔒 В production измени `VITE_ADMIN_URL` и `VITE_ADMIN_PASSWORD`
