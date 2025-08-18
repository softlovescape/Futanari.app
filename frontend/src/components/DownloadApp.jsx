import React, { useState, useEffect } from 'react';

const DownloadApp = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Auto-redirect if opened as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone ||
                        document.referrer.includes('android-app://');

    if (isStandalone) {
      window.location.href = 'https://futanari.app/';
      return;
    }

    // Detect Android
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(userAgent.includes('android'));

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleAppIconClick = () => {
    // Create a link to the app icon
    const link = document.createElement('a');
    link.href = '/app-icon.png';
    link.download = 'futanari-app-icon.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect after download
    setTimeout(() => {
      window.open('https://futanari.app/', '_self');
    }, 1500);
  };

  const handleInstall = () => {
    if (!isAndroid) {
      alert('This app can only be installed on Android devices.');
      return;
    }

    if (deferredPrompt) {
      setIsDownloading(true);

      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        setTimeout(() => {
          setIsDownloading(false);

          if (choiceResult.outcome === 'accepted') {
            setIsInstalled(true);
            alert('App installed successfully! You can find it on your home screen.');
          } else {
            alert('To install this app, please use your browser\'s "Add to Home Screen" option in the menu.');
          }
        }, 1000);

        setDeferredPrompt(null);
      });
    } else {
      setIsDownloading(true);

      setTimeout(() => {
        setIsDownloading(false);
        alert('To install this app, please use your browser\'s "Add to Home Screen" option in the menu.');
      }, 2000);
    }
  };

  const openModal = (src, alt) => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;
    modalImage.alt = alt;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (event) => {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const getInstallButtonContent = () => {
    if (isInstalled) {
      return 'Installed';
    } else if (isDownloading) {
      return (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Installing...
        </div>
      );
    } else {
      return 'Install';
    }
  };

  const reviews = [
    {
      id: 1,
      author: "SakuraFan92",
      avatar: "S",
      date: "15.07.2025",
      rating: 5,
      text: "Absolutely mesmerizing! The storytelling is incredible and the characters are so well developed. Can't stop playing!"
    },
    {
      id: 2,
      author: "FantasyGamer",
      avatar: "F",
      date: "14.07.2025",
      rating: 5,
      text: "This app exceeded all my expectations. The immersive world-building and choice system is phenomenal."
    },
    {
      id: 3,
      author: "EroticExplorer",
      avatar: "E",
      date: "13.07.2025",
      rating: 5,
      text: "Perfect blend of narrative and fantasy. The customization options are amazing!"
    },
    {
      id: 4,
      author: "AdultGamer2024",
      avatar: "A",
      date: "12.07.2025",
      rating: 5,
      text: "Finally, an adult game that focuses on story and character development. Highly recommended!"
    },
    {
      id: 5,
      author: "RolePlayKing",
      avatar: "R",
      date: "11.07.2025",
      rating: 5,
      text: "The voice acting and visuals are top-notch. This sets a new standard for adult gaming."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-roboto" style={{
      fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      <style jsx>{`
        .bg-green-600 { background-color: #137333 !important; }
        .hover\\:bg-green-700:hover { background-color: #0d652d !important; }
        .hover\\:bg-green-50:hover { background-color: #e6f4ea !important; }
        .text-green-600 { color: #137333 !important; }
        .text-green-700 { color: #0d652d !important; }
        .border-green-500 { border-color: #34a853 !important; }
        .bg-green-500 { background-color: #34a853 !important; }

        .overflow-x-auto::-webkit-scrollbar { height: 8px; }
        .overflow-x-auto::-webkit-scrollbar-track { background: transparent; }
        .overflow-x-auto::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 4px; }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .transition-all { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        button:hover { transform: translateY(-1px); }
        button:active { transform: translateY(0); }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1rem;
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border-radius: 50%;
          padding: 0.5rem;
          cursor: pointer;
          z-index: 10;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background-color: rgba(0, 0, 0, 0.75);
        }

        .modal-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 0.5rem;
        }
      `}</style>

      <div id="app-root">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">

          {/* App Header */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div 
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0 rounded-xl sm:rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden border border-gray-200"
              onClick={handleAppIconClick}
              title="Click to download icon"
            >
              <img 
                src="/app-icon.png"
                alt="Futanari Lovescape App Icon"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-2">Futanari Lovescape App</h1>
              <div className="flex items-center justify-center sm:justify-start text-green-700 text-sm mb-3">
                <span>Lovescape Studios</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-600 mb-4">
                <span>Contains ads</span>
                <span>•</span>
                <span>In-app purchases</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-8 mb-6">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-light text-gray-900 mb-1">4.9★</div>
                  <div className="text-xs text-gray-600">8.36M reviews ⭐</div>
                </div>

                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-light text-gray-900 mb-1">500M+</div>
                  <div className="text-xs text-gray-600">Downloads</div>
                </div>

                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-light text-gray-900 mb-1 flex items-center justify-center">
                    <span className="text-red-600">🔞</span>
                  </div>
                  <div className="text-xs text-gray-600">PEGI 18 ⓘ</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={handleInstall}
                  disabled={isInstalled || isDownloading}
                  className={`w-full sm:w-auto px-8 py-3 text-sm font-medium rounded-lg transition-all ${
                    isInstalled || isDownloading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {getInstallButtonContent()}
                </button>

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                    </svg>
                    <span className="text-sm font-medium">Share</span>
                  </button>

                  <button className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span className="text-sm font-medium">Wishlist</span>
                  </button>
                </div>
              </div>

              {/* Android requirement warning */}
              {!isAndroid && (
                <div className="flex items-center gap-2 mt-4 text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg justify-center sm:justify-start">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <span>This app can only be installed on Android devices</span>
                </div>
              )}
            </div>
          </div>

          {/* Screenshots Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4">
              <img src="/screenshot1.png" alt="Screenshot 1" className="w-40 h-64 sm:w-48 sm:h-80 lg:w-64 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => openModal("/screenshot1.png", "Screenshot 1")} />
              <img src="/screenshot2.png" alt="Screenshot 2" className="w-40 h-64 sm:w-48 sm:h-80 lg:w-64 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => openModal("/screenshot2.png", "Screenshot 2")} />
              <img src="/screenshot3.png" alt="Screenshot 3" className="w-40 h-64 sm:w-48 sm:h-80 lg:w-64 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => openModal("/screenshot3.png", "Screenshot 3")} />
              <img src="/screenshot4.png" alt="Screenshot 4" className="w-40 h-64 sm:w-48 sm:h-80 lg:w-64 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => openModal("/screenshot4.png", "Screenshot 4")} />
              <img src="/screenshot5.png" alt="Screenshot 5" className="w-40 h-64 sm:w-48 sm:h-80 lg:w-64 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => openModal("/screenshot5.png", "Screenshot 5")} />
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">About this game</h2>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="mb-4">
                The Futanari Lovescape App delivers a captivating adult role-playing experience, blending interactive storytelling with erotic fantasy worlds. Tailored for users who enjoy narrative-driven sensual adventures, this app offers a unique platform for exploring diverse fantasies through engaging, choice-based gameplay.
              </p>

              <p className="mb-4">
                The app's core is its dynamic storytelling engine, enabling users to shape narratives through meaningful choices. From mythical realms with enchanted creatures to futuristic cities, each story integrates futanari characters—blending diverse gender expressions—for an inclusive and thrilling experience.
              </p>

              <button className="text-green-600 text-sm font-medium hover:underline">Read more</button>
            </div>
          </div>

          {/* Ratings and Reviews Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Ratings and reviews</h2>
            
            {/* Rating Overview */}
            <div className="flex items-start gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-light text-gray-900 mb-2">4.9</div>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600">8.36M reviews</div>
              </div>

              <div className="flex-1 max-w-md">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center mb-2">
                    <span className="text-sm text-gray-700 w-2">{stars}</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: stars === 5 ? '85%' : stars === 4 ? '10%' : '5%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{review.author}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{review.text}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-green-600 hover:underline">Helpful</button>
                        <button className="text-green-600 hover:underline">Flag as inappropriate</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-6 sm:pt-8 text-center">
            <div className="text-xs text-gray-500 mb-4">
              <p className="mb-2">
                <strong className="text-red-600">18+ Content Warning:</strong> This application contains adult content and is intended for users 18 years and older only.
              </p>
              <p>
                By installing this app, you confirm that you are of legal age in your jurisdiction and consent to viewing adult content.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs text-blue-600 mb-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Content Guidelines</a>
            </div>

            <p className="text-xs text-gray-400">
              © 2025 Google LLC
            </p>
          </footer>
        </div>
      </div>

      {/* Image Modal */}
      <div id="imageModal" className="modal-backdrop hidden" onClick={closeModal} style={{display: 'none'}}>
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <img id="modalImage" className="modal-image" src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;