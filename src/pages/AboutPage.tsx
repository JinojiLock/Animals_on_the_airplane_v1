import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>{t('about.pageTitle')} | AirPets</title>
        <meta name="description" content={t('about.metaDescription')} />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">🎯</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('about.mission.title')}
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {t('about.mission.description')}
          </p>
        </section>

        {/* Problem & Solution */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">💡</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('about.problem.title')}
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('about.problem.description')}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {t('about.solution')}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">✨</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('about.features.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">🔍</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.features.search.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.features.search.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🌍</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.features.multilingual.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.features.multilingual.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">📋</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.features.detailed.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.features.detailed.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🔄</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.features.updated.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.features.updated.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">❤️</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('about.values.title')}
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mr-4 flex-shrink-0">
                <span className="text-xl">🆓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.values.free.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.values.free.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-4 flex-shrink-0">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.values.accurate.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.values.accurate.description')}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2 mr-4 flex-shrink-0">
                <span className="text-xl">🤝</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('about.values.transparent.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('about.values.transparent.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">{t('about.contact.title')}</h2>
          <p className="mb-6 text-blue-50">{t('about.contact.description')}</p>
          <button
            onClick={() => setShowContactForm(true)}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
          >
            {t('about.contact.button')}
          </button>
        </section>
      </main>

      <Footer />
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </div>
  );
};

export default AboutPage;
