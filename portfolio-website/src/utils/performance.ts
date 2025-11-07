/**
 * Performance monitoring utilities
 */

// Report Web Vitals (requires web-vitals package to be installed)
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Optional: Install web-vitals package for detailed metrics
    // npm install web-vitals
    // For now, we'll use basic performance API
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const metrics = {
          name: 'page-load',
          value: perfData.loadEventEnd - perfData.navigationStart,
          rating: 'good'
        };
        onPerfEntry(metrics);
      });
    }
  }
};

// Log performance metrics to console (development only)
export const logPerformanceMetrics = () => {
  if (import.meta.env.DEV) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.group('⚡ Performance Metrics');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`Connect Time: ${connectTime}ms`);
      console.log(`Render Time: ${renderTime}ms`);
      console.groupEnd();
    });
  }
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Prefetch resources for next navigation
export const prefetchResource = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Optimize third-party scripts loading
export const loadScriptAsync = (src: string, onLoad?: () => void) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  if (onLoad) {
    script.onload = onLoad;
  }
  document.body.appendChild(script);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get connection speed
export const getConnectionSpeed = (): string => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (connection) {
    return connection.effectiveType || 'unknown';
  }
  return 'unknown';
};

// Check if device is mobile
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Optimize for low-end devices
export const shouldReduceAnimations = (): boolean => {
  const connectionSpeed = getConnectionSpeed();
  const isMobile = isMobileDevice();
  const reducedMotion = prefersReducedMotion();
  
  return reducedMotion || (isMobile && (connectionSpeed === 'slow-2g' || connectionSpeed === '2g'));
};
