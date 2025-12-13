/**
 * Unit tests for LanguageDetector service
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageDetector } from '../LanguageDetector';

// Mock navigator globally
const mockNavigator = {
  language: 'en-US',
  languages: ['en-US', 'en']
};

Object.defineProperty(globalThis, 'navigator', {
  value: mockNavigator,
  writable: true,
  configurable: true
});

describe('LanguageDetector', () => {
  let detector: LanguageDetector;

  beforeEach(() => {
    detector = new LanguageDetector();
    vi.clearAllMocks();
  });

  describe('detectLanguage', () => {
    it('should return stored language when available and supported', () => {
      // Mock localStorage to return a supported language
      vi.mocked(localStorage.getItem).mockReturnValue('zh');
      
      const result = detector.detectLanguage();
      
      expect(result.detectedLanguage).toBe('zh');
      expect(result.source).toBe('storage');
      expect(result.confidence).toBe(1.0);
    });

    it('should return browser language when no stored preference', () => {
      // Mock localStorage to return null
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      
      // Mock navigator.language
      mockNavigator.language = 'en-US';
      
      const result = detector.detectLanguage();
      
      expect(result.detectedLanguage).toBe('en');
      expect(result.source).toBe('browser');
      expect(result.confidence).toBe(0.8);
    });

    it('should return default language when no supported language found', () => {
      // Mock localStorage to return null
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      
      // Mock navigator.language to unsupported language
      mockNavigator.language = 'fr-FR';
      mockNavigator.languages = ['fr-FR', 'de-DE']; // Only unsupported languages
      
      const result = detector.detectLanguage();
      
      expect(result.detectedLanguage).toBe('zh'); // default language
      expect(result.source).toBe('default');
      expect(result.confidence).toBe(0.5);
    });
  });

  describe('isLanguageSupported', () => {
    it('should return true for supported languages', () => {
      expect(detector.isLanguageSupported('zh')).toBe(true);
      expect(detector.isLanguageSupported('en')).toBe(true);
      expect(detector.isLanguageSupported('ja')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      expect(detector.isLanguageSupported('fr')).toBe(false);
      expect(detector.isLanguageSupported('de')).toBe(false);
      expect(detector.isLanguageSupported('')).toBe(false);
    });
  });

  describe('getBrowserLanguage', () => {
    it('should normalize language codes correctly', () => {
      mockNavigator.language = 'zh-CN';
      
      const result = detector.getBrowserLanguage();
      expect(result).toBe('zh');
    });

    it('should handle navigator.languages array', () => {
      mockNavigator.language = 'fr-FR';
      mockNavigator.languages = ['fr-FR', 'en-US', 'zh-CN'];
      
      const result = detector.getBrowserLanguage();
      expect(result).toBe('en'); // First supported language in the array
    });
  });
});