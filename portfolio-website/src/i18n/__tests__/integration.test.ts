/**
 * Integration tests for i18n module
 */

import { describe, it, expect } from 'vitest';
import { 
  LanguageDetector, 
  StorageManager, 
  LanguageLoader, 
  i18nConfig,
  CONSTANTS,
  ERROR_MESSAGES 
} from '../index';

describe('I18n Module Integration', () => {
  it('should export all required components', () => {
    expect(LanguageDetector).toBeDefined();
    expect(StorageManager).toBeDefined();
    expect(LanguageLoader).toBeDefined();
    expect(i18nConfig).toBeDefined();
    expect(CONSTANTS).toBeDefined();
    expect(ERROR_MESSAGES).toBeDefined();
  });

  it('should have correct configuration structure', () => {
    expect(i18nConfig.defaultLanguage).toBe('zh');
    expect(i18nConfig.fallbackLanguage).toBe('en');
    expect(i18nConfig.supportedLanguages).toHaveLength(3);
    expect(i18nConfig.supportedLanguages.map(l => l.code)).toEqual(['zh', 'en', 'ja']);
  });

  it('should create service instances without errors', () => {
    expect(() => new LanguageDetector()).not.toThrow();
    expect(() => new StorageManager()).not.toThrow();
    expect(() => new LanguageLoader()).not.toThrow();
  });

  it('should have consistent language support across services', () => {
    const detector = new LanguageDetector();
    
    // Test that all configured languages are supported
    for (const lang of i18nConfig.supportedLanguages) {
      expect(detector.isLanguageSupported(lang.code)).toBe(true);
    }
    
    // Test that unsupported languages are rejected
    expect(detector.isLanguageSupported('fr')).toBe(false);
    expect(detector.isLanguageSupported('de')).toBe(false);
  });
});