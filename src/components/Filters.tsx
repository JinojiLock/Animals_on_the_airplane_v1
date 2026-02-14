import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TransportMethod } from '../types';

interface FiltersProps {
  selectedMethods: TransportMethod[];
  searchQuery: string;
  onMethodToggle: (method: TransportMethod) => void;
  onSearchChange: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedMethods,
  searchQuery,
  onMethodToggle,
  onSearchChange,
}) => {
  const { t } = useTranslation();

  const transportMethodLabels: Record<TransportMethod, string> = {
    cargo: `📦 ${t('filters.cargo')}`,
    baggage: `🧳 ${t('filters.baggage')}`,
    cabin: `✈️ ${t('filters.cabin')}`,
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{t('filters.transportMethod')}</h2>
      
      {/* Поиск по названию авиакомпании */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('common.search')}
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('filters.searchPlaceholder')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Фильтр по способу перевозки */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t('filters.transportMethod')}
        </label>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(transportMethodLabels) as TransportMethod[]).map((method) => (
            <button
              key={method}
              onClick={() => onMethodToggle(method)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedMethods.includes(method)
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {transportMethodLabels[method]}
            </button>
          ))}
        </div>
        {selectedMethods.length > 0 && (
          <button
            onClick={() => selectedMethods.forEach(onMethodToggle)}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
          >
            {t('filters.reset')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
