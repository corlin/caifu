import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureSection, { FeatureSectionProps } from './FeatureSection';

describe('FeatureSection Component', () => {
  const mockFeatures = [
    {
      id: '1',
      icon: '/images/feature-icon-1.svg',
      title: '特色功能一',
      description: '这是特色功能一的详细描述，介绍其主要优点和使用场景。',
      link: '/features/1'
    },
    {
      id: '2',
      icon: '/images/feature-icon-2.svg',
      title: '特色功能二',
      description: '这是特色功能二的详细描述，介绍其主要优点和使用场景。'
    },
    {
      id: '3',
      icon: '/images/feature-icon-3.svg',
      title: '特色功能三',
      description: '这是特色功能三的详细描述，介绍其主要优点和使用场景。',
      link: '/features/3'
    }
  ];

  const defaultProps: FeatureSectionProps = {
    title: '我们的特色功能',
    features: mockFeatures,
    layout: 'grid'
  };

  test('renders section title correctly', () => {
    render(<FeatureSection {...defaultProps} />);
    expect(screen.getByText('我们的特色功能')).toBeInTheDocument();
  });

  test('renders all feature items', () => {
    render(<FeatureSection {...defaultProps} />);
    expect(screen.getByText('特色功能一')).toBeInTheDocument();
    expect(screen.getByText('特色功能二')).toBeInTheDocument();
    expect(screen.getByText('特色功能三')).toBeInTheDocument();
  });

  test('renders feature descriptions', () => {
    render(<FeatureSection {...defaultProps} />);
    expect(screen.getByText('这是特色功能一的详细描述，介绍其主要优点和使用场景。')).toBeInTheDocument();
    expect(screen.getByText('这是特色功能二的详细描述，介绍其主要优点和使用场景。')).toBeInTheDocument();
    expect(screen.getByText('这是特色功能三的详细描述，介绍其主要优点和使用场景。')).toBeInTheDocument();
  });

  test('renders "了解更多" link only for features with link property', () => {
    render(<FeatureSection {...defaultProps} />);
    const links = screen.getAllByText('了解更多');
    expect(links).toHaveLength(2); // Only features 1 and 3 have links
  });

  test('applies correct layout class', () => {
    const { container, rerender } = render(<FeatureSection {...defaultProps} layout="grid" />);
    expect(container.querySelector('.feature-container.grid')).toBeInTheDocument();
    
    rerender(<FeatureSection {...defaultProps} layout="cards" />);
    expect(container.querySelector('.feature-container.cards')).toBeInTheDocument();
    
    rerender(<FeatureSection {...defaultProps} layout="list" />);
    expect(container.querySelector('.feature-container.list')).toBeInTheDocument();
  });

  test('renders feature icons', () => {
    render(<FeatureSection {...defaultProps} />);
    const iconImages = screen.getAllByRole('img', { hidden: true });
    expect(iconImages).toHaveLength(3);
    expect(iconImages[0]).toHaveAttribute('src', '/images/feature-icon-1.svg');
    expect(iconImages[1]).toHaveAttribute('src', '/images/feature-icon-2.svg');
    expect(iconImages[2]).toHaveAttribute('src', '/images/feature-icon-3.svg');
  });
});