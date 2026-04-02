/**
 * Performance Utilities - Helpers for optimization
 */

/**
 * Image optimization helper
 * Converts image paths to use WebP with fallback
 */
export const optimizeImageSrc = (src, fallback = src) => {
  // In production, you'd convert to WebP format
  // For now, return the original src
  return src;
};

/**
 * Debounce hook for optimizing frequent function calls
 */
export const useDebounce = (callback, delay = 300) => {
  const timeoutRef = React.useRef(null);

  return React.useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

/**
 * Throttle hook for optimizing scroll/resize events
 */
export const useThrottle = (callback, delay = 300) => {
  const lastRun = React.useRef(Date.now());

  return React.useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay],
  );
};

/**
 * Memory-efficient list virtualization indicator
 * For use with large lists, helps track when to virtualize
 */
export const shouldVirtualizeList = (itemCount) => {
  return itemCount > 50;
};

/**
 * Performance monitoring hook
 */
export const usePerformanceMonitor = (componentName) => {
  React.useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      if (process.env.NODE_ENV === "development") {
        console.log(
          `${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`,
        );
      }
    };
  });
};
