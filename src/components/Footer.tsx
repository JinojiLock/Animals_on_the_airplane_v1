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

        {/* Copyright */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-6 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>© {currentYear} {t('common.appName')}. {t('footer.rights')}.</p>
          <p className="mt-2 text-xs">
            Information is for reference only. Please verify current rules on airline website before your flight.
          </p>
        </div>
      </div>

      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </footer>
  );
};

export default Footer;
