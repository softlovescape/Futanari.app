import React, { useState, useEffect, useRef, useCallback } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoError = useCallback(() => {
    console.warn('Video failed to load:', videos[currentVideoIndex]);
    setVideoError(true);
    setIsLoading(false);
    // Auto-advance to next video on error
    onVideoEnd();
  }, [currentVideoIndex, videos, onVideoEnd]);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
    setVideoError(false);
  }, []);

  const handleVideoEnd = useCallback(() => {
    onVideoEnd();
  }, [onVideoEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setIsLoading(true);
      setVideoError(false);
      
      // Preload video for better performance
      video.load();
    }
  }, [currentVideoIndex]);

  // Fallback gradient background when videos fail
  if (videoError || !videos.length) {
    return (
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-10" />
      )}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        onEnded={handleVideoEnd}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='100%25' height='100%25' fill='%23000000'/%3E%3C/svg%3E"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-30" />
    </div>
  );
};

export default VideoBackground;