/**
 * LanguageSwitcher Component
 * 
 * A responsive language selection dropdown component that allows users to switch
 * between supported languages. Features current language highlighting, mobile
 * adaptation, and accessibility support.
 * 
 * Requirements implemented:
 * - 2.1: Display available language options when clicked
 * - 2.2: Immediate language switching on selection
 * - 2.5: Highlight current selected language
 * - 6.1: Mobile device adaptation
 * - 6.2: Responsive design for different screen sizes
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useI18nContext } from '../../i18n/context/I18nContext';
import type { Language } from '../../i18n/types';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact' | 'icon-only';
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'default',
  placement = 'bottom-right'
}) => {
  const { 
    currentLanguage, 
    availableLanguages, 
    changeLanguage, 
    isLoading 
  } = useI18nContext();

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Find current language object
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => 
            prev < availableLanguages.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : availableLanguages.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleLanguageSelect(availableLanguages[focusedIndex]);
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, availableLanguages]);

  // Handle language selection
  const handleLanguageSelect = async (language: Language) => {
    if (language.code === currentLanguage) {
      setIsOpen(false);
      return;
    }

    try {
      await changeLanguage(language.code);
      setIsOpen(false);
      setFocusedIndex(-1);
    } catch (error) {
      console.error('Failed to change language:', error);
      // Keep dropdown open on error so user can try again
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFocusedIndex(-1);
  };

  // Get dropdown position classes
  const getDropdownPositionClasses = () => {
    const baseClasses = 'absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg';
    
    switch (placement) {
      case 'bottom-left':
        return `${baseClasses} left-0`;
      case 'bottom-right':
        return `${baseClasses} right-0`;
      case 'top-left':
        return `${baseClasses} bottom-full mb-1 left-0`;
      case 'top-right':
        return `${baseClasses} bottom-full mb-1 right-0`;
      default:
        return `${baseClasses} right-0`;
    }
  };

  // Render button content based on variant
  const renderButtonContent = () => {
    if (variant === 'icon-only') {
      return (
        <>
          <Globe size={20} className="text-gray-600" />
          <span className="sr-only">
            {currentLang ? `Current language: ${currentLang.nativeName}` : 'Select language'}
          </span>
        </>
      );
    }

    if (variant === 'compact') {
      return (
        <>
          <span className="text-lg" role="img" aria-label={currentLang?.name || 'Language'}>
            {currentLang?.flag || '🌐'}
          </span>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </>
      );
    }

    // Default variant
    return (
      <>
        <span className="text-lg mr-2" role="img" aria-label={currentLang?.name || 'Language'}>
          {currentLang?.flag || '🌐'}
        </span>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLang?.nativeName || 'Language'}
        </span>
        <ChevronDown 
          size={16} 
          className={`ml-1 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </>
    );
  };

  // Get button classes based on variant
  const getButtonClasses = () => {
    const baseClasses = `
      relative inline-flex items-center justify-center
      border border-gray-200 rounded-lg
      bg-white hover:bg-gray-50
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    switch (variant) {
      case 'icon-only':
        return `${baseClasses} p-2`;
      case 'compact':
        return `${baseClasses} px-3 py-2`;
      default:
        return `${baseClasses} px-3 py-2 min-w-[120px]`;
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Main Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        disabled={isLoading}
        className={getButtonClasses()}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
            {variant !== 'icon-only' && (
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            )}
          </div>
        ) : (
          renderButtonContent()
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={getDropdownPositionClasses()}
          role="listbox"
          aria-label="Available languages"
        >
          <div className="py-1 max-h-60 overflow-y-auto">
            {availableLanguages.map((language, index) => {
              const isSelected = language.code === currentLanguage;
              const isFocused = index === focusedIndex;
              
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`
                    w-full px-4 py-2 text-left flex items-center
                    transition-colors duration-150
                    ${isSelected 
                      ? 'bg-blue-50 text-blue-700' 
                      : isFocused 
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                    ${isFocused ? 'outline-none' : ''}
                  `}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span 
                    className="text-lg mr-3" 
                    role="img" 
                    aria-label={language.name}
                  >
                    {language.flag}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {language.nativeName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language.name}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;