import React from 'react';

/**
 * Lazy loading image component with placeholder skeleton
 */
export const LazyImage = ({ src, alt, className, placeholderColor = 'bg-primary-100' }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholderColor} animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setImageError(true);
          setIsLoaded(true);
        }}
        loading="lazy"
      />
      {imageError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
