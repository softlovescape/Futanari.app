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
    console.log('Video loaded successfully');
    setIsVideoLoaded(true);
    setHasError(false);
  };

  const handleVideoError = (e) => {
    console.warn('Video failed to load, trying next');
    setHasError(true);
    // Move to next video quickly
    setTimeout(() => {
      onVideoEnd();
    }, 1000);
  };

  const handleCanPlay = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Always show gradient background as base */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-pink-900"></div>
      
      {/* Video overlay - will show over gradient when loaded */}
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
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" style={{ zIndex: 5 }}></div>
    </div>
  );
};

export default VideoBackground;

export default VideoBackground;