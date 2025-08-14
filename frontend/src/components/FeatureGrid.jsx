import React from 'react';
import { Gamepad2, Heart, Palette, MessageCircle, Video, Sparkles } from 'lucide-react';

const FeatureGrid = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Create animated characters for visual novels or comics"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Explore romantic or NSFW narratives through safe, private roleplay"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Design premium characters for worldbuilding or game development"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Use as emotional support companions in everyday interaction"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Generate content for Reels, TikToks, or cinematic trailers"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Bring original characters (OCs) to life with depth and continuity"
    }
  ];

  return (
    <section className="relative z-10 py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-6 rounded-lg bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:scale-105"
            >
              <div className="text-[#e6004c] flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <p className="text-white text-lg leading-relaxed">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;