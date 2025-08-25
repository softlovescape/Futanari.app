import React from 'react';

const LazyVideo = ({ src, className, ...props }) => {
  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      {...props}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default LazyVideo;

export default LazyVideo;