import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton from '../Skeleton';
import HeroSkeleton from '../HeroSkeleton';
import FeatureSkeleton from '../FeatureSkeleton';
import ContentSkeleton from '../ContentSkeleton';
import TestimonialSkeleton from '../TestimonialSkeleton';
import CallToActionSkeleton from '../CallToActionSkeleton';
import SearchResultsSkeleton from '../SearchResultsSkeleton';

describe('Skeleton Components', () => {
  test('renders base Skeleton component with default props', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeletonElement = screen.getByTestId('skeleton');
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass('skeleton-pulse');
    expect(skeletonElement).toHaveStyle('width: 100%');
    expect(skeletonElement).toHaveStyle('height: 1rem');
    expect(skeletonElement).toHaveStyle('border-radius: 4px');
  });

  test('renders base Skeleton component with custom props', () => {
    render(
      <Skeleton 
        width="200px" 
        height="50px" 
        borderRadius="8px" 
        className="custom-class"
        style={{ margin: '10px' }}
        data-testid="custom-skeleton"
      />
    );
    const skeletonElement = screen.getByTestId('custom-skeleton');
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass('skeleton-pulse');
    expect(skeletonElement).toHaveClass('custom-class');
    expect(skeletonElement).toHaveStyle('width: 200px');
    expect(skeletonElement).toHaveStyle('height: 50px');
    expect(skeletonElement).toHaveStyle('border-radius: 8px');
    expect(skeletonElement).toHaveStyle('margin: 10px');
  });

  test('renders HeroSkeleton component', () => {
    render(<HeroSkeleton />);
    expect(screen.getByClassName('hero-skeleton')).toBeInTheDocument();
    expect(screen.getByClassName('hero-skeleton-title')).toBeInTheDocument();
    expect(screen.getByClassName('hero-skeleton-description')).toBeInTheDocument();
    expect(screen.getByClassName('hero-skeleton-buttons')).toBeInTheDocument();
    expect(screen.getByClassName('hero-skeleton-image')).toBeInTheDocument();
  });

  test('renders FeatureSkeleton component with default props', () => {
    render(<FeatureSkeleton />);
    expect(screen.getByClassName('feature-skeleton')).toBeInTheDocument();
    expect(screen.getByClassName('feature-skeleton-title')).toBeInTheDocument();
    expect(screen.getAllByClassName('feature-skeleton-item').length).toBe(3);
  });

  test('renders FeatureSkeleton component with custom count', () => {
    render(<FeatureSkeleton count={5} />);
    expect(screen.getAllByClassName('feature-skeleton-item').length).toBe(5);
  });

  test('renders ContentSkeleton component with default props', () => {
    render(<ContentSkeleton />);
    expect(screen.getByClassName('content-skeleton')).toBeInTheDocument();
    expect(screen.getByClassName('content-skeleton-title')).toBeInTheDocument();
    expect(screen.getAllByClassName('content-skeleton-item').length).toBe(6);
    expect(screen.getAllByClassName('content-skeleton-image').length).toBe(6);
  });

  test('renders ContentSkeleton component with custom props', () => {
    render(<ContentSkeleton count={3} layout="list" showImage={false} />);
    expect(screen.getAllByClassName('content-skeleton-item').length).toBe(3);
    expect(screen.getByClassName('content-skeleton-container')).toHaveClass('list');
    expect(screen.queryByClassName('content-skeleton-image')).not.toBeInTheDocument();
  });

  test('renders TestimonialSkeleton component', () => {
    render(<TestimonialSkeleton />);
    expect(screen.getByClassName('testimonial-skeleton')).toBeInTheDocument();
    expect(screen.getByClassName('testimonial-skeleton-title')).toBeInTheDocument();
    expect(screen.getAllByClassName('testimonial-skeleton-item').length).toBe(3);
  });

  test('renders CallToActionSkeleton component', () => {
    render(<CallToActionSkeleton />);
    expect(screen.getByClassName('cta-skeleton')).toBeInTheDocument();
    expect(screen.getByClassName('cta-skeleton-title')).toBeInTheDocument();
    expect(screen.getByClassName('cta-skeleton-description')).toBeInTheDocument();
    expect(screen.getByClassName('cta-skeleton-buttons')).toBeInTheDocument();
  });

  test('renders SearchResultsSkeleton component with default props', () => {
    render(<SearchResultsSkeleton />);
    expect(screen.getByClassName('search-results-skeleton')).toBeInTheDocument();
    expect(screen.getByClassName('search-results-skeleton-title')).toBeInTheDocument();
    expect(screen.getAllByClassName('search-results-skeleton-item').length).toBe(5);
  });

  test('renders SearchResultsSkeleton component with custom count', () => {
    render(<SearchResultsSkeleton count={3} />);
    expect(screen.getAllByClassName('search-results-skeleton-item').length).toBe(3);
  });
});