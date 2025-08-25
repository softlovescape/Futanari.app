import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = ({ videos, currentVideoIndex, onVideoEnd }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  // Create a beautiful animated background instead of problematic videos
  const backgrounds = [
    'bg-gradient-to-br from-purple-900 via-black to-pink-900',
    'bg-gradient-to-br from-blue-900 via-black to-purple-900',
    'bg-gradient-to-br from-pink-900 via-black to-red-900',
    'bg-gradient-to-br from-indigo-900 via-black to-purple-900',
  ];

  // Rotate backgrounds every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Add smooth animation classes
  const animationClasses = "transition-all duration-[3000ms] ease-in-out";

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${backgrounds[backgroundIndex]} ${animationClasses}`}></div>
      
      {/* Overlay texture for depth */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 animate-pulse"></div>
      </div>
      
      {/* Moving particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i * 0.5)}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" style={{ zIndex: 5 }}></div>
    </div>
  );
};

export default VideoBackground;

export default VideoBackground;