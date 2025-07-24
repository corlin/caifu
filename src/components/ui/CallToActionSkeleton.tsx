import React from 'react';
import Skeleton from './Skeleton';
import './CallToActionSkeleton.css';

const CallToActionSkeleton: React.FC = () => {
  return (
    <div className="cta-skeleton">
      <div className="container">
        <div className="cta-skeleton-content">
          <Skeleton className="cta-skeleton-title" height={40} width="70%" />
          <Skeleton className="cta-skeleton-description" height={16} width="90%" />
          <Skeleton className="cta-skeleton-description" height={16} width="85%" />
          
          <div className="cta-skeleton-buttons">
            <Skeleton className="cta-skeleton-button" height={40} width={150} />
            <Skeleton className="cta-skeleton-button" height={40} width={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSkeleton;