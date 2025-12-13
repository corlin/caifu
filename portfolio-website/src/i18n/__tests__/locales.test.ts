/**
 * Tests for language locale files
 */

import { describe, it, expect } from 'vitest';

describe('Language Locale Files', () => {
  it('should load Chinese language file', async () => {
    const zhLocale = await import('../locales/zh.json');
    expect(zhLocale.default).toBeDefined();
    expect(zhLocale.default.common).toBeDefined();
    expect(zhLocale.default.navigation).toBeDefined();
    expect(zhLocale.default.home).toBeDefined();
    expect(zhLocale.default.projects).toBeDefined();
  });

  it('should load English language file', async () => {
    const enLocale = await import('../locales/en.json');
    expect(enLocale.default).toBeDefined();
    expect(enLocale.default.common).toBeDefined();
    expect(enLocale.default.navigation).toBeDefined();
    expect(enLocale.default.home).toBeDefined();
    expect(enLocale.default.projects).toBeDefined();
  });

  it('should load Japanese language file', async () => {
    const jaLocale = await import('../locales/ja.json');
    expect(jaLocale.default).toBeDefined();
    expect(jaLocale.default.common).toBeDefined();
    expect(jaLocale.default.navigation).toBeDefined();
    expect(jaLocale.default.home).toBeDefined();
    expect(jaLocale.default.projects).toBeDefined();
  });

  it('should have consistent structure across all language files', async () => {
    const [zhLocale, enLocale, jaLocale] = await Promise.all([
      import('../locales/zh.json'),
      import('../locales/en.json'),
      import('../locales/ja.json')
    ]);

    const zhKeys = Object.keys(zhLocale.default);
    const enKeys = Object.keys(enLocale.default);
    const jaKeys = Object.keys(jaLocale.default);

    expect(zhKeys).toEqual(enKeys);
    expect(enKeys).toEqual(jaKeys);

    // Check nested structure consistency
    for (const section of zhKeys) {
      const zhSectionKeys = Object.keys((zhLocale.default as any)[section]);
      const enSectionKeys = Object.keys((enLocale.default as any)[section]);
      const jaSectionKeys = Object.keys((jaLocale.default as any)[section]);

      expect(zhSectionKeys).toEqual(enSectionKeys);
      expect(enSectionKeys).toEqual(jaSectionKeys);
    }
  });
});