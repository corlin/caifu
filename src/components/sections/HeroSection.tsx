import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import { HeroSkeleton } from '../ui';

export interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAction: string;
}

export interface HeroSectionProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  onCallToAction?: (actionId: string) => void;
  isLoading?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  onCallToAction = () => {},
  isLoading = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !slides || slides.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, slides?.length]);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCtaClick = (actionId: string) => {
    onCallToAction(actionId);
  };

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className="hero-section">
      <div className="hero-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              <button
                className="hero-cta-button"
                onClick={() => handleCtaClick(slide.ctaAction)}
              >
                {slide.ctaText}
              </button>
            </div>
          </div>
        ))}
        
        {/* Navigation dots for multiple slides */}
        {slides.length > 1 && (
          <div className="hero-navigation">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero-nav-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;