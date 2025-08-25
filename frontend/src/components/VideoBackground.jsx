import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef(null);

  // Reset loading state when video changes
  useEffect(() => {
    setIsVideoLoaded(false);
    setHasError(false);
    setRetryCount(0);
  }, [currentVideoIndex]);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully:', videos[currentVideoIndex]);
    setIsVideoLoaded(true);
    setHasError(false);
  };

  const handleVideoError = (e) => {
    console.error('Video failed to load:', videos[currentVideoIndex], e);
    setHasError(true);
    setIsVideoLoaded(false);
    
    // Try next video after a delay, or retry current video a few times
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      setTimeout(() => {
        setHasError(false);
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 2000);
    } else {
      // Move to next video after max retries
      setTimeout(() => {
        onVideoEnd();
      }, 1000);
    }
  };

  const handleCanPlay = () => {
    console.log('Video can start playing:', videos[currentVideoIndex]);
    setIsVideoLoaded(true);
  };

  const handleLoadStart = () => {
    console.log('Video load started:', videos[currentVideoIndex]);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Improved gradient fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900 opacity-80"></div>
      
      {/* Video element - only one at a time to prevent browser throttling */}
      {!hasError && (
        <video
          ref={videoRef}
          key={`${currentVideoIndex}-${retryCount}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={onVideoEnd}
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleCanPlay}
          onLoadStart={handleLoadStart}
          preload="metadata"
          style={{ zIndex: 1 }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Loading indicator - less intrusive */}
      {!isVideoLoaded && !hasError && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded px-3 py-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-white text-sm">Loading video...</span>
          </div>
        </div>
      )}
      
      {/* Error state - minimal indication */}
      {hasError && retryCount >= 2 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black bg-opacity-50 rounded px-3 py-2">
            <span className="text-white text-sm">Switching video...</span>
          </div>
        </div>
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" style={{ zIndex: 5 }}></div>
    </div>
  );
};

export default VideoBackground;