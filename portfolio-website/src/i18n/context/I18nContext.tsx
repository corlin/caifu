/**
 * I18n Context and Provider implementation
 * Integrates all service layer components and provides centralized state management
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { 
  I18nContextType, 
  TranslationContent,
  LanguageDetectionResult 
} from '../types';
import { LanguageDetector } from '../services/LanguageDetector';
import { StorageManager } from '../services/StorageManager';
import { LanguageLoader } from '../services/LanguageLoader';
import { i18nConfig, CONSTANTS } from '../config';

// Create the context
const I18nContext = createContext<I18nContextType | null>(null);

// Custom hook to use the I18n context
export const useI18nContext = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18nContext must be used within an I18nProvider');
  }
  return context;
};

// Provider props interface
interface I18nProviderProps {
  children: React.ReactNode;
  onError?: (error: Error) => void;
}

// Provider component
export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  onError 
}) => {
  // State management
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18nConfig.defaultLanguage);
  const [translations, setTranslations] = useState<TranslationContent>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Service instances
  const languageDetector = useRef(new LanguageDetector());
  const storageManager = useRef(new StorageManager());
  const languageLoader = useRef(new LanguageLoader());

  // Debouncing for rapid language switches
  const debounceTimeoutRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // Error handling utility
  const handleError = useCallback((error: Error, context: string) => {
    const errorMessage = `${context}: ${error.message}`;
    console.error(errorMessage, error);
    setError(errorMessage);
    
    // Call external error handler if provided
    if (onError) {
      onError(error);
    }
  }, [onError]);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Translation function with parameter replacement and fallback
  const t = useCallback((key: string, params?: Record<string, string>): string => {
    try {
      // Navigate through nested translation keys
      const keys = key.split('.');
      let value: any = translations;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Key not found, try fallback language if available
          if (currentLanguage !== i18nConfig.fallbackLanguage) {
            // For now, return the key itself as fallback
            // In a full implementation, we'd load the fallback language
            console.warn(`Translation key not found: ${key} for language: ${currentLanguage}`);
            return key;
          }
          return key;
        }
      }

      // Ensure we have a string value
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`);
        return key;
      }

      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce((text, [paramKey, paramValue]) => {
          return text.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
        }, value);
      }

      return value;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  }, [translations, currentLanguage]);

  // Load language with error recovery
  const loadLanguageWithRetry = useCallback(async (
    languageCode: string, 
    retryCount = 0
  ): Promise<TranslationContent> => {
    try {
      return await languageLoader.current.loadLanguage(languageCode);
    } catch (error) {
      if (retryCount < CONSTANTS.MAX_RETRIES) {
        console.warn(`Retry ${retryCount + 1} loading language: ${languageCode}`);
        await new Promise(resolve => setTimeout(resolve, CONSTANTS.RETRY_DELAY));
        return loadLanguageWithRetry(languageCode, retryCount + 1);
      }
      
      // If all retries failed and this isn't the fallback language, try fallback
      if (languageCode !== i18nConfig.fallbackLanguage) {
        console.warn(`Failed to load ${languageCode}, trying fallback language`);
        return loadLanguageWithRetry(i18nConfig.fallbackLanguage);
      }
      
      throw error;
    }
  }, []);

  // Change language with debouncing and error handling
  const changeLanguage = useCallback(async (languageCode: string): Promise<void> => {
    // Validate language code
    if (!i18nConfig.supportedLanguages.some(lang => lang.code === languageCode)) {
      const error = new Error(`Unsupported language: ${languageCode}`);
      handleError(error, 'Language Change');
      return;
    }

    // Clear any existing debounce timeout
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce rapid language switches
    debounceTimeoutRef.current = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        clearError();

        // Load the new language
        const newTranslations = await loadLanguageWithRetry(languageCode);
        
        // Update state
        setCurrentLanguage(languageCode);
        setTranslations(newTranslations);
        
        // Save to storage
        storageManager.current.saveLanguagePreference(languageCode);
        
        console.log(`Successfully switched to language: ${languageCode}`);
      } catch (error) {
        handleError(error as Error, 'Language Change');
      } finally {
        setIsLoading(false);
      }
    }, CONSTANTS.DEBOUNCE_DELAY);
  }, [handleError, clearError, loadLanguageWithRetry]);

  // Initialize the i18n system
  useEffect(() => {
    const initializeI18n = async () => {
      if (isInitializedRef.current) return;
      
      try {
        setIsLoading(true);
        clearError();

        // Clean up any invalid stored preferences
        storageManager.current.validateAndCleanStorage();

        // Detect the appropriate language
        const detection: LanguageDetectionResult = languageDetector.current.detectLanguage();
        console.log('Language detection result:', detection);

        // Load the detected language
        const initialTranslations = await loadLanguageWithRetry(detection.detectedLanguage);
        
        // Update state
        setCurrentLanguage(detection.detectedLanguage);
        setTranslations(initialTranslations);
        
        // Save the detected language if it came from browser detection
        if (detection.source === 'browser') {
          storageManager.current.saveLanguagePreference(detection.detectedLanguage);
        }

        isInitializedRef.current = true;
        console.log(`I18n system initialized with language: ${detection.detectedLanguage}`);
      } catch (error) {
        handleError(error as Error, 'I18n Initialization');
        
        // Emergency fallback - set minimal state to prevent app crash
        setCurrentLanguage(i18nConfig.defaultLanguage);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    initializeI18n();
  }, [handleError, clearError, loadLanguageWithRetry]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Context value
  const contextValue: I18nContextType = {
    currentLanguage,
    availableLanguages: i18nConfig.supportedLanguages,
    translations,
    changeLanguage,
    t,
    isLoading,
    error
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

// Error boundary component for I18n errors
interface I18nErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class I18nErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  I18nErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): I18nErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('I18n Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div role="alert" style={{ padding: '20px', textAlign: 'center' }}>
          <h2>多语言系统错误 / Multilingual System Error</h2>
          <p>语言系统遇到错误，请刷新页面重试。</p>
          <p>The language system encountered an error. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              padding: '10px 20px', 
              marginTop: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            刷新页面 / Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default I18nContext;