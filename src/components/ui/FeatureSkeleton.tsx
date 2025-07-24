import React from 'react';
import Skeleton from './Skeleton';
import './FeatureSkeleton.css';

interface FeatureSkeletonProps {
  count?: number;
  layout?: 'grid' | 'cards' | 'list';
}

const FeatureSkeleton: React.FC<FeatureSkeletonProps> = ({ 
  count = 3, 
  layout = 'grid' 
}) => {
  return (
    <div className="feature-skeleton">
      <div className="container">
        <Skeleton className="feature-skeleton-title" height={40} width="40%" />
        
        <div className={`feature-skeleton-container ${layout}`}>
          {Array(count).fill(0).map((_, index) => (
            <div key={index} className="feature-skeleton-item">
              <Skeleton className="feature-skeleton-icon" height={60} width={60} borderRadius="50%" />
              <Skeleton className="feature-skeleton-item-title" height={24} width="80%" />
              <Skeleton className="feature-skeleton-description" height={16} width="90%" />
              <Skeleton className="feature-skeleton-description" height={16} width="85%" />
              <Skeleton className="feature-skeleton-link" height={16} width="40%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSkeleton;