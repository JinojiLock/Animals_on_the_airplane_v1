import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TransportMethod, Conditions } from '../types';

interface TransportMethodBadgeProps {
  method: TransportMethod;
  conditions?: Conditions;
}

const TransportMethodBadge: React.FC<TransportMethodBadgeProps> = ({ method, conditions }) => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  const transportMethodLabels: Record<TransportMethod, string> = {
    cargo: `📦 ${t('filters.cargo')}`,
    baggage: `🧳 ${t('filters.baggage')}`,
    cabin: `✈️ ${t('filters.cabin')}`,
  };

  const hasDetails = conditions && (
    conditions.maxCarrierSize ||
    conditions.maxWeight ||
    conditions.allowedAnimals?.length ||
    conditions.additionalInfo
  );

  return (
    <div className="relative inline-block">
      <span
        className={`px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors ${
          hasDetails ? 'cursor-help' : ''
        }`}
        onMouseEnter={() => hasDetails && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {transportMethodLabels[method]}
      </span>

      {/* Tooltip */}
      {showTooltip && hasDetails && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-sm p-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 border-blue-500 dark:border-blue-400">
          {/* Стрелка */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-blue-500 dark:border-t-blue-400"></div>
          </div>

          {/* Заголовок */}
          <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
            <h5 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {transportMethodLabels[method]}
            </h5>
          </div>

          {/* Детали */}
          <div className="space-y-3 text-sm max-h-96 overflow-y-auto">
            {conditions?.maxCarrierSize && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  {t('airline.maxCarrierSize')}:
                </span>
                <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                  {conditions.maxCarrierSize}
                </p>
              </div>
            )}

            {conditions?.maxWeight && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  {t('airline.maxWeight')}:
                </span>
                <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                  {conditions.maxWeight}
                </p>
              </div>
            )}

            {conditions?.allowedAnimals && conditions.allowedAnimals.length > 0 && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  {t('airline.allowedAnimals')}:
                </span>
                <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                  {conditions.allowedAnimals.join(', ')}
                </p>
              </div>
            )}

            {conditions?.additionalInfo && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  {t('airline.additionalInfo')}:
                </span>
                <p className="text-gray-600 dark:text-gray-400 break-words whitespace-normal">
                  {conditions.additionalInfo.length > 100
                    ? `${conditions.additionalInfo.substring(0, 100)}...`
                    : conditions.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportMethodBadge;
