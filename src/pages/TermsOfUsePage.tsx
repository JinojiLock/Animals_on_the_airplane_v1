import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const TermsOfUsePage: React.FC = () => {
  const { t } = useTranslation();
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>{t('terms.pageTitle')} | AirPets</title>
        <meta name="description" content={t('terms.metaDescription')} />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t('terms.intro')}
          </p>

          {/* Section 1: What is AirPets */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">ℹ️</span>
              {t('terms.whatIsAirPets.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {t('terms.whatIsAirPets.description')}
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-gray-800 dark:text-gray-200">
                <strong>⚠️ {t('terms.whatIsAirPets.warning.title')}</strong> {t('terms.whatIsAirPets.warning.description')}
              </p>
            </div>
          </section>

          {/* Section 2: Acceptable Use */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">✅</span>
              {t('terms.acceptableUse.title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('terms.acceptableUse.search')}</li>
              <li>{t('terms.acceptableUse.compare')}</li>
              <li>{t('terms.acceptableUse.save')}</li>
              <li>{t('terms.acceptableUse.share')}</li>
            </ul>
          </section>

          {/* Section 3: Prohibited Activities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">❌</span>
              {t('terms.prohibited.title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('terms.prohibited.copy')}</li>
              <li>{t('terms.prohibited.commercial')}</li>
              <li>{t('terms.prohibited.attack')}</li>
              <li>{t('terms.prohibited.spam')}</li>
              <li>{t('terms.prohibited.impersonate')}</li>
              <li>{t('terms.prohibited.scraping')}</li>
            </ul>
          </section>

          {/* Section 4: Disclaimer of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">⚠️</span>
              {t('terms.disclaimer.title')}
            </h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t('terms.disclaimer.weAreNotResponsible.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('terms.disclaimer.weAreNotResponsible.inaccuracy')}</li>
                <li>{t('terms.disclaimer.weAreNotResponsible.losses')}</li>
                <li>{t('terms.disclaimer.weAreNotResponsible.transportIssues')}</li>
                <li>{t('terms.disclaimer.weAreNotResponsible.airlineActions')}</li>
                <li>{t('terms.disclaimer.weAreNotResponsible.outdatedInfo')}</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t('terms.disclaimer.youAreResponsible.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>{t('terms.disclaimer.youAreResponsible.verify')}</li>
                <li>{t('terms.disclaimer.youAreResponsible.documents')}</li>
                <li>{t('terms.disclaimer.youAreResponsible.compliance')}</li>
                <li>{t('terms.disclaimer.youAreResponsible.petSafety')}</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">©</span>
              {t('terms.intellectualProperty.title')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>{t('terms.intellectualProperty.airlineData')}</li>
              <li>{t('terms.intellectualProperty.siteDesign')}</li>
              <li>{t('terms.intellectualProperty.logos')}</li>
              <li>{t('terms.intellectualProperty.trademarks')}</li>
            </ul>
          </section>

          {/* Section 6: Modifications to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📝</span>
              {t('terms.modifications.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.modifications.description')}
            </p>
          </section>

          {/* Section 7: Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🚫</span>
              {t('terms.termination.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.termination.description')}
            </p>
          </section>

          {/* Section 8: Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">⚖️</span>
              {t('terms.governingLaw.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.governingLaw.description')}
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">{t('terms.contact.title')}</h2>
            <p className="mb-4 text-blue-50">{t('terms.contact.description')}</p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
            >
              {t('terms.contact.button')}
            </button>
          </section>
        </div>
      </main>

      <Footer />
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
    </div>
  );
};

export default TermsOfUsePage;
