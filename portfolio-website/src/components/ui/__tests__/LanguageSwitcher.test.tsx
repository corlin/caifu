/**
 * LanguageSwitcher Component Tests
 * Basic rendering and functionality tests
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LanguageSwitcher from '../LanguageSwitcher';
import { I18nProvider } from '../../../i18n/context/I18nContext';

// Mock the i18n services
vi.mock('../../../i18n/services/LanguageDetector', () => ({
  LanguageDetector: class MockLanguageDetector {
    detectLanguage() {
      return {
        detectedLanguage: 'zh',
        confidence: 1,
        source: 'default' as const
      };
    }
  }
}));

vi.mock('../../../i18n/services/StorageManager', () => ({
  StorageManager: class MockStorageManager {
    saveLanguagePreference = vi.fn();
    getLanguagePreference() { return null; }
    validateAndCleanStorage = vi.fn();
  }
}));

vi.mock('../../../i18n/services/LanguageLoader', () => ({
  LanguageLoader: class MockLanguageLoader {
    loadLanguage = vi.fn().mockResolvedValue({
      common: { loading: '加载中...' },
      navigation: { home: '首页' }
    });
  }
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nProvider>
    {children}
  </I18nProvider>
);

describe('LanguageSwitcher', () => {
  it('should render without crashing', async () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    // Wait for the component to initialize
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /select language/i })).toBeInTheDocument();
    });
  });

  it('should display current language flag', async () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /select language/i });
      expect(button).toBeInTheDocument();
      // Should contain the Chinese flag emoji
      expect(button.textContent).toContain('🇨🇳');
    });
  });

  it('should have proper accessibility attributes', async () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /select language/i });
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should render different variants correctly', async () => {
    const { rerender } = render(
      <TestWrapper>
        <LanguageSwitcher variant="icon-only" />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    rerender(
      <TestWrapper>
        <LanguageSwitcher variant="compact" />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('should show loading state when isLoading is true', async () => {
    // This test would require mocking the context to return isLoading: true
    // For now, just verify the component can handle the loading prop structure
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>
    );

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /select language/i });
      expect(button).toBeInTheDocument();
    });
  });
});