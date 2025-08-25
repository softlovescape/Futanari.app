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
        rootMargin: '200px',
        threshold: 0.1
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = (e) => {
    console.warn('Lazy video failed to load:', src);
    setHasError(true);
  };

  return (
    <div ref={videoRef} className={`relative ${className}`}>
      {/* Background gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
      
      {isInView && (
        <video
          className={`${className} ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoadedData={handleLoadedData}
          onError={handleError}
          preload="auto"
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Loading state */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <div className="text-white text-lg">Loading video...</div>
          </div>
        </div>
      )}
      
      {/* Error state with retry */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="text-lg mb-4">Video loading...</div>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoaded(false);
                if (videoRef.current && videoRef.current.querySelector('video')) {
                  videoRef.current.querySelector('video').load();
                }
              }}
              className="bg-white bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo;

export default LazyVideo;