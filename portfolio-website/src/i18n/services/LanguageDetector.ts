/**
 * Language detection service
 * Handles automatic language detection from browser settings and storage
 */

import type { LanguageDetectionResult } from '../types';
import { i18nConfig } from '../config';

export class LanguageDetector {
  /**
   * Detect the most appropriate language for the user
   */
  detectLanguage(): LanguageDetectionResult {
    // First try to get stored language preference
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage && this.isLanguageSupported(storedLanguage)) {
      return {
        detectedLanguage: storedLanguage,
        confidence: 1.0,
        source: 'storage'
      };
    }

    // Then try browser language
    const browserLanguage = this.getBrowserLanguage();
    if (browserLanguage && this.isLanguageSupported(browserLanguage)) {
      return {
        detectedLanguage: browserLanguage,
        confidence: 0.8,
        source: 'browser'
      };
    }

    // Fall back to default language
    return {
      detectedLanguage: i18nConfig.defaultLanguage,
      confidence: 0.5,
      source: 'default'
    };
  }

  /**
   * Get browser's preferred language
   */
  getBrowserLanguage(): string | null {
    try {
      // Check navigator.language first
      if (navigator.language) {
        const lang = this.normalizeLanguageCode(navigator.language);
        if (lang && this.isLanguageSupported(lang)) {
          return lang;
        }
      }

      // Check navigator.languages array
      if (navigator.languages && navigator.languages.length > 0) {
        for (const language of navigator.languages) {
          const lang = this.normalizeLanguageCode(language);
          if (lang && this.isLanguageSupported(lang)) {
            return lang;
          }
        }
      }

      return null;
    } catch (error) {
      console.warn('Failed to detect browser language:', error);
      return null;
    }
  }

  /**
   * Get stored language preference from localStorage
   */
  getStoredLanguage(): string | null {
    try {
      return localStorage.getItem(i18nConfig.storageKey);
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
      return null;
    }
  }

  /**
   * Check if a language is supported
   */
  isLanguageSupported(languageCode: string): boolean {
    return i18nConfig.supportedLanguages.some(
      lang => lang.code === languageCode
    );
  }

  /**
   * Normalize language code (e.g., 'zh-CN' -> 'zh', 'en-US' -> 'en')
   */
  private normalizeLanguageCode(languageCode: string): string | null {
    if (!languageCode) return null;
    
    // Extract the primary language code (before the first dash)
    const primaryCode = languageCode.split('-')[0].toLowerCase();
    
    // Validate the code format
    if (!/^[a-z]{2,3}$/.test(primaryCode)) {
      return null;
    }
    
    return primaryCode;
  }
}