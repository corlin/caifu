import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection, { HeroSectionProps } from './HeroSection';

describe('HeroSection Component', () => {
  const mockSlides = [
    {
      id: '1',
      imageUrl: '/images/hero-1.jpg',
      title: '欢迎来到我们的网站',
      description: '探索我们提供的优质服务和产品，满足您的各种需求。',
      ctaText: '了解更多',
      ctaAction: 'learn-more'
    },
    {
      id: '2',
      imageUrl: '/images/hero-2.jpg',
      title: '发现创新解决方案',
      description: '我们的专业团队致力于为您提供最佳的解决方案。',
      ctaText: '联系我们',
      ctaAction: 'contact-us'
    },
    {
      id: '3',
      imageUrl: '/images/hero-3.jpg',
      title: '加入我们的社区',
      description: '成为我们不断成长的社区的一部分，共同创造美好未来。',
      ctaText: '立即注册',
      ctaAction: 'sign-up'
    }
  ];

  const defaultProps: HeroSectionProps = {
    slides: mockSlides,
    autoPlay: false, // Disable autoplay for testing
    interval: 5000,
    onCallToAction: jest.fn()
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders the first slide by default', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText('欢迎来到我们的网站')).toBeInTheDocument();
    expect(screen.getByText('探索我们提供的优质服务和产品，满足您的各种需求。')).toBeInTheDocument();
    expect(screen.getByText('了解更多')).toBeInTheDocument();
  });

  test('renders navigation dots for multiple slides', () => {
    const { container } = render(<HeroSection {...defaultProps} />);
    const dots = container.querySelectorAll('.hero-nav-dot');
    expect(dots.length).toBe(3);
  });

  test('changes slide when navigation dot is clicked', () => {
    const { container } = render(<HeroSection {...defaultProps} />);
    const dots = container.querySelectorAll('.hero-nav-dot');
    
    // Click on the second dot
    fireEvent.click(dots[1]);
    
    // Should show the second slide
    expect(screen.getByText('发现创新解决方案')).toBeInTheDocument();
    expect(screen.getByText('我们的专业团队致力于为您提供最佳的解决方案。')).toBeInTheDocument();
    expect(screen.getByText('联系我们')).toBeInTheDocument();
  });

  test('calls onCallToAction with correct action when CTA button is clicked', () => {
    render(<HeroSection {...defaultProps} />);
    const ctaButton = screen.getByText('了解更多');
    
    fireEvent.click(ctaButton);
    
    expect(defaultProps.onCallToAction).toHaveBeenCalledWith('learn-more');
  });

  test('auto-rotates slides when autoPlay is true', () => {
    render(<HeroSection {...defaultProps} autoPlay={true} interval={2000} />);
    
    // Initially shows the first slide
    expect(screen.getByText('欢迎来到我们的网站')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Should now show the second slide
    expect(screen.getByText('发现创新解决方案')).toBeInTheDocument();
    
    // Fast-forward time again
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Should now show the third slide
    expect(screen.getByText('加入我们的社区')).toBeInTheDocument();
    
    // Fast-forward time once more to test looping back to the first slide
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    // Should loop back to the first slide
    expect(screen.getByText('欢迎来到我们的网站')).toBeInTheDocument();
  });

  test('does not render anything when slides array is empty', () => {
    const { container } = render(<HeroSection slides={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('applies active class to current slide and navigation dot', () => {
    const { container } = render(<HeroSection {...defaultProps} />);
    
    // First slide and dot should be active initially
    const slides = container.querySelectorAll('.hero-slide');
    const dots = container.querySelectorAll('.hero-nav-dot');
    
    expect(slides[0]).toHaveClass('active');
    expect(dots[0]).toHaveClass('active');
    
    // Click on the third dot
    fireEvent.click(dots[2]);
    
    // Third slide and dot should now be active
    expect(slides[2]).toHaveClass('active');
    expect(dots[2]).toHaveClass('active');
  });
});