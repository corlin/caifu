import React from 'react';
import Skeleton from './Skeleton';
import './SearchResultsSkeleton.css';

interface SearchResultsSkeletonProps {
  count?: number;
}

const SearchResultsSkeleton: React.FC<SearchResultsSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="search-results-skeleton">
      <Skeleton className="search-results-skeleton-title" height={30} width="40%" />
      
      <div className="search-results-skeleton-list">
        {Array(count).fill(0).map((_, index) => (
          <div key={index} className="search-results-skeleton-item">
            <Skeleton className="search-results-skeleton-item-title" height={24} width="80%" />
            <Skeleton className="search-results-skeleton-item-excerpt" height={16} width="95%" />
            <Skeleton className="search-results-skeleton-item-excerpt" height={16} width="90%" />
            <Skeleton className="search-results-skeleton-item-url" height={14} width="60%" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsSkeleton;