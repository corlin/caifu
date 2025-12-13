/**
 * LanguageSwitcher Usage Examples
 * 
 * This file demonstrates different ways to use the LanguageSwitcher component
 * in various contexts and with different configurations.
 */

import React from 'react';
import { I18nProvider } from '../../i18n/context/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

// Example 1: Basic usage in a header
export const HeaderExample: React.FC = () => (
  <I18nProvider>
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Website</h1>
        <LanguageSwitcher />
      </div>
    </header>
  </I18nProvider>
);

// Example 2: Compact variant for mobile
export const MobileExample: React.FC = () => (
  <I18nProvider>
    <div className="flex items-center space-x-2 p-4">
      <span className="text-sm text-gray-600">Language:</span>
      <LanguageSwitcher variant="compact" />
    </div>
  </I18nProvider>
);

// Example 3: Icon-only variant for minimal UI
export const MinimalExample: React.FC = () => (
  <I18nProvider>
    <div className="flex items-center justify-end p-2">
      <LanguageSwitcher 
        variant="icon-only" 
        placement="bottom-left"
        className="ml-2"
      />
    </div>
  </I18nProvider>
);

// Example 4: Integration with navigation
export const NavigationExample: React.FC = () => (
  <I18nProvider>
    <nav className="bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
        </div>
        <LanguageSwitcher placement="bottom-right" />
      </div>
    </nav>
  </I18nProvider>
);

// Example 5: Responsive usage
export const ResponsiveExample: React.FC = () => (
  <I18nProvider>
    <div className="p-4">
      {/* Desktop: Full variant */}
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>
      
      {/* Mobile: Compact variant */}
      <div className="md:hidden">
        <LanguageSwitcher variant="compact" />
      </div>
    </div>
  </I18nProvider>
);

export default {
  HeaderExample,
  MobileExample,
  MinimalExample,
  NavigationExample,
  ResponsiveExample
};