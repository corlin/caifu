/**
 * Test setup configuration
 * Sets up testing environment and global utilities
 */

import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

// Mock localStorage and sessionStorage for tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock navigator.language for tests
Object.defineProperty(navigator, 'language', {
  writable: true,
  configurable: true,
  value: 'en-US'
});

Object.defineProperty(navigator, 'languages', {
  writable: true,
  configurable: true,
  value: ['en-US', 'en']
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  sessionStorageMock.getItem.mockClear();
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();

  // Reset navigator properties
  Object.defineProperty(navigator, 'language', {
    writable: true,
    configurable: true,
    value: 'en-US'
  });

  Object.defineProperty(navigator, 'languages', {
    writable: true,
    configurable: true,
    value: ['en-US', 'en']
  });
});