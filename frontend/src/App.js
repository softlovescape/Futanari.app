import React, { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load components for code splitting
const VideoBackground = lazy(() => import("./components/VideoBackground"));
const HeroSection = lazy(() => import("./components/HeroSection"));
const GallerySection = lazy(() => import("./components/GallerySection"));
const CTABanner = lazy(() => import("./components/CTABanner"));
const InfoSection = lazy(() => import("./components/InfoSection"));
const FeatureGrid = lazy(() => import("./components/FeatureGrid"));
const BlockTextSection = lazy(() => import("./components/BlockTextSection"));

// Optimized loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-[#e6004c] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Video assets - optimized array
const backgroundVideos = [
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/p6ftusbw_2.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/7487bmdb_3.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/lzwj0eko_4.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/f0rh1ahv_5.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/7tubjcui_6.mp4"
];

// Image assets for gallery - optimized array
const galleryImages = [
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/vfys931a_image%20-%202025-07-16T123653.921.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/sn8rhnxm_image%20-%202025-07-16T151724.850.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/2l1lz0wx_image%20-%202025-07-16T151740.640.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/6x2kqi0l_image%20-%202025-07-16T151841.279.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/56lbxky0_image%20-%202025-07-16T163558.321.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/2jr9wipe_image%20-%202025-07-16T163950.540.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/huxr201i_image%20-%202025-07-16T164027.510.png",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/ay48fyg4_image%20-%202025-07-16T164837.790.png"
];

const Home = React.memo(() => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = React.useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % backgroundVideos.length);
  }, []);

  return (
    <div className="relative">
      <Suspense fallback={<div className="fixed inset-0 bg-black z-0" />}>
        <VideoBackground 
          videos={backgroundVideos}
          currentVideoIndex={currentVideoIndex}
          onVideoEnd={handleVideoEnd}
        />
      </Suspense>
      
      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <GallerySection images={galleryImages} />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <CTABanner />
        </Suspense>
        
        {/* Video Cover Section - Optimized */}
        <section className="relative z-10 py-0">
          <div className="h-96 md:h-[500px] overflow-hidden bg-gray-900">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23111827'/%3E%3C/svg%3E"
            >
              <source src="https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/v6lxf1u9_Futanari%207-realistic.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        
        <Suspense fallback={<LoadingSpinner />}>
          <InfoSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <FeatureGrid />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <BlockTextSection />
        </Suspense>
      </div>
    </div>
  );
});

Home.displayName = 'Home';

function App() {
  useEffect(() => {
    // Remove loading screen once React is ready
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }, []);

  return (
    <div className="App bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;