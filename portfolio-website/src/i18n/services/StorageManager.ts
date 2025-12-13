/**
 * Storage management service
 * Handles language preference persistence with fallback strategies
 */

import { i18nConfig, ERROR_MESSAGES } from '../config';

export class StorageManager {
  private memoryStorage: Map<string, string> = new Map();

  /**
   * Validate language code against supported languages
   */
  private validateLanguageCode(languageCode: string): boolean {
    if (!languageCode || typeof languageCode !== 'string') {
      return false;
    }
    
    // Check if the language code is in the supported languages list
    return i18nConfig.supportedLanguages.some(lang => lang.code === languageCode);
  }

  /**
   * Sanitize and validate stored language preference
   */
  private sanitizeStoredValue(value: string | null): string | null {
    if (!value) return null;
    
    // Basic sanitization - remove whitespace and convert to lowercase
    const sanitized = value.trim().toLowerCase();
    
    // Validate against supported languages
    if (this.validateLanguageCode(sanitized)) {
      return sanitized;
    }
    
    console.warn(`Invalid language code found in storage: ${value}`);
    return null;
  }

  /**
   * Save language preference to storage
   */
  saveLanguagePreference(languageCode: string): void {
    // Validate input before saving
    if (!this.validateLanguageCode(languageCode)) {
      console.error(`Invalid language code: ${languageCode}. Must be one of: ${i18nConfig.supportedLanguages.map(l => l.code).join(', ')}`);
      return;
    }
    try {
      // Try localStorage first
      localStorage.setItem(i18nConfig.storageKey, languageCode);
    } catch (error) {
      console.warn(ERROR_MESSAGES.STORAGE_ACCESS_FAILED, error);
      
      try {
        // Fallback to sessionStorage
        sessionStorage.setItem(i18nConfig.storageKey, languageCode);
      } catch (sessionError) {
        console.warn('SessionStorage also failed, using memory storage');
        // Final fallback to memory storage
        this.memoryStorage.set(i18nConfig.storageKey, languageCode);
      }
    }
  }

  /**
   * Get language preference from storage
   */
  getLanguagePreference(): string | null {
    try {
      // Try localStorage first
      const stored = localStorage.getItem(i18nConfig.storageKey);
      const sanitized = this.sanitizeStoredValue(stored);
      if (sanitized) return sanitized;
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }

    try {
      // Try sessionStorage
      const stored = sessionStorage.getItem(i18nConfig.storageKey);
      const sanitized = this.sanitizeStoredValue(stored);
      if (sanitized) return sanitized;
    } catch (error) {
      console.warn('Failed to access sessionStorage:', error);
    }

    // Try memory storage
    const memoryStored = this.memoryStorage.get(i18nConfig.storageKey);
    return this.sanitizeStoredValue(memoryStored || null);
  }

  /**
   * Clear language preference from all storage types
   */
  clearLanguagePreference(): void {
    try {
      localStorage.removeItem(i18nConfig.storageKey);
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }

    try {
      sessionStorage.removeItem(i18nConfig.storageKey);
    } catch (error) {
      console.warn('Failed to clear sessionStorage:', error);
    }

    this.memoryStorage.delete(i18nConfig.storageKey);
  }

  /**
   * Check if storage is available
   */
  isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = type === 'localStorage' ? localStorage : sessionStorage;
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate and clean up storage data
   * Removes invalid language preferences from all storage types
   */
  validateAndCleanStorage(): void {
    // Check and clean localStorage
    try {
      const localStored = localStorage.getItem(i18nConfig.storageKey);
      if (localStored && !this.validateLanguageCode(localStored.trim().toLowerCase())) {
        console.warn(`Removing invalid language preference from localStorage: ${localStored}`);
        localStorage.removeItem(i18nConfig.storageKey);
      }
    } catch (error) {
      console.warn('Failed to validate localStorage:', error);
    }

    // Check and clean sessionStorage
    try {
      const sessionStored = sessionStorage.getItem(i18nConfig.storageKey);
      if (sessionStored && !this.validateLanguageCode(sessionStored.trim().toLowerCase())) {
        console.warn(`Removing invalid language preference from sessionStorage: ${sessionStored}`);
        sessionStorage.removeItem(i18nConfig.storageKey);
      }
    } catch (error) {
      console.warn('Failed to validate sessionStorage:', error);
    }

    // Check and clean memory storage
    const memoryStored = this.memoryStorage.get(i18nConfig.storageKey);
    if (memoryStored && !this.validateLanguageCode(memoryStored)) {
      console.warn(`Removing invalid language preference from memory storage: ${memoryStored}`);
      this.memoryStorage.delete(i18nConfig.storageKey);
    }
  }

  /**
   * Get storage info for debugging
   */
  getStorageInfo(): {
    localStorage: boolean;
    sessionStorage: boolean;
    memoryStorage: boolean;
    storedValue: string | null;
    isValid: boolean;
  } {
    const storedValue = this.getLanguagePreference();
    return {
      localStorage: this.isStorageAvailable('localStorage'),
      sessionStorage: this.isStorageAvailable('sessionStorage'),
      memoryStorage: this.memoryStorage.size > 0,
      storedValue,
      isValid: storedValue ? this.validateLanguageCode(storedValue) : true
    };
  }
}