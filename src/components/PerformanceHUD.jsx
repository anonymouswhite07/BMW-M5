import React, { useEffect, useRef } from 'react';
import { animate, stagger, eases } from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  { label: 'Output', value: 600, unit: 'HP', desc: 'V8 TwinPower Turbo' },
  { label: 'Acceleration', value: 3.3, unit: 'S', desc: '0-100 KM/H' },
  { label: 'Torque', value: 750, unit: 'NM', desc: 'Peak performance' },
];

const PerformanceHUD = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger to trigger Anime.js animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        // Animation for the labels
        animate('.hud-item', {
          opacity: [0, 1],
          translateY: [50, 0],
          delay: stagger(200),
          easing: eases.outExpo,
          duration: 1500
        });

        // SVG Drawing Effect Simulation
        animate('.hud-line', {
          width: ['0%', '100%'],
          delay: stagger(200),
          easing: eases.inOutQuad,
          duration: 2000
        });
      }
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-obsidian py-32 px-16 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-24">
        {DATA.map((item, i) => (
          <div key={item.label} className="hud-item opacity-0 group flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/30 mb-2">Technical Metric // {i + 1}</span>
              <div className="flex items-baseline gap-4">
                <span className="text-9xl font-black italic tracking-tighter text-white text-glow-silver">
                  {item.value}
                </span>
                <span className="text-2xl font-black text-m-blue italic tracking-tighter">{item.unit}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="hud-line h-[2px] bg-white/5 relative">
                <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-m-blue via-m-light-blue to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] uppercase tracking-[0.5em] font-black text-white">
                    {item.label}
                  </span>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 leading-relaxed max-w-[150px]">
                    {item.desc}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/20 font-mono">
                  +
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aesthetic M-Power Accents */}
      <div className="absolute bottom-16 right-16 flex flex-col items-end gap-2">
        <div className="text-[10px] uppercase tracking-[0.5em] text-gray-700 font-bold mb-4">M-Series Performance Division</div>
        <div className="flex gap-1">
          <div className="w-16 h-2 bg-m-blue" />
          <div className="w-16 h-2 bg-m-light-blue" />
          <div className="w-16 h-2 bg-m-red" />
        </div>
      </div>
    </section>
  );
};

export default PerformanceHUD;
