import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { getFAQSchema } from '../utils/seoSchemas';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    // О сайте
    {
      category: 'about',
      question: t('faq.whatIsAirPets.question'),
      answer: t('faq.whatIsAirPets.answer'),
    },
    {
      category: 'about',
      question: t('faq.isFree.question'),
      answer: t('faq.isFree.answer'),
    },
    {
      category: 'about',
      question: t('faq.dataSource.question'),
      answer: t('faq.dataSource.answer'),
    },
    {
      category: 'about',
      question: t('faq.dataAccuracy.question'),
      answer: t('faq.dataAccuracy.answer'),
    },

    // Как пользоваться сайтом
    {
      category: 'usage',
      question: t('faq.howToSearch.question'),
      answer: t('faq.howToSearch.answer'),
    },
    {
      category: 'usage',
      question: t('faq.whatAreBadges.question'),
      answer: t('faq.whatAreBadges.answer'),
    },
    {
      category: 'usage',
      question: t('faq.howToSwitchLanguage.question'),
      answer: t('faq.howToSwitchLanguage.answer'),
    },
    {
      category: 'usage',
      question: t('faq.airlineNotFound.question'),
      answer: t('faq.airlineNotFound.answer'),
    },
    {
      category: 'usage',
      question: t('faq.canPrint.question'),
      answer: t('faq.canPrint.answer'),
    },

    // Понимание информации
    {
      category: 'understanding',
      question: t('faq.whatIsCabin.question'),
      answer: t('faq.whatIsCabin.answer'),
    },
    {
      category: 'understanding',
      question: t('faq.whatIsBaggage.question'),
      answer: t('faq.whatIsBaggage.answer'),
    },
    {
      category: 'understanding',
      question: t('faq.whatIsCargo.question'),
      answer: t('faq.whatIsCargo.answer'),
    },
    {
      category: 'understanding',
      question: t('faq.carrierSize.question'),
      answer: t('faq.carrierSize.answer'),
    },

    // Общие вопросы о перевозке
    {
      category: 'general',
      question: t('faq.needToPay.question'),
      answer: t('faq.needToPay.answer'),
    },
    {
      category: 'general',
      question: t('faq.whatDocuments.question'),
      answer: t('faq.whatDocuments.answer'),
    },
    {
      category: 'general',
      question: t('faq.howToPrepare.question'),
      answer: t('faq.howToPrepare.answer'),
    },
    {
      category: 'general',
      question: t('faq.canBringMultiple.question'),
      answer: t('faq.canBringMultiple.answer'),
    },

    // Помощь
    {
      category: 'help',
      question: t('faq.wrongData.question'),
      answer: t('faq.wrongData.answer'),
    },
    {
      category: 'help',
      question: t('faq.addAirline.question'),
      answer: t('faq.addAirline.answer'),
    },
    {
      category: 'help',
      question: t('faq.siteIssue.question'),
      answer: t('faq.siteIssue.answer'),
    },
    {
      category: 'help',
      question: t('faq.contactTeam.question'),
      answer: t('faq.contactTeam.answer'),
    },
  ];

  const categories = [
    { id: 'about', title: t('faq.categories.about'), icon: '📋' },
    { id: 'usage', title: t('faq.categories.usage'), icon: '🔍' },
    { id: 'understanding', title: t('faq.categories.understanding'), icon: '💡' },
    { id: 'general', title: t('faq.categories.general'), icon: '✈️' },
    { id: 'help', title: t('faq.categories.help'), icon: '🆘' },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Prepare FAQ schema for SEO
  const faqSchema = getFAQSchema(
    faqData.map(item => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <>
      <SEO
        title={t('faq.pageTitle')}
        description={t('faq.pageDescription')}
        keywords="AirPets FAQ, вопросы о перевозке животных, как пользоваться AirPets, животные в самолете"
        canonicalUrl="/faq"
        schema={faqSchema}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('common.appName')}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-400">FAQ</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ❓ {t('faq.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* FAQ by categories */}
          {categories.map((category) => {
            const categoryQuestions = faqData.filter(
              (item) => item.category === category.id
            );

            if (categoryQuestions.length === 0) return null;

            return (
              <div key={category.id} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </h2>

                <div className="space-y-3">
                  {categoryQuestions.map((item, idx) => {
                    const globalIndex = faqData.indexOf(item);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all"
                      >
                        {/* Question */}
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                        >
                          <span className="font-semibold text-gray-900 dark:text-gray-100 pr-4">
                            {item.question}
                          </span>
                          <svg
                            className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform flex-shrink-0 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Answer */}
                        {isOpen && (
                          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* CTA */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t('faq.stillHaveQuestions')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('faq.contactUs')}
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t('faq.contactButton')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
