import React from 'react';
import Skeleton from './Skeleton';
import './ContentSkeleton.css';

interface ContentSkeletonProps {
  count?: number;
  layout?: 'grid' | 'list';
  showImage?: boolean;
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = ({ 
  count = 6, 
  layout = 'grid',
  showImage = true
}) => {
  return (
    <div className="content-skeleton">
      <div className="container">
        <Skeleton className="content-skeleton-title" height={40} width="50%" />
        
        <div className={`content-skeleton-container ${layout}`}>
          {Array(count).fill(0).map((_, index) => (
            <div key={index} className="content-skeleton-item">
              {showImage && (
                <div className="content-skeleton-image">
                  <Skeleton height={200} width="100%" />
                </div>
              )}
              <div className="content-skeleton-details">
                <Skeleton className="content-skeleton-item-title" height={24} width="90%" />
                <div className="content-skeleton-meta">
                  <Skeleton height={16} width={100} />
                  <Skeleton height={16} width={120} />
                </div>
                <Skeleton className="content-skeleton-summary" height={16} width="95%" />
                <Skeleton className="content-skeleton-summary" height={16} width="90%" />
                <Skeleton className="content-skeleton-link" height={16} width={80} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="content-skeleton-pagination">
          <Skeleton height={40} width={120} />
        </div>
      </div>
    </div>
  );
};

export default ContentSkeleton;