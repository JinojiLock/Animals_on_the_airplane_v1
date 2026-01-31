# AirPets Favicon and Icons

## Favicon созданы из логотипа с кошкой 🐱✈️

### Необходимые файлы (скачай и помести в папку `public/`):

1. **favicon.ico** (16x16, 32x32) - основной favicon для браузеров
2. **favicon-192x192.png** - для Android и Chrome
3. **favicon-512x512.png** - для PWA и крупных экранов
4. **apple-touch-icon.png** (180x180) - для iOS/Safari

### Исходное изображение:
![AirPets Logo](https://www.genspark.ai/api/files/s/LnhERzhL?cache_control=3600)

### Как сгенерировать иконки:

Используй один из онлайн-сервисов:

1. **RealFaviconGenerator** (рекомендуется): https://realfavicongenerator.net/
   - Загрузи изображение выше
   - Выбери настройки для всех платформ
   - Скачай ZIP с готовыми иконками

2. **Favicon.io**: https://favicon.io/favicon-converter/
   - Загрузи изображение
   - Скачай сгенерированные файлы

3. **ImageMagick** (если установлен):
   ```bash
   # Скачай исходное изображение
   curl -o airpets-logo.png "https://www.genspark.ai/api/files/s/LnhERzhL?cache_control=3600"
   
   # Создай разные размеры
   convert airpets-logo.png -resize 16x16 favicon-16.png
   convert airpets-logo.png -resize 32x32 favicon-32.png
   convert airpets-logo.png -resize 192x192 favicon-192x192.png
   convert airpets-logo.png -resize 512x512 favicon-512x512.png
   convert airpets-logo.png -resize 180x180 apple-touch-icon.png
   
   # Создай favicon.ico (содержит оба размера)
   convert favicon-16.png favicon-32.png favicon.ico
   ```

### После генерации:

1. Помести все файлы в папку `public/`
2. `index.html` уже настроен с правильными ссылками
3. Перезапусти dev-сервер: `npm run dev`
4. Проверь в браузере - favicon должен появиться в табе

### Проверка:
- Открой http://localhost:5173
- В табе браузера должна быть иконка с кошкой 🐱
- На мобильных при добавлении на главный экран - та же иконка
