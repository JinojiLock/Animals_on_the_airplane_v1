import type { Conditions, LocalizedValue, LocalizedArray } from '../types';

/**
 * Get localized value based on current language
 */
export function getLocalizedValue(
  value: LocalizedValue | LocalizedArray | undefined,
  language: string
): string | string[] | undefined {
  if (!value) return undefined;
  
  if (typeof value === 'object' && !Array.isArray(value)) {
    if (language === 'en' && value.en) {
      return value.en;
    }
    return value.ru || value.en;
  }
  
  return value;
}

/**
 * Get localized condition field
 */
export function getLocalizedCondition(
  conditions: Conditions | undefined,
  field: keyof Conditions,
  language: string
): string | string[] | undefined {
  if (!conditions) return undefined;
  
  const value = conditions[field];
  return getLocalizedValue(value as any, language);
}
