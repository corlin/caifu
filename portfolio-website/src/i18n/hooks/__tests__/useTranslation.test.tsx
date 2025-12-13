/**
 * Tests for useTranslation hook
 * 
 * Tests cover:
 * - Basic translation functionality
 * - Parameter replacement
 * - Fallback mechanism
 * - Error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTranslation, useT } from '../useTranslation';
import { useI18nContext } from '../../context/I18nContext';

// Mock the I18nContext
vi.mock('../../context/I18nContext', () => ({
  useI18nContext: vi.fn()
}));

const mockUseI18nContext = vi.mocked(useI18nContext);

describe('useTranslation', () => {
  const mockTranslations = {
    common: {
      loading: 'Loading...',
      error: 'Error occurred',
      welcome: 'Welcome, {{name}}!',
      greeting: 'Hello {user}!'
    },
    navigation: {
      home: 'Home',
      about: 'About'
    }
  };

  const mockContextValue = {
    t: vi.fn(),
    currentLanguage: 'en',
    isLoading: false,
    error: null,
    translations: mockTranslations,
    availableLanguages: [],
    changeLanguage: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseI18nContext.mockReturnValue(mockContextValue);
  });

  describe('Basic Translation Functionality', () => {
    it('should return translation function and state', () => {
      const { result } = renderHook(() => useTranslation());
      
      expect(result.current.t).toBeInstanceOf(Function);
      expect(result.current.currentLanguage).toBe('en');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should translate simple keys', () => {
      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.loading');
      expect(translation).toBe('Loading...');
    });

    it('should translate nested keys', () => {
      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('navigation.home');
      expect(translation).toBe('Home');
    });

    it('should return key when translation not found', () => {
      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('nonexistent.key');
      expect(translation).toBe('nonexistent.key');
    });
  });

  describe('Parameter Replacement', () => {
    it('should replace parameters with {{}} syntax', () => {
      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.welcome', { name: 'John' });
      expect(translation).toBe('Welcome, John!');
    });

    it('should replace parameters with {} syntax', () => {
      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.greeting', { user: 'Alice' });
      expect(translation).toBe('Hello Alice!');
    });

    it('should handle multiple parameters', () => {
      const mockTranslationsWithMultipleParams = {
        ...mockTranslations,
        common: {
          ...mockTranslations.common,
          multiParam: 'Hello {{name}}, you have {count} messages'
        }
      };

      mockUseI18nContext.mockReturnValue({
        ...mockContextValue,
        translations: mockTranslationsWithMultipleParams
      });

      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.multiParam', { 
        name: 'John', 
        count: '5' 
      });
      expect(translation).toBe('Hello John, you have 5 messages');
    });

    it('should handle missing parameters gracefully', () => {
      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.welcome');
      expect(translation).toBe('Welcome, {{name}}!');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid keys gracefully', () => {
      const { result } = renderHook(() => useTranslation());
      
      expect(result.current.t('')).toBe('');
      expect(result.current.t(null as any)).toBe('');
      expect(result.current.t(undefined as any)).toBe('');
    });

    it('should handle non-string translation values', () => {
      const mockTranslationsWithObject = {
        common: {
          invalidValue: { nested: 'object' }
        }
      };

      mockUseI18nContext.mockReturnValue({
        ...mockContextValue,
        translations: mockTranslationsWithObject
      });

      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.invalidValue');
      expect(translation).toBe('common.invalidValue');
    });

    it('should handle context errors gracefully', () => {
      mockUseI18nContext.mockReturnValue({
        ...mockContextValue,
        translations: null as any
      });

      const { result } = renderHook(() => useTranslation());
      
      const translation = result.current.t('common.loading');
      expect(translation).toBe('common.loading');
    });
  });

  describe('State Management', () => {
    it('should reflect loading state', () => {
      mockUseI18nContext.mockReturnValue({
        ...mockContextValue,
        isLoading: true
      });

      const { result } = renderHook(() => useTranslation());
      
      expect(result.current.isLoading).toBe(true);
    });

    it('should reflect error state', () => {
      const errorMessage = 'Translation loading failed';
      mockUseI18nContext.mockReturnValue({
        ...mockContextValue,
        error: errorMessage
      });

      const { result } = renderHook(() => useTranslation());
      
      expect(result.current.error).toBe(errorMessage);
    });

    it('should reflect current language', () => {
      mockUseI18nContext.mockReturnValue({
        ...mockContextValue,
        currentLanguage: 'zh'
      });

      const { result } = renderHook(() => useTranslation());
      
      expect(result.current.currentLanguage).toBe('zh');
    });
  });
});

describe('useT', () => {
  const mockTranslations = {
    common: {
      test: 'Test message'
    }
  };

  beforeEach(() => {
    mockUseI18nContext.mockReturnValue({
      t: vi.fn(),
      currentLanguage: 'en',
      isLoading: false,
      error: null,
      translations: mockTranslations,
      availableLanguages: [],
      changeLanguage: vi.fn()
    });
  });

  it('should return only the translation function', () => {
    const { result } = renderHook(() => useT());
    
    expect(result.current).toBeInstanceOf(Function);
  });

  it('should work the same as useTranslation().t', () => {
    const { result: translationResult } = renderHook(() => useTranslation());
    const { result: tResult } = renderHook(() => useT());
    
    const key = 'common.test';
    const translationOutput = translationResult.current.t(key);
    const tOutput = tResult.current(key);
    
    expect(translationOutput).toBe(tOutput);
  });
});