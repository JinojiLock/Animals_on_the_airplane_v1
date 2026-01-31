import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Airline, TransportMethod } from '../types';
import { ApiService } from '../services/ApiService';
import SEO from '../components/SEO';
import { getAirlineSchema } from '../utils/seoSchemas';
import { getLocalizedValue } from '../utils/localization';

const AirlineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [airline, setAirline] = useState<Airline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<TransportMethod, boolean>>({
    cabin: false,
    baggage: false,
    cargo: false,
  });

  // Порядок отображения: салон → багаж → карго
  const methodOrder: TransportMethod[] = ['cabin', 'baggage', 'cargo'];

  useEffect(() => {
    const fetchAirline = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await ApiService.getAirlineById(id);
        setAirline(data);
        
        // Открываем первый доступный метод
        if (data.transportMethods.length > 0) {
          const firstMethod = methodOrder.find(m => data.transportMethods.includes(m));
          if (firstMethod) {
            setOpenSections(prev => ({ ...prev, [firstMethod]: true }));
          }
        }
      } catch (err) {
        console.error('Error fetching airline:', err);
        setError(t('results.loadError'));
      } finally {
        setLoading(false);
      }
    };

    fetchAirline();
  }, [id, t]);

  const toggleSection = (method: TransportMethod) => {
    setOpenSections((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const transportMethodConfig: Record<TransportMethod, { icon: string; label: string; color: string }> = {
    cabin: { icon: '✈️', label: t('filters.cabin'), color: 'blue' },
    baggage: { icon: '🧳', label: t('filters.baggage'), color: 'purple' },
    cargo: { icon: '📦', label: t('filters.cargo'), color: 'green' },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !airline) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || t('results.notFound')}</p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('common.back')}
          </Link>
        </div>
      </div>
    );
  }

  const seoTitle = `${airline.name}: ${t('airline.transportConditions')} | ${t('common.appName')}`;
  const seoDescription = `${t('airline.detailsFor')} ${airline.name}. ${t('airline.availableMethods')}: ${airline.transportMethods.map(m => transportMethodConfig[m].label).join(', ')}. ${t('airline.fullInfo')}.`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`${airline.name}, ${t('airline.petTransport')}, ${airline.transportMethods.map(m => transportMethodConfig[m].label).join(', ')}`}
        canonicalUrl={`/airline/${airline.id}`}
        ogType="article"
        schema={getAirlineSchema(airline, i18n.language)}
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
            <span className="text-gray-600 dark:text-gray-400">{airline.name}</span>
          </nav>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {airline.name}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {airline.transportMethods
                .sort((a, b) => methodOrder.indexOf(a) - methodOrder.indexOf(b))
                .map((method) => (
                  <span
                    key={method}
                    className={`px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium`}
                  >
                    {transportMethodConfig[method].icon} {transportMethodConfig[method].label}
                  </span>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>{t('common.back')}</span>
              </Link>
              <a
                href={airline.rulesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <span>{t('airline.officialRules')}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Transport Methods Accordion */}
          <div className="space-y-4">
            {methodOrder
              .filter(method => airline.transportMethods.includes(method))
              .map((method) => {
                const config = transportMethodConfig[method];
                const conditions = airline.conditions?.[method];
                const isOpen = openSections[method];

                return (
                  <div
                    key={method}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleSection(method)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{config.icon}</span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {config.label}
                        </h2>
                      </div>
                      <svg
                        className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && conditions && (
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        {getLocalizedValue(conditions.maxCarrierSize, i18n.language) && (
                          <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t('airline.maxCarrierSize')}:
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                              {getLocalizedValue(conditions.maxCarrierSize, i18n.language)}
                            </p>
                          </div>
                        )}

                        {getLocalizedValue(conditions.maxWeight, i18n.language) && (
                          <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t('airline.maxWeight')}:
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                              {getLocalizedValue(conditions.maxWeight, i18n.language)}
                            </p>
                          </div>
                        )}

                        {getLocalizedValue(conditions.allowedAnimals, i18n.language) && (
                          <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t('airline.allowedAnimals')}:
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                              {Array.isArray(getLocalizedValue(conditions.allowedAnimals, i18n.language))
                                ? (getLocalizedValue(conditions.allowedAnimals, i18n.language) as string[]).join(', ')
                                : getLocalizedValue(conditions.allowedAnimals, i18n.language)}
                            </p>
                          </div>
                        )}

                        {getLocalizedValue(conditions.additionalInfo, i18n.language) && (
                          <div>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t('airline.additionalInfo')}:
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 break-words whitespace-pre-wrap">
                              {getLocalizedValue(conditions.additionalInfo, i18n.language)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AirlineDetailPage;
