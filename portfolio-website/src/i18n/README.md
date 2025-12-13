# Multilingual Support System (I18n)

This directory contains the complete multilingual support system for the portfolio website.

## Directory Structure

```
src/i18n/
├── README.md                    # This documentation
├── index.ts                     # Main module exports
├── types/
│   └── index.ts                # TypeScript interface definitions
├── config/
│   └── index.ts                # Configuration constants and settings
├── services/
│   ├── LanguageDetector.ts     # Browser language detection service
│   ├── StorageManager.ts       # Language preference persistence
│   └── LanguageLoader.ts       # Dynamic language package loading
├── locales/
│   ├── zh.json                 # Chinese translations
│   ├── en.json                 # English translations
│   └── ja.json                 # Japanese translations
└── __tests__/
    ├── integration.test.ts     # Integration tests
    └── locales.test.ts         # Language file tests
```

## Core Components

### Services

- **LanguageDetector**: Automatically detects user's preferred language from browser settings and storage
- **StorageManager**: Handles language preference persistence with fallback strategies
- **LanguageLoader**: Manages dynamic loading and validation of language packages

### Configuration

- **i18nConfig**: Main configuration object with supported languages and settings
- **CONSTANTS**: Performance and behavior constants
- **ERROR_MESSAGES**: Standardized error messages

### Types

Complete TypeScript interfaces for type safety across the entire i18n system.

## Supported Languages

- **Chinese (zh)**: 中文 🇨🇳
- **English (en)**: English 🇺🇸  
- **Japanese (ja)**: 日本語 🇯🇵

## Usage

```typescript
import { LanguageDetector, StorageManager, LanguageLoader } from '@/i18n';

// Detect user's preferred language
const detector = new LanguageDetector();
const result = detector.detectLanguage();

// Manage language preferences
const storage = new StorageManager();
storage.saveLanguagePreference('en');

// Load language packages
const loader = new LanguageLoader();
const translations = await loader.loadLanguage('zh');
```

## Testing

The i18n system includes comprehensive tests:

- Unit tests for each service
- Integration tests for the complete system
- Language file structure validation
- Property-based tests (to be implemented in later tasks)

Run tests with:
```bash
npm run test
```

## Next Steps

This establishes the foundation. Upcoming tasks will implement:

1. React Context and Provider
2. useTranslation Hook
3. Language Switcher UI Component
4. Integration with existing application components
5. Property-based testing for correctness validation