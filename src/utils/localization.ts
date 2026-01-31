import type { TransportConditions } from '../types';

/**
 * Get localized value from conditions based on current language
 */
export function getLocalizedCondition(
  conditions: TransportConditions | undefined,
  field: keyof TransportConditions,
  language: string
): string | string[] | undefined {
  if (!conditions) return undefined;

  const isEnglish = language === 'en';
  
  // Map fields to their English counterparts
  const fieldMap: Record<string, string> = {
    maxCarrierSize: 'maxCarrierSizeEn',
    maxWeight: 'maxWeightEn',
    allowedAnimals: 'allowedAnimalsEn',
    additionalInfo: 'additionalInfoEn',
  };

  if (isEnglish && fieldMap[field]) {
    const enField = fieldMap[field] as keyof TransportConditions;
    const enValue = conditions[enField];
    // Fallback to Russian if English not available
    return enValue || conditions[field];
  }

  return conditions[field];
}
