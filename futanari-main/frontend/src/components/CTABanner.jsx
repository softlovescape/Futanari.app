import React from 'react';
import { Button } from './ui/button';

const CTABanner = () => {
  return (
    <section className="relative z-10 py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Start Enjoying Futanari Today
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Craft a fully animated, emotionally intelligent companion — bold, unique, yours.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild
            className="bg-[#e6004c] hover:bg-[#c50042] text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <a href="https://go.xlvirdr.com/ls?campaignId=futanari&sourceId=facebook&creativeId=ai-hentai&user=cc5b3c935e450b26c79fcee62bbb04f745f9c75b31dedf9902&path=/create-ai-hentai-girlfriend/personality" target="_blank" rel="noopener noreferrer">
              Create Now →
            </a>
          </Button>
          
          <Button 
            asChild
            className="bg-[#e6004c] hover:bg-[#c50042] text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <a href="https://go.xlvirdr.com/ls?campaignId=futanari&sourceId=facebook&creativeId=saga&user=cc5b3c935e450b26c79fcee62bbb04f745f9c75b31dedf9902&path=/saga" target="_blank" rel="noopener noreferrer">
              Explore Futa →
            </a>
          </Button>
          
          <Button 
            asChild
            className="bg-[#e6004c] hover:bg-[#c50042] text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <a href="https://lovescape.com/subscription/pro" target="_blank" rel="noopener noreferrer">
              Subscribe Pro →
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;