import React, { useRef, useEffect } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force video to play immediately
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay failed, trying next video');
          onVideoEnd();
        });
      }
    }
  }, [currentVideoIndex, onVideoEnd]);

  const handleVideoError = () => {
    console.warn('Video error, skipping to next');
    onVideoEnd();
  };

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.warn('Play failed after load, trying next');
        onVideoEnd();
      });
    }
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
        onLoadedData={handleLoadedData}
        preload="auto"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default VideoBackground;

export default VideoBackground;