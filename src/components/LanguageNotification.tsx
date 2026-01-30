import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageNotification = () => {
  const { i18n, t } = useTranslation();
  const [show, setShow] = useState(false);
  const [detectedLang, setDetectedLang] = useState<string>('');

  useEffect(() => {
    // Check if user has already seen the notification
    const hasSeenNotification = localStorage.getItem('airpets_lang_notification');
    
    if (!hasSeenNotification) {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = browserLang === 'ru' ? 'ru' : 'en';
      
      // Get saved or current language
      const currentLang = localStorage.getItem('airpets_language') || i18n.language;
      
      // Show notification if browser language differs from current
      if (supportedLang !== currentLang) {
        setDetectedLang(supportedLang === 'ru' ? 'Русский' : 'English');
        setShow(true);
      }
    }
  }, [i18n.language]);

  const handleChange = () => {
    const newLang = detectedLang === 'Русский' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('airpets_lang_notification', 'true');
    setShow(false);
  };

  const handleKeep = () => {
    localStorage.setItem('airpets_lang_notification', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🌍</span>
          <div className="flex-1">
            <p className="text-sm text-gray-800 mb-3">
              {t('languageSwitcher.notification', { language: detectedLang })}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleChange}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {t('languageSwitcher.change')}
              </button>
              <button
                onClick={handleKeep}
                className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                {t('languageSwitcher.keep')}
              </button>
            </div>
          </div>
          <button
            onClick={handleKeep}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageNotification;
