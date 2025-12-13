/**
 * Language package loader service
 * Handles dynamic loading and validation of language packages
 */

import type { TranslationContent, LanguagePackageValidationResult } from '../types';
import { i18nConfig, ERROR_MESSAGES } from '../config';

export class LanguageLoader {
  private cache: Map<string, TranslationContent> = new Map();
  private loadingPromises: Map<string, Promise<TranslationContent>> = new Map();

  /**
   * Load a language package with caching and error handling
   */
  async loadLanguage(languageCode: string): Promise<TranslationContent> {
    // Return cached version if available
    if (this.cache.has(languageCode)) {
      return this.cache.get(languageCode)!;
    }

    // Return existing loading promise if in progress
    if (this.loadingPromises.has(languageCode)) {
      return this.loadingPromises.get(languageCode)!;
    }

    // Start new loading process
    const loadingPromise = this.loadLanguagePackage(languageCode);
    this.loadingPromises.set(languageCode, loadingPromise);

    try {
      const translations = await loadingPromise;
      this.cache.set(languageCode, translations);
      return translations;
    } finally {
      this.loadingPromises.delete(languageCode);
    }
  }

  /**
   * Preload multiple languages
   */
  async preloadLanguages(languageCodes: string[]): Promise<void> {
    const loadPromises = languageCodes.map(code => 
      this.loadLanguage(code).catch(error => {
        console.warn(`Failed to preload language ${code}:`, error);
        return {};
      })
    );

    await Promise.all(loadPromises);
  }

  /**
   * Validate language package structure and content
   */
  validateLanguagePackage(content: any): LanguagePackageValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if content is an object
    if (!content || typeof content !== 'object') {
      errors.push('Language package must be an object');
      return { isValid: false, errors, warnings };
    }

    // Check for required sections
    const requiredSections = ['common', 'navigation', 'home'];
    for (const section of requiredSections) {
      if (!content[section]) {
        errors.push(`Missing required section: ${section}`);
      } else if (typeof content[section] !== 'object') {
        errors.push(`Section ${section} must be an object`);
      }
    }

    // Check for empty values
    this.validateTranslationValues(content, '', errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Clear cache for a specific language or all languages
   */
  clearCache(languageCode?: string): void {
    if (languageCode) {
      this.cache.delete(languageCode);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache status
   */
  getCacheInfo(): { size: number; languages: string[] } {
    return {
      size: this.cache.size,
      languages: Array.from(this.cache.keys())
    };
  }

  /**
   * Load language package from file system
   */
  private async loadLanguagePackage(languageCode: string): Promise<TranslationContent> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), i18nConfig.loadTimeout);

    try {
      // Dynamic import of language file
      const module = await import(`../locales/${languageCode}.json`);
      const content = module.default || module;

      // Validate the loaded content
      const validation = this.validateLanguagePackage(content);
      if (!validation.isValid) {
        throw new Error(`Invalid language package: ${validation.errors.join(', ')}`);
      }

      if (validation.warnings.length > 0) {
        console.warn(`Language package warnings for ${languageCode}:`, validation.warnings);
      }

      return content;
    } catch (error) {
      // If loading fails, try to load fallback language
      if (languageCode !== i18nConfig.fallbackLanguage) {
        console.warn(`Failed to load ${languageCode}, trying fallback language`);
        return this.loadLanguage(i18nConfig.fallbackLanguage);
      }
      
      throw new Error(`${ERROR_MESSAGES.LANGUAGE_LOAD_FAILED}: ${error}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Recursively validate translation values
   */
  private validateTranslationValues(
    obj: any, 
    path: string, 
    errors: string[], 
    warnings: string[]
  ): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string') {
        if (value.trim() === '') {
          warnings.push(`Empty translation value at ${currentPath}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        this.validateTranslationValues(value, currentPath, errors, warnings);
      } else {
        errors.push(`Invalid translation value type at ${currentPath}: expected string or object`);
      }
    }
  }
}