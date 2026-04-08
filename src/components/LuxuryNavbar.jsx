import React, { useEffect, useRef } from 'react';
import { animate, stagger, eases } from 'animejs';

const LuxuryNavbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Initial entrance animation
    animate(navRef.current, {
      translateY: [-100, 0],
      opacity: [0, 1],
      easing: eases.outExpo,
      duration: 1500,
      delay: 500
    });

    // Staggered links reveal
    animate('.nav-link', {
      translateY: [20, 0],
      opacity: [0, 1],
      easing: eases.outExpo,
      duration: 1000,
      delay: stagger(100, { start: 1000 })
    });
  }, []);

  const handleMouseEnter = (e, index) => {
    animate(e.target, {
      scale: 1.1,
      duration: 400,
      easing: eases.outElastic()
    });
  };

  const handleMouseLeave = (e) => {
    animate(e.target, {
      scale: 1,
      duration: 400,
      easing: eases.outElastic()
    });
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-16 py-10 pointer-events-none"
    >
      {/* Brand Identity */}
      <div className="pointer-events-auto cursor-pointer flex items-center gap-12 group">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-8 bg-m-light-blue" />
          <div className="w-1.5 h-8 bg-m-dark-blue" />
          <div className="w-1.5 h-8 bg-m-red" />
        </div>
        <div className="relative">
          <div className="text-3xl font-black tracking-tighter text-white italic">
            BMW <span className="text-m-blue">M</span>5
          </div>
          <div className="text-[8px] uppercase tracking-[0.6em] text-gray-500 font-bold mt-1">G90 Prototype</div>
        </div>
      </div>

      {/* Luxury Navigation Links */}
      <div className="hidden lg:flex items-center gap-16 pointer-events-auto">
        {['The Ultimate', 'Philosophy', 'Engineering', 'Configure'].map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            onMouseEnter={(e) => handleMouseEnter(e, i)}
            onMouseLeave={handleMouseLeave}
            className="nav-link text-[10px] uppercase tracking-[0.4em] font-medium text-gray-500 hover:text-white transition-colors duration-500 opacity-0"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Call to Action */}
      <div className="pointer-events-auto">
        <button className="px-10 py-3 glass-m rounded-full text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:bg-white hover:text-obsidian transition-all duration-700">
          Find a Dealer
        </button>
      </div>
    </nav>
  );
};

export default LuxuryNavbar;
