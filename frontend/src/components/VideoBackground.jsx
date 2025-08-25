import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [preloadedVideos, setPreloadedVideos] = useState(new Set());
  const videoRef = useRef(null);

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    if (!preloadedVideos.has(nextIndex)) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = videos[nextIndex];
      video.load();
      setPreloadedVideos(prev => new Set([...prev, nextIndex]));
    }
  }, [currentVideoIndex, videos, preloadedVideos]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, skipping to next');
    onVideoEnd();
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Loading placeholder */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
      
      <video
        ref={videoRef}
        key={currentVideoIndex}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={onVideoEnd}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        preload="none"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default VideoBackground;