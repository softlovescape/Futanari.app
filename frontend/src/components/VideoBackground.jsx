import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
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

  const handleVideoError = () => {
    console.warn('Video failed to load, skipping to next');
    onVideoEnd();
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      <video
        ref={videoRef}
        key={currentVideoIndex}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop={false}
        playsInline
        onEnded={onVideoEnd}
        onError={handleVideoError}
        preload="metadata"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default VideoBackground;