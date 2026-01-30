import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <span className="text-4xl">🐾</span>
            <div>
              <h1 className="text-3xl font-bold">
                {t('header.title')}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                {t('header.subtitle')}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {!isAdminPage && (
              <Link
                to="/admin"
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <span>🛠</span>
                <span className="hidden md:inline">Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
