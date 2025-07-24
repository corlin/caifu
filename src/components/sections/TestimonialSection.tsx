import React, { useState, useEffect, useRef } from 'react';
import './TestimonialSection.css';
import { TestimonialSkeleton } from '../ui';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  companyName?: string;
  companyLogo?: string;
  rating?: number;
}

export interface TestimonialSectionProps {
  title: string;
  testimonials: Testimonial[];
  layout: 'carousel' | 'grid';
  autoPlay?: boolean;
  interval?: number;
  isLoading?: boolean;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  testimonials,
  layout = 'carousel',
  autoPlay = false,
  interval = 5000,
  isLoading = false
}) => {
  if (isLoading) {
    return <TestimonialSkeleton count={3} />;
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-play functionality
  useEffect(() => {
    if (autoPlay && testimonials.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, interval, testimonials.length]);

  // Navigate to next testimonial
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Navigate to previous testimonial
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Navigate to specific testimonial
  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  // Render stars for rating
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i <= rating ? 'filled' : ''}`}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    return (
      <div className="testimonial-rating" aria-label={`Rating: ${rating} out of 5`}>
        {stars}
      </div>
    );
  };

  // Render testimonial card
  const renderTestimonialCard = (testimonial: Testimonial, index: number) => {
    const isActive = index === activeIndex;
    
    return (
      <div 
        key={testimonial.id} 
        className={`testimonial-card ${layout === 'carousel' ? '' : ''}`}
        style={layout === 'carousel' ? { display: isActive ? 'block' : 'none' } : {}}
      >
        <div className="testimonial-quote">
          <blockquote>{testimonial.quote}</blockquote>
        </div>
        
        {testimonial.rating && renderRating(testimonial.rating)}
        
        <div className="testimonial-author">
          <div className="author-info">
            <h4>{testimonial.author}</h4>
            {testimonial.role && <p className="author-role">{testimonial.role}</p>}
            {testimonial.companyName && (
              <p className="company-name">
                {testimonial.companyLogo && (
                  <img 
                    src={testimonial.companyLogo} 
                    alt={`${testimonial.companyName} logo`} 
                    className="company-logo" 
                  />
                )}
                {testimonial.companyName}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render carousel navigation
  const renderCarouselNavigation = () => {
    if (layout !== 'carousel' || testimonials.length <= 1) return null;

    return (
      <div className="carousel-navigation">
        <button 
          className="carousel-nav-button" 
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          &#8249;
        </button>
        
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="carousel-nav-button" 
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          &#8250;
        </button>
      </div>
    );
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        
        <div className={`testimonials-container ${layout}`}>
          {layout === 'carousel' ? (
            <>
              {testimonials.map((testimonial, index) => 
                renderTestimonialCard(testimonial, index)
              )}
              {renderCarouselNavigation()}
            </>
          ) : (
            // Grid layout renders all testimonials
            testimonials.map((testimonial) => 
              renderTestimonialCard(testimonial, -1)
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;