/**
 * Core TypeScript interfaces for the multilingual support system
 */

// 语言配置接口
export interface Language {
  code: string;           // 语言代码 (zh, en, ja)
  name: string;          // 语言显示名称
  nativeName: string;    // 语言本地名称
  flag: string;          // 国旗emoji或图标
}

// 翻译内容接口
export interface TranslationContent {
  [key: string]: string | TranslationContent;
}

// I18n上下文接口
export interface I18nContextType {
  currentLanguage: string;
  availableLanguages: Language[];
  translations: TranslationContent;
  changeLanguage: (languageCode: string) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
  isLoading: boolean;
  error: string | null;
}

// 语言检测结果接口
export interface LanguageDetectionResult {
  detectedLanguage: string;
  confidence: number;
  source: 'browser' | 'storage' | 'default';
}

// 错误恢复策略接口
export interface ErrorRecoveryStrategy {
  maxRetries: number;
  retryDelay: number;
  fallbackAction: () => void;
  errorReporting: (error: Error) => void;
}

// 语言包验证结果接口
export interface LanguagePackageValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// I18n配置接口
export interface I18nConfig {
  defaultLanguage: string;
  fallbackLanguage: string;
  supportedLanguages: Language[];
  storageKey: string;
  loadTimeout: number;
}