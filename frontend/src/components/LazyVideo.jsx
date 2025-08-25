import React, { useRef, useEffect } from 'react';

const LazyVideo = ({ src, className, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force video to play immediately
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('LazyVideo autoplay failed:', error);
        });
      }
    }
  }, []);

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn('LazyVideo play after load failed:', error);
      });
    }
  };

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      {...props}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default LazyVideo;

export default LazyVideo;