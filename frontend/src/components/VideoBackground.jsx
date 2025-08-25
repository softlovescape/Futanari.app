import React, { useRef } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const videoRef = useRef(null);

  const handleVideoError = () => {
    // Skip to next video immediately if one fails
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
        preload="auto"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default VideoBackground;