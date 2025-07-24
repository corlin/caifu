import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = '4px',
  className = '',
  style = {},
}) => {
  const skeletonStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius: borderRadius,
    ...style,
  };

  return <div className={`skeleton-pulse ${className}`} style={skeletonStyle} />;
};

export default Skeleton;