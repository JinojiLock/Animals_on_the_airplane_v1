import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showContactForm, setShowContactForm] = useState(false);
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-12 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* О проекте */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="mr-2">🐾</span>
              {t('footer.about')}
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              {t('header.title')}. {t('header.subtitle')}.
            </p>
          </div>

          {/* Полезные ссылки */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('footer.faq')}</h3>
            <ul className="text-gray-300 dark:text-gray-400 text-sm space-y-2">
              <li>
                <span className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
                  • How to prepare your pet for flight
                </span>
              </li>
              <li>
                <span className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
                  • Required documents
                </span>
              </li>
              <li>
                <span className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
                  • Choosing a carrier
                </span>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('footer.contact')}</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-3">
              {t('contact.description')}
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              📧 {t('footer.contact')}
            </button>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-6">
          {/* Disclaimer */}
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
            <h4 className="text-yellow-400 font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {t('footer.disclaimer')}
            </h4>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              {t('footer.disclaimerText')}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <a href="/privacy-policy" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <span className="text-gray-600">•</span>
            <a href="/terms-of-use" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              {t('footer.termsOfUse')}
            </a>
            <span className="text-gray-600">•</span>
            <a href="/about" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              {t('footer.about')}
            </a>
            <span className="text-gray-600">•</span>
            <a href="/faq" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              {t('footer.faq')}
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 dark:text-gray-500 text-sm">
            <p>© {currentYear} {t('common.appName')}. {t('footer.rights')}.</p>
          </div>
        </div>
      </div>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </footer>
  );
};

export default Footer;
