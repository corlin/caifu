// React is used implicitly in JSX
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { MenuItem } from '../../types';

// Mock data for testing
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    title: '首页',
    url: '/',
  },
  {
    id: '2',
    title: '关于我们',
    url: '/about',
  },
  {
    id: '3',
    title: '产品',
    url: '/products',
    subItems: [
      {
        id: '3-1',
        title: '产品类别1',
        url: '/products/category1',
      },
      {
        id: '3-2',
        title: '产品类别2',
        url: '/products/category2',
      },
    ],
  },
  {
    id: '4',
    title: '联系我们',
    url: '/contact',
  },
];

const mockProps = {
  logo: '/images/logo.png',
  menuItems: mockMenuItems,
  userAuthenticated: false,
  onSearch: jest.fn(),
  onLogin: jest.fn(),
  onLogout: jest.fn(),
};

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders logo and site name', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the header content div (first child of header)
    const headerContent = container.querySelector('header > div:first-child') as HTMLElement;
    expect(headerContent).not.toBeNull();
    
    // Find logo within header content
    const logoElement = within(headerContent).getAllByAltText('我的网站')[0];
    expect(logoElement).toBeInTheDocument();
    
    // Find site name within header content
    const siteName = within(headerContent).getAllByText('我的网站')[0];
    expect(siteName).toBeInTheDocument();
  });

  test('renders navigation menu items', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the nav element
    const navElement = container.querySelector('nav') as HTMLElement;
    expect(navElement).not.toBeNull();
    
    // Check menu items within nav
    expect(within(navElement).getByText('首页')).toBeInTheDocument();
    expect(within(navElement).getByText('关于我们')).toBeInTheDocument();
    expect(within(navElement).getByText('产品')).toBeInTheDocument();
    expect(within(navElement).getByText('联系我们')).toBeInTheDocument();
  });

  test('shows login button when user is not authenticated', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the actions container
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    // Find login button within actions container
    const loginButton = within(actionsContainer).getByText('登录');
    expect(loginButton).toBeInTheDocument();
  });

  test('shows logout button when user is authenticated', () => {
    const { container } = render(<Header {...mockProps} userAuthenticated={true} />);
    
    // Get the actions container
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    // Find logout button within actions container
    const logoutButton = within(actionsContainer).getByText('退出');
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls onLogin when login button is clicked', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the actions container
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    // Find and click login button within actions container
    const loginButton = within(actionsContainer).getByText('登录');
    fireEvent.click(loginButton);
    
    expect(mockProps.onLogin).toHaveBeenCalledTimes(1);
  });

  test('calls onLogout when logout button is clicked', () => {
    const { container } = render(<Header {...mockProps} userAuthenticated={true} />);
    
    // Get the actions container
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    // Find and click logout button within actions container
    const logoutButton = within(actionsContainer).getByText('退出');
    fireEvent.click(logoutButton);
    
    expect(mockProps.onLogout).toHaveBeenCalledTimes(1);
  });

  test('opens search input when search button is clicked', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the actions container
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    // Find search button (first button in actions container)
    const searchButton = actionsContainer.querySelector('button:first-child');
    expect(searchButton).not.toBeNull();
    
    // Click search button
    fireEvent.click(searchButton!);
    
    // Check if search input is visible
    const searchInput = screen.getByPlaceholderText('搜索...');
    expect(searchInput).toBeInTheDocument();
  });

  test('calls onSearch when search form is submitted', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the actions container
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    // Find search button (first button in actions container)
    const searchButton = actionsContainer.querySelector('button:first-child');
    expect(searchButton).not.toBeNull();
    
    // Click search button
    fireEvent.click(searchButton!);
    
    // Type in search input
    const searchInput = screen.getByPlaceholderText('搜索...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    // Submit form
    fireEvent.submit(searchInput.closest('form')!);
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('test query');
  });

  test('toggles submenu when parent menu item is clicked', () => {
    const { container } = render(<Header {...mockProps} />);
    
    // Get the nav element
    const navElement = container.querySelector('nav');
    expect(navElement).not.toBeNull();
    
    // Find the Products menu item and click it
    const productsMenuItem = within(navElement!).getByText('产品');
    fireEvent.click(productsMenuItem);
    
    // Find submenu
    const submenu = container.querySelector('.sc-kNOymR') as HTMLElement;
    expect(submenu).not.toBeNull();
    
    // Check if submenu items are visible
    expect(within(submenu).getByText('产品类别1')).toBeInTheDocument();
    expect(within(submenu).getByText('产品类别2')).toBeInTheDocument();
  });

  test('opens mobile menu when hamburger button is clicked', () => {
    // Mock window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600, // Below the md breakpoint
    });
    
    // Trigger resize event to update component
    window.dispatchEvent(new Event('resize'));
    
    const { container } = render(<Header {...mockProps} />);
    
    // Find hamburger button (third button in actions container)
    const actionsContainer = container.querySelector('.sc-eqYatC') as HTMLElement;
    expect(actionsContainer).not.toBeNull();
    
    const hamburgerButton = actionsContainer!.querySelector('button:nth-child(3)');
    expect(hamburgerButton).not.toBeNull();
    
    // Click hamburger button
    fireEvent.click(hamburgerButton!);
    
    // Check if mobile menu is open by checking if mobile menu items are visible
    const mobileMenuItems = container.querySelectorAll('.sc-jaXbil');
    expect(mobileMenuItems.length).toBeGreaterThan(0);
  });
});