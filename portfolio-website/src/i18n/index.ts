/**
 * Main i18n module exports
 * Provides centralized access to all i18n functionality
 */

// Types
export type {
  Language,
  TranslationContent,
  I18nContextType,
  LanguageDetectionResult,
  ErrorRecoveryStrategy,
  LanguagePackageValidationResult,
  I18nConfig
} from './types';

// Configuration
export { i18nConfig, CONSTANTS, ERROR_MESSAGES } from './config';

// Services
export { LanguageDetector } from './services/LanguageDetector';
export { StorageManager } from './services/StorageManager';
export { LanguageLoader } from './services/LanguageLoader';

// Context and Provider
export { I18nProvider, I18nErrorBoundary, useI18nContext } from './context/I18nContext';

// Hooks
export { useTranslation, useT } from './hooks';
export type { UseTranslationReturn, TranslationFunction } from './hooks';

// Re-export for convenience
export * from './types';
export * from './config';