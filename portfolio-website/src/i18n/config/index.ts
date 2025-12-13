/**
 * I18n configuration constants and settings
 */

import type { I18nConfig } from '../types';

export const i18nConfig: I18nConfig = {
  defaultLanguage: 'zh',
  fallbackLanguage: 'en',
  supportedLanguages: [
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵'
    }
  ],
  storageKey: 'preferred-language',
  loadTimeout: 5000
};

// 常量定义
export const CONSTANTS = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  DETECTION_TIMEOUT: 100,
  SWITCH_TIMEOUT: 200,
  DEBOUNCE_DELAY: 300
} as const;

// 错误消息常量
export const ERROR_MESSAGES = {
  LANGUAGE_LOAD_FAILED: 'Failed to load language package',
  STORAGE_ACCESS_FAILED: 'Failed to access local storage',
  DETECTION_FAILED: 'Language detection failed',
  VALIDATION_FAILED: 'Language package validation failed',
  NETWORK_ERROR: 'Network error occurred',
  TIMEOUT_ERROR: 'Operation timed out'
} as const;