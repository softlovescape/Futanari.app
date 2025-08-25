import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  // Reset loading state when video changes
  useEffect(() => {
    setIsVideoLoaded(false);
    setHasError(false);
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
    // Try next video after a short delay
    setTimeout(() => {
      onVideoEnd();
    }, 2000);
  };

  const handleCanPlay = () => {
    console.log('Video can start playing:', videos[currentVideoIndex]);
    setIsVideoLoaded(true);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900"></div>
      
      {/* Video element */}
      <video
        ref={videoRef}
        key={currentVideoIndex}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={onVideoEnd}
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleCanPlay}
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading indicator */}
      {!isVideoLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <p>Loading next video...</p>
          </div>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default VideoBackground;