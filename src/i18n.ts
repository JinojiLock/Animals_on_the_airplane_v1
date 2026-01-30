import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru.json';
import en from './locales/en.json';

// Language resources
const resources = {
  ru: {
    translation: ru
  },
  en: {
    translation: en
  }
};

// Get saved language or detect browser language
const getSavedLanguage = () => {
  const saved = localStorage.getItem('airpets_language');
  if (saved) return saved;
  
  // Detect browser language
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'ru' ? 'ru' : 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'airpets_language'
    }
  });

// Save language change to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('airpets_language', lng);
  document.documentElement.lang = lng;
});

export default i18n;
