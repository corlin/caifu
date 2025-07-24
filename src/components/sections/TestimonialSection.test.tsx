import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestimonialSection, { TestimonialSectionProps } from './TestimonialSection';

// Mock data for testing
const mockTestimonials = [
  {
    id: '1',
    quote: 'This product has completely transformed our business operations.',
    author: 'Jane Doe',
    role: 'CEO',
    companyName: 'Tech Solutions',
    rating: 5
  },
  {
    id: '2',
    quote: 'The customer service is exceptional and the product is top-notch.',
    author: 'John Smith',
    role: 'CTO',
    companyName: 'Digital Innovations',
    rating: 4
  },
  {
    id: '3',
    quote: 'We have seen a 40% increase in productivity since implementing this solution.',
    author: 'Emily Johnson',
    role: 'Operations Manager',
    companyName: 'Global Enterprises',
    rating: 5
  }
];

const defaultProps: TestimonialSectionProps = {
  title: 'What Our Customers Say',
  testimonials: mockTestimonials,
  layout: 'carousel',
  autoPlay: false // Disable autoPlay for testing
};

describe('TestimonialSection Component', () => {
  test('renders the section title correctly', () => {
    render(<TestimonialSection {...defaultProps} />);
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument();
  });

  test('renders testimonials in carousel layout', () => {
    render(<TestimonialSection {...defaultProps} />);
    
    // First testimonial should be visible
    const firstTestimonial = screen.getByText(mockTestimonials[0].quote, { exact: false });
    expect(firstTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // Other testimonials should not be visible
    const secondTestimonial = screen.getByText(mockTestimonials[1].quote, { exact: false });
    expect(secondTestimonial.closest('.testimonial-card')).toHaveStyle('display: none');
  });

  test('renders testimonials in grid layout', () => {
    render(<TestimonialSection {...defaultProps} layout="grid" />);
    
    // All testimonials should be visible in grid layout
    mockTestimonials.forEach(testimonial => {
      const testimonialElement = screen.getByText(testimonial.quote, { exact: false });
      expect(testimonialElement).toBeInTheDocument();
      expect(testimonialElement.closest('.testimonial-card')).not.toHaveStyle('display: none');
    });
  });

  test('displays author information correctly', () => {
    render(<TestimonialSection {...defaultProps} />);
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('Tech Solutions')).toBeInTheDocument();
  });

  test('displays ratings correctly', () => {
    render(<TestimonialSection {...defaultProps} />);
    
    // Check if rating is displayed
    const ratingElement = screen.getAllByLabelText('Rating: 5 out of 5')[0];
    expect(ratingElement).toBeInTheDocument();
    
    // Check if correct number of filled stars are displayed
    const filledStars = ratingElement.querySelectorAll('.star.filled');
    expect(filledStars.length).toBe(5);
  });

  test('navigates to next testimonial when next button is clicked', () => {
    render(<TestimonialSection {...defaultProps} />);
    
    // First testimonial should be visible initially
    const firstTestimonialInitial = screen.getByText(mockTestimonials[0].quote, { exact: false });
    expect(firstTestimonialInitial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // Click next button
    fireEvent.click(screen.getByLabelText('Next testimonial'));
    
    // Second testimonial should now be visible
    const secondTestimonial = screen.getByText(mockTestimonials[1].quote, { exact: false });
    expect(secondTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // First testimonial should not be visible
    const firstTestimonial = screen.getByText(mockTestimonials[0].quote, { exact: false });
    expect(firstTestimonial.closest('.testimonial-card')).toHaveStyle('display: none');
  });

  test('navigates to previous testimonial when prev button is clicked', () => {
    render(<TestimonialSection {...defaultProps} />);
    
    // Go to second testimonial first
    fireEvent.click(screen.getByLabelText('Next testimonial'));
    
    // Second testimonial should be visible
    const secondTestimonial = screen.getByText(mockTestimonials[1].quote, { exact: false });
    expect(secondTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // Click previous button
    fireEvent.click(screen.getByLabelText('Previous testimonial'));
    
    // First testimonial should now be visible again
    const firstTestimonial = screen.getByText(mockTestimonials[0].quote, { exact: false });
    expect(firstTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
  });

  test('navigates to specific testimonial when indicator is clicked', () => {
    render(<TestimonialSection {...defaultProps} />);
    
    // Find all indicators (should be 3 for our mock data)
    const indicators = screen.getAllByRole('button', { name: /Go to testimonial/i });
    expect(indicators.length).toBe(3);
    
    // Click on the third indicator
    fireEvent.click(indicators[2]);
    
    // Third testimonial should now be visible
    const thirdTestimonial = screen.getByText(mockTestimonials[2].quote, { exact: false });
    expect(thirdTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
  });

  test('auto-plays testimonials when autoPlay is enabled', () => {
    jest.useFakeTimers();
    
    render(<TestimonialSection {...defaultProps} autoPlay={true} interval={1000} />);
    
    // First testimonial should be visible initially
    const firstTestimonial = screen.getByText(mockTestimonials[0].quote, { exact: false });
    expect(firstTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // Advance timers by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Second testimonial should now be visible
    const secondTestimonial = screen.getByText(mockTestimonials[1].quote, { exact: false });
    expect(secondTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // Advance timers by another 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Third testimonial should now be visible
    const thirdTestimonial = screen.getByText(mockTestimonials[2].quote, { exact: false });
    expect(thirdTestimonial.closest('.testimonial-card')).not.toHaveStyle('display: none');
    
    // Cleanup
    jest.useRealTimers();
  });
});