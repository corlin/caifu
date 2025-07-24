import React from 'react';
import Skeleton from './Skeleton';
import './TestimonialSkeleton.css';

interface TestimonialSkeletonProps {
  count?: number;
}

const TestimonialSkeleton: React.FC<TestimonialSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="testimonial-skeleton">
      <div className="container">
        <Skeleton className="testimonial-skeleton-title" height={40} width="60%" />
        
        <div className="testimonial-skeleton-container">
          {Array(count).fill(0).map((_, index) => (
            <div key={index} className="testimonial-skeleton-item">
              <Skeleton className="testimonial-skeleton-quote" height={16} width="95%" />
              <Skeleton className="testimonial-skeleton-quote" height={16} width="90%" />
              <Skeleton className="testimonial-skeleton-quote" height={16} width="85%" />
              
              <div className="testimonial-skeleton-author-container">
                <Skeleton className="testimonial-skeleton-avatar" height={50} width={50} borderRadius="50%" />
                <div className="testimonial-skeleton-author-info">
                  <Skeleton className="testimonial-skeleton-author" height={20} width={120} />
                  <Skeleton className="testimonial-skeleton-role" height={16} width={150} />
                </div>
              </div>
              
              <div className="testimonial-skeleton-rating">
                <Skeleton height={20} width={120} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonial-skeleton-controls">
          <Skeleton className="testimonial-skeleton-dot" height={10} width={10} borderRadius="50%" />
          <Skeleton className="testimonial-skeleton-dot" height={10} width={10} borderRadius="50%" />
          <Skeleton className="testimonial-skeleton-dot" height={10} width={10} borderRadius="50%" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;