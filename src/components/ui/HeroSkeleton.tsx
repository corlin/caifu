import React from 'react';
import Skeleton from './Skeleton';
import './HeroSkeleton.css';

const HeroSkeleton: React.FC = () => {
  return (
    <div className="hero-skeleton">
      <div className="container">
        <div className="hero-skeleton-content">
          <Skeleton className="hero-skeleton-title" height={60} width="70%" />
          <Skeleton className="hero-skeleton-description" height={20} width="90%" />
          <Skeleton className="hero-skeleton-description" height={20} width="85%" />
          <div className="hero-skeleton-buttons">
            <Skeleton className="hero-skeleton-button" height={40} width={150} />
            <Skeleton className="hero-skeleton-button" height={40} width={150} />
          </div>
        </div>
        <div className="hero-skeleton-image">
          <Skeleton height={400} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;