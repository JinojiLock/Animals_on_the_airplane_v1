# 🚀 Быстрый старт AirPets

## Предварительные требования

- ✅ Node.js >= 18 (проверь: `node --version`)
- ✅ Docker и Docker Compose (проверь: `docker --version`)
- ✅ Git (проверь: `git --version`)

---

## 📥 Шаг 1: Клонирование репозитория

```bash
# Клонируй репозиторий
git clone https://github.com/JinojiLock/Animals_on_the_airplane_v1.git

# Перейди в папку проекта
cd Animals_on_the_airplane_v1

# Переключись на ветку разработки
git checkout genspark_ai_developer

# Проверь текущую ветку
git branch
# Должно показать: * genspark_ai_developer
```

---

## ⚙️ Шаг 2: Настройка переменных окружения

### Frontend (.env)

```bash
# Скопируй пример
cp .env.example .env

# Файл .env уже настроен правильно, ничего менять не нужно!
```

Содержимое `.env`:
```env
VITE_API_URL=http://localhost:3001/api
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

> 💡 **Для разработки** Telegram токены не обязательны — форма будет выводить сообщения в консоль.

### Backend (.env)

```bash
# Перейди в папку backend
cd backend

# Скопируй пример
cp .env.example .env

# Файл .env уже настроен правильно, ничего менять не нужно!
```

Содержимое `backend/.env`:
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_airlines
DB_USER=petadmin
DB_PASSWORD=petpassword123
CORS_ORIGIN=http://localhost:5173
```

---

## 🐳 Шаг 3: Запуск Docker контейнеров

```bash
# Вернись в корень проекта
cd ..

# Запусти PostgreSQL и pgAdmin
docker-compose up -d

# Проверь что контейнеры запустились
docker-compose ps
```

Должно показать:
```
NAME                    STATUS       PORTS
pet-airlines-db         Up          0.0.0.0:5432->5432/tcp
pet-airlines-pgadmin    Up          0.0.0.0:5050->80/tcp
```

### 🔍 Проверка базы данных (опционально)

Открой pgAdmin: **http://localhost:5050**

Логин:
- Email: `admin@petairlines.com`
- Password: `admin123`

Подключение к базе:
- Host: `postgres` (внутри Docker) или `localhost` (снаружи)
- Port: `5432`
- Database: `pet_airlines`
- Username: `petadmin`
- Password: `petpassword123`

---

## 🔧 Шаг 4: Настройка Backend

```bash
# Перейди в папку backend
cd backend

# Установи зависимости
npm install

# Создай таблицы в базе данных
npm run migrate

# Заполни базу тестовыми данными
npm run seed

# Запусти сервер разработки
npm run dev
```

✅ **Должно появиться:**
```
✅ Server running at http://localhost:3001
✅ Environment: development
✅ Database: pet_airlines
✅ Available endpoints:
   • GET    /health
   • GET    /api/airlines
   • GET    /api/airlines/:id
   • POST   /api/airlines
   • PUT    /api/airlines/:id
   • DELETE /api/airlines/:id
```

### 🧪 Проверка Backend

Открой **новый терминал** и выполни:

```bash
# Проверь здоровье сервера
curl http://localhost:3001/health

# Должно вернуть:
# {"status":"ok","database":"connected","timestamp":"..."}

# Получи список авиакомпаний
curl http://localhost:3001/api/airlines
```

---

## ⚛️ Шаг 5: Настройка Frontend

**Открой НОВЫЙ терминал** (backend должен продолжать работать!):

```bash
# Перейди в корень проекта
cd path/to/Animals_on_the_airplane_v1

# Установи зависимости
npm install --legacy-peer-deps

# Запусти сервер разработки
npm run dev
```

✅ **Должно появиться:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🎉 Шаг 6: Открой приложение

Открой браузер: **http://localhost:5173**

### Что ты увидишь:

1. **🌐 Переключатель языка** (RU/EN) в правом верхнем углу
2. **🌙 Переключатель темы** (Light/Dark) рядом с языком
3. **📱 Уведомление о языке** при первом входе (закрывается кликом)
4. **🔍 Поиск** по названию авиакомпании
5. **🎯 Фильтры** по способу перевозки (Салон, Багаж, Карго)
6. **📋 Карточки авиакомпаний** с деталями

### Попробуй:
- ✅ Переключить язык RU ↔ EN
- ✅ Переключить тему Light ↔ Dark
- ✅ Поискать авиакомпанию
- ✅ Отфильтровать по способу перевозки

---

## 🔄 Последующие запуски

После первой настройки для запуска нужно только:

```bash
# 1. Запусти Docker (если не запущен)
docker-compose up -d

# 2. Запусти Backend (в отдельном терминале)
cd backend && npm run dev

# 3. Запусти Frontend (в отдельном терминале)
npm run dev

# 4. Открой http://localhost:5173
```

---

## 🛑 Остановка

```bash
# Останови Frontend: Ctrl + C в терминале
# Останови Backend: Ctrl + C в терминале

# Останови Docker контейнеры
docker-compose down

# Если нужно удалить данные БД:
docker-compose down -v
```

---

## 🆘 Решение проблем

### ❌ Docker контейнеры не запускаются

```bash
# Проверь что Docker запущен
docker ps

# Посмотри логи
docker-compose logs postgres
docker-compose logs pgadmin

# Перезапусти
docker-compose restart
```

### ❌ Backend не подключается к БД

```bash
# Проверь что контейнеры запущены
docker-compose ps

# Проверь .env файл
cat backend/.env

# Пересоздай миграции
cd backend
npm run migrate
npm run seed
```

### ❌ Frontend показывает ошибки

```bash
# Очисти и переустанови
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### ❌ Порты заняты

Если порты 3001, 5173, 5432 или 5050 заняты:

```bash
# Найди что использует порт (пример для 3001)
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows

# Останови процесс или измени порт в .env
```

---

## 📊 Полезные команды

```bash
# Проверка статуса всего стека
docker-compose ps              # Docker контейнеры
curl localhost:3001/health     # Backend
curl localhost:3001/api/airlines  # API
open http://localhost:5173     # Frontend

# Просмотр логов
docker-compose logs -f postgres  # PostgreSQL
docker-compose logs -f pgadmin   # pgAdmin

# Работа с БД
npm run migrate                # Создать таблицы
npm run seed                   # Заполнить данными
psql -h localhost -U petadmin -d pet_airlines  # Прямой доступ к БД

# Git
git status                     # Статус изменений
git pull origin genspark_ai_developer  # Обновить код
git log --oneline -5           # Последние коммиты
```

---

## 🎯 Что дальше?

После успешного запуска:

1. ✅ Протестируй все функции (язык, тема, поиск, фильтры)
2. ✅ Посмотри админ панель: http://localhost:5173/admin (пароль: `admin123`)
3. ✅ Дай фидбек по текущей реализации
4. ✅ Скажи что делать дальше (FAQ, О проекте, логотип, аналитика)

---

**Готов к запуску? Начинай с Шага 1!** 🚀
