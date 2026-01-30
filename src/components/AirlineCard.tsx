import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Airline } from '../types';
import TransportMethodBadge from './TransportMethodBadge';

interface AirlineCardProps {
  airline: Airline;
}

const AirlineCard: React.FC<AirlineCardProps> = ({ airline }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 dark:border-gray-700 flex flex-col">
      {/* Название авиакомпании */}
      <div className="flex items-center space-x-3 mb-4">
        {/* <span className="text-4xl">{airline.logo || '✈️'}</span> */}
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{airline.name}</h3>
      </div>

      {/* Доступные способы перевозки */}
      <div className="mb-6 flex-grow">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
          {t('airline.transportMethods')}:
        </h4>
        <div className="flex flex-wrap gap-2">
          {airline.transportMethods.map((method) => (
            <TransportMethodBadge
              key={method}
              method={method}
              conditions={airline.conditions?.[method]}
            />
          ))}
        </div>
      </div>

      {/* Ссылка на сайт */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <Link
          to={`/airline/${airline.id}`}
          className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-2"
        >
          <span>{t('airline.viewDetails')}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
        <a
          href={airline.rulesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <span>{t('airline.officialRules')}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AirlineCard;
