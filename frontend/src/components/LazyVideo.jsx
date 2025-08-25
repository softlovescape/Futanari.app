import React, { useRef, useEffect, useState } from 'react';

const LazyVideo = ({ src, className, ...props }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before the video comes into view
        threshold: 0.1
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoadedData = () => {
    console.log('Lazy video loaded:', src);
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = (e) => {
    console.error('Lazy video failed to load:', src, e);
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div ref={videoRef} className={`relative ${className}`}>
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
      
      {/* Loading state */}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <div className="text-white text-lg">Loading video...</div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10">
          <div className="text-white text-lg">Video unavailable</div>
        </div>
      )}
      
      {isInView && (
        <video
          className={`${className} ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoadedData={handleLoadedData}
          onError={handleError}
          crossOrigin="anonymous"
          preload="auto"
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default LazyVideo;

export default LazyVideo;