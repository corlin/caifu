import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from './MainLayout';

// Mock the Header component
jest.mock('./Header', () => {
  return function MockHeader(props: any) {
    return (
      <div data-testid="mock-header">
        <div>Mock Header Component</div>
        <div data-testid="menu-items-count">{props.menuItems.length}</div>
      </div>
    );
  };
});

// Mock the Footer component
jest.mock('./Footer', () => {
  return function MockFooter(props: any) {
    return (
      <div data-testid="mock-footer">
        <div>Mock Footer Component</div>
        <div data-testid="menu-groups-count">{props.menuGroups.length}</div>
        <div data-testid="social-links-count">{props.socialLinks.length}</div>
      </div>
    );
  };
});

describe('MainLayout Component', () => {
  test('renders Header component', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('passes menu items to Header component', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    // Check that we're passing the expected number of menu items
    expect(screen.getByTestId('menu-items-count').textContent).toBe('4');
  });

  test('passes menu groups and social links to Footer component', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    // Check that we're passing the expected number of menu groups and social links
    expect(screen.getByTestId('menu-groups-count').textContent).toBe('3');
    expect(screen.getByTestId('social-links-count').textContent).toBe('5');
  });
});