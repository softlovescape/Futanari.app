import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center z-10">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wide">
          FUTANARI FOR YOU
        </h1>
        <Button 
          asChild
          className="bg-[#e6004c] hover:bg-[#c50042] text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          <a href="https://lovescape.com/saga" target="_blank" rel="noopener noreferrer">
            SEE MORE →
          </a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;