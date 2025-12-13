/**
 * Tests for I18nContext and I18nProvider
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { I18nProvider, useI18nContext, I18nErrorBoundary } from '../I18nContext';
import React from 'react';

// Mock the service modules
vi.mock('../../services/LanguageDetector', () => ({
  LanguageDetector: class MockLanguageDetector {
    detectLanguage() {
      return {
        detectedLanguage: 'zh',
        confidence: 1.0,
        source: 'default'
      };
    }
  }
}));

vi.mock('../../services/StorageManager', () => ({
  StorageManager: class MockStorageManager {
    saveLanguagePreference = vi.fn();
    getLanguagePreference = vi.fn().mockReturnValue(null);
    validateAndCleanStorage = vi.fn();
  }
}));

vi.mock('../../services/LanguageLoader', () => ({
  LanguageLoader: class MockLanguageLoader {
    loadLanguage = vi.fn().mockImplementation((lang) => {
      if (lang === 'zh') {
        return Promise.resolve({
          common: { loading: '加载中...' },
          navigation: { home: '首页' }
        });
      } else if (lang === 'en') {
        return Promise.resolve({
          common: { loading: 'Loading...' },
          navigation: { home: 'Home' }
        });
      }
      return Promise.resolve({});
    });
  }
}));

// Mock language files
vi.mock('../../locales/zh.json', () => ({
  default: {
    common: { loading: '加载中...' },
    navigation: { home: '首页' }
  }
}));

vi.mock('../../locales/en.json', () => ({
  default: {
    common: { loading: 'Loading...' },
    navigation: { home: 'Home' }
  }
}));

// Test component that uses the context
const TestComponent: React.FC = () => {
  const { currentLanguage, t, isLoading, changeLanguage, availableLanguages } = useI18nContext();
  
  return (
    <div>
      <div data-testid="current-language">{currentLanguage}</div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="translation">{t('navigation.home')}</div>
      <div data-testid="available-languages">{availableLanguages.length}</div>
      <button 
        data-testid="change-language" 
        onClick={() => changeLanguage('en')}
      >
        Change to English
      </button>
    </div>
  );
};

describe('I18nContext and I18nProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should provide I18n context to child components', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    // Check that context values are provided
    expect(screen.getByTestId('current-language')).toHaveTextContent('zh');
    expect(screen.getByTestId('available-languages')).toHaveTextContent('3');
  });

  it('should handle language changes', async () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    // Wait for initialization
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    // Change language
    const changeButton = screen.getByTestId('change-language');
    await act(async () => {
      changeButton.click();
    });

    // Wait for language change to complete
    await waitFor(() => {
      expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    });
  });

  it('should throw error when useI18nContext is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useI18nContext must be used within an I18nProvider');
    
    consoleSpy.mockRestore();
  });

  it('should handle translation with parameters', async () => {
    const TestComponentWithParams: React.FC = () => {
      const { t } = useI18nContext();
      return <div data-testid="param-translation">{t('common.greeting', { name: 'John' })}</div>;
    };

    render(
      <I18nProvider>
        <TestComponentWithParams />
      </I18nProvider>
    );

    await waitFor(() => {
      // Should return the key if translation not found
      expect(screen.getByTestId('param-translation')).toHaveTextContent('common.greeting');
    });
  });

  it('should render error boundary fallback on error', () => {
    const ThrowError: React.FC = () => {
      throw new Error('Test error');
    };

    render(
      <I18nErrorBoundary>
        <ThrowError />
      </I18nErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/多语言系统错误/)).toBeInTheDocument();
  });

  it('should render custom fallback in error boundary', () => {
    const ThrowError: React.FC = () => {
      throw new Error('Test error');
    };

    const customFallback = <div data-testid="custom-fallback">Custom Error</div>;

    render(
      <I18nErrorBoundary fallback={customFallback}>
        <ThrowError />
      </I18nErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });
});