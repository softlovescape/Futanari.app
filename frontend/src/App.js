import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoBackground from "./components/VideoBackground";
import HeroSection from "./components/HeroSection";
import GallerySection from "./components/GallerySection";
import CTABanner from "./components/CTABanner";
import InfoSection from "./components/InfoSection";
import FeatureGrid from "./components/FeatureGrid";
import BlockTextSection from "./components/BlockTextSection";
import DownloadApp from "./components/DownloadApp";
import LoadingSpinner from "./components/LoadingSpinner";

// Video assets - using half of the provided videos
const backgroundVideos = [
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/p6ftusbw_2.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/7487bmdb_3.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/lzwj0eko_4.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/f0rh1ahv_5.mp4",
  "https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/7tubjcui_6.mp4"
];

// Image assets for gallery - reduce initial load by taking only first 4
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

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % backgroundVideos.length);
  };

  return (
    <div className="relative">
      <VideoBackground 
        videos={backgroundVideos}
        currentVideoIndex={currentVideoIndex}
        onVideoEnd={handleVideoEnd}
      />
      
      <div className="relative z-10">
        <HeroSection />
        <GallerySection images={galleryImages} />
        <CTABanner />
        
        {/* Video Cover Section */}
        <section className="relative z-10 py-0">
          <div className="h-96 md:h-[500px] overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/v6lxf1u9_Futanari%207-realistic.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        
        <InfoSection />
        <FeatureGrid />
        <BlockTextSection />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/download-app" element={<DownloadApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;