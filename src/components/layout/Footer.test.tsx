import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { FooterProps, MenuGroup, Link, SocialLink } from '../../types';

// Mock data for testing
const mockMenuGroups: MenuGroup[] = [
  {
    title: '关于我们',
    items: [
      { title: '公司简介', url: '/about' },
      { title: '团队介绍', url: '/team' },
      { title: '发展历程', url: '/history' },
    ],
  },
  {
    title: '产品服务',
    items: [
      { title: '产品一', url: '/products/1' },
      { title: '产品二', url: '/products/2' },
      { title: '服务支持', url: '/support' },
    ],
  },
];

const mockSocialLinks: SocialLink[] = [
  { title: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
  { title: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { title: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
];

const mockContactInfo = {
  address: '北京市朝阳区某某街道123号',
  phone: '+86 123 4567 8900',
  email: 'contact@example.com',
};

const mockLegalLinks: Link[] = [
  { title: '隐私政策', url: '/privacy' },
  { title: '使用条款', url: '/terms' },
  { title: '网站地图', url: '/sitemap' },
];

const mockProps: FooterProps = {
  logo: '/images/logo.png',
  menuGroups: mockMenuGroups,
  socialLinks: mockSocialLinks,
  contactInfo: mockContactInfo,
  copyrightText: '© {year} 我的网站. 保留所有权利.',
  legalLinks: mockLegalLinks,
};

describe('Footer Component', () => {
  test('renders logo and site description', () => {
    render(<Footer {...mockProps} />);
    const logoElement = screen.getByAltText('我的网站');
    expect(logoElement).toBeInTheDocument();
    expect(screen.getByText('这是一个现代化的网站')).toBeInTheDocument();
  });

  test('renders menu groups and their items', () => {
    render(<Footer {...mockProps} />);
    
    // Check menu group titles
    expect(screen.getByText('关于我们')).toBeInTheDocument();
    expect(screen.getByText('产品服务')).toBeInTheDocument();
    
    // Check menu items
    expect(screen.getByText('公司简介')).toBeInTheDocument();
    expect(screen.getByText('团队介绍')).toBeInTheDocument();
    expect(screen.getByText('发展历程')).toBeInTheDocument();
    expect(screen.getByText('产品一')).toBeInTheDocument();
    expect(screen.getByText('产品二')).toBeInTheDocument();
    expect(screen.getByText('服务支持')).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Footer {...mockProps} />);
    
    expect(screen.getByText('联系我们')).toBeInTheDocument();
    expect(screen.getByText('北京市朝阳区某某街道123号')).toBeInTheDocument();
    expect(screen.getByText('+86 123 4567 8900')).toBeInTheDocument();
    expect(screen.getByText('contact@example.com')).toBeInTheDocument();
  });

  test('renders social links', () => {
    render(<Footer {...mockProps} />);
    
    // Check that social links are rendered with correct attributes
    const socialLinks = screen.getAllByRole('link', { name: /facebook|twitter|instagram/i });
    expect(socialLinks).toHaveLength(3);
    
    expect(socialLinks[0]).toHaveAttribute('href', 'https://facebook.com');
    expect(socialLinks[1]).toHaveAttribute('href', 'https://twitter.com');
    expect(socialLinks[2]).toHaveAttribute('href', 'https://instagram.com');
  });

  test('renders copyright text with current year', () => {
    render(<Footer {...mockProps} />);
    
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(`© ${currentYear} 我的网站. 保留所有权利.`)).toBeInTheDocument();
  });

  test('renders legal links', () => {
    render(<Footer {...mockProps} />);
    
    expect(screen.getByText('隐私政策')).toBeInTheDocument();
    expect(screen.getByText('使用条款')).toBeInTheDocument();
    expect(screen.getByText('网站地图')).toBeInTheDocument();
  });
});