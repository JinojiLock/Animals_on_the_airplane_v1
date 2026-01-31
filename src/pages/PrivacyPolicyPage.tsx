import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>{t('privacy.pageTitle')} | AirPets</title>
        <meta name="description" content={t('privacy.metaDescription')} />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t('privacy.intro')}
          </p>

          {/* Section 1: Data Collection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📊</span>
              {t('privacy.dataCollection.title')}
            </h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t('privacy.dataCollection.weDoNotCollect.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('privacy.dataCollection.weDoNotCollect.names')}</li>
                <li>{t('privacy.dataCollection.weDoNotCollect.emails')}</li>
                <li>{t('privacy.dataCollection.weDoNotCollect.phones')}</li>
                <li>{t('privacy.dataCollection.weDoNotCollect.addresses')}</li>
                <li>{t('privacy.dataCollection.weDoNotCollect.payment')}</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t('privacy.dataCollection.weCollect.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('privacy.dataCollection.weCollect.ip')}</li>
                <li>{t('privacy.dataCollection.weCollect.browser')}</li>
                <li>{t('privacy.dataCollection.weCollect.pages')}</li>
                <li>{t('privacy.dataCollection.weCollect.duration')}</li>
                <li>{t('privacy.dataCollection.weCollect.source')}</li>
                <li>{t('privacy.dataCollection.weCollect.language')}</li>
              </ul>
            </div>
          </section>

          {/* Section 2: How We Use Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🎯</span>
              {t('privacy.dataUsage.title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.dataUsage.improve')}</li>
              <li>{t('privacy.dataUsage.analyze')}</li>
              <li>{t('privacy.dataUsage.ux')}</li>
              <li>{t('privacy.dataUsage.bugs')}</li>
              <li>{t('privacy.dataUsage.stats')}</li>
            </ul>
          </section>

          {/* Section 3: Cookies & Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🍪</span>
              {t('privacy.cookies.title')}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {t('privacy.cookies.analytics.title')}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>{t('privacy.cookies.analytics.ga')}</li>
                  <li>{t('privacy.cookies.analytics.ym')}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {t('privacy.cookies.localStorage.title')}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>{t('privacy.cookies.localStorage.language')}</li>
                  <li>{t('privacy.cookies.localStorage.theme')}</li>
                  <li>{t('privacy.cookies.localStorage.preferences')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">⚖️</span>
              {t('privacy.rights.title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.rights.access')}</li>
              <li>{t('privacy.rights.delete')}</li>
              <li>{t('privacy.rights.optOut')}</li>
              <li>{t('privacy.rights.doNotTrack')}</li>
            </ul>
          </section>

          {/* Section 5: Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🔒</span>
              {t('privacy.security.title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('privacy.security.https')}</li>
              <li>{t('privacy.security.noSelling')}</li>
              <li>{t('privacy.security.storage')}</li>
              <li>{t('privacy.security.access')}</li>
            </ul>
          </section>

          {/* Section 6: Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🔗</span>
              {t('privacy.thirdParty.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {t('privacy.thirdParty.description')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <strong>Google Analytics:</strong>{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('privacy.thirdParty.privacyPolicy')}
                </a>
              </li>
              <li>
                <strong>Yandex Metrika:</strong>{' '}
                <a
                  href="https://yandex.com/legal/confidential/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('privacy.thirdParty.privacyPolicy')}
                </a>
              </li>
            </ul>
          </section>

          {/* Section 7: Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📝</span>
              {t('privacy.changes.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('privacy.changes.description')}
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">{t('privacy.contact.title')}</h2>
            <p className="mb-4 text-blue-50">{t('privacy.contact.description')}</p>
            <a
              href="#contact"
              className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('privacy.contact.button')}
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
