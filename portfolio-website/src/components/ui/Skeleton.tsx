import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Project Card Skeleton
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <Skeleton height="12rem" variant="rectangular" className="rounded-none" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton height="1.5rem" width="70%" />
        
        {/* Subtitle */}
        <Skeleton height="1rem" width="50%" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton height="0.875rem" width="100%" />
          <Skeleton height="0.875rem" width="90%" />
          <Skeleton height="0.875rem" width="80%" />
        </div>
        
        {/* Tech stack */}
        <div className="flex gap-2">
          <Skeleton height="1.5rem" width="4rem" variant="rectangular" />
          <Skeleton height="1.5rem" width="5rem" variant="rectangular" />
          <Skeleton height="1.5rem" width="4.5rem" variant="rectangular" />
        </div>
        
        {/* Links */}
        <div className="flex gap-3 pt-4">
          <Skeleton height="1.25rem" width="3rem" />
          <Skeleton height="1.25rem" width="3rem" />
        </div>
      </div>
    </div>
  );
};

// Project Grid Skeleton
export const ProjectGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Text Skeleton
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="1rem"
          width={index === lines - 1 ? '80%' : '100%'}
          variant="text"
        />
      ))}
    </div>
  );
};

// Page Loading Skeleton
export const PageLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 py-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton height="3rem" width="60%" className="mx-auto" />
        <Skeleton height="1.5rem" width="40%" className="mx-auto" />
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <TextSkeleton lines={4} />
      </div>
    </div>
  );
};

export default Skeleton;
