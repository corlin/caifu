/**
 * useTranslation Hook
 * Provides translation functionality with parameter replacement and fallback mechanism
 * 
 * Requirements implemented:
 * - 3.1: Translation text retrieval from language packages
 * - 3.2: Fallback mechanism when translations are missing
 * - 3.3: Parameter replacement in translation strings
 */

import { useCallback } from 'react';
import { useI18nContext } from '../context/I18nContext';

/**
 * Translation function type
 */
export type TranslationFunction = (
  key: string, 
  params?: Record<string, string>
) => string;

/**
 * useTranslation hook return type
 */
export interface UseTranslationReturn {
  t: TranslationFunction;
  currentLanguage: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for translation functionality
 * 
 * @returns Object containing translation function and state
 */
export const useTranslation = (): UseTranslationReturn => {
  const { 
    currentLanguage, 
    isLoading, 
    error,
    translations 
  } = useI18nContext();

  /**
   * Enhanced translation function with improved fallback mechanism
   * 
   * @param key - Translation key (dot-notation supported: "common.loading")
   * @param params - Optional parameters for string interpolation
   * @returns Translated string with parameters replaced
   */
  const t = useCallback((
    key: string, 
    params?: Record<string, string>
  ): string => {
    try {
      // Input validation
      if (!key || typeof key !== 'string') {
        console.warn('useTranslation: Invalid translation key provided');
        return key || '';
      }

      // Navigate through nested translation keys
      const keys = key.split('.');
      let value: any = translations;
      
      // Traverse the translation object
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Key not found in current language
          console.warn(`Translation key not found: ${key} for language: ${currentLanguage}`);
          
          // Fallback mechanism: return the key itself as placeholder
          // In a production system, this would attempt to load from fallback language
          return key;
        }
      }

      // Ensure we have a string value
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return key;
      }

      // Parameter replacement if provided
      if (params && Object.keys(params).length > 0) {
        return Object.entries(params).reduce((text, [paramKey, paramValue]) => {
          // Support both {{param}} and {param} syntax
          const patterns = [
            new RegExp(`{{${paramKey}}}`, 'g'),
            new RegExp(`{${paramKey}}`, 'g')
          ];
          
          let result = text;
          patterns.forEach(pattern => {
            result = result.replace(pattern, String(paramValue));
          });
          
          return result;
        }, value);
      }

      return value;
    } catch (error) {
      console.error(`Error in useTranslation for key: ${key}`, error);
      // Return key as fallback in case of any error
      return key;
    }
  }, [translations, currentLanguage]);

  return {
    t,
    currentLanguage,
    isLoading,
    error
  };
};

/**
 * Convenience hook for getting just the translation function
 * Useful when you only need the t function and not the state
 */
export const useT = (): TranslationFunction => {
  const { t } = useTranslation();
  return t;
};

export default useTranslation;