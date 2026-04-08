import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, eases } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 98;
const FRAME_PATH = '/frames/frame_'; 

const CinematicHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload Hero frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedFrames = [];

    const preloadFrames = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `${FRAME_PATH}${String(i).padStart(3, '0')}.webp`;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            setFrames(loadedFrames);
            setIsLoading(false);
          }
        };
        loadedFrames[i - 1] = img;
      }
    };

    preloadFrames();
  }, []);

  const drawFrame = (index) => {
    if (!canvasRef.current || !frames[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = frames[index];

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 
                  centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    if (isLoading || frames.length === 0) return;

    const handleResize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(0);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Cinematic Reveal Animation
    animate('.hero-heading', {
      translateY: [100, 0],
      opacity: [0, 0.8],
      duration: 2000,
      easing: eases.outExpo,
      delay: 500
    });

    // GSAP Scroll Scrubber
    const scrollAnim = gsap.to({}, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', 
        pin: true,
        scrub: 1, // Higher scrub for luxury "inertial" feel
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * TOTAL_FRAMES)
          );
          drawFrame(frameIndex);
          
          // Typography Depth Effect
          if (titleRef.current) {
            const scale = 1 + self.progress * 0.5;
            titleRef.current.style.transform = `scale(${scale})`;
            titleRef.current.style.opacity = 1 - self.progress * 2;
          }
        }
      }
    });

    return () => {
      scrollAnim.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading, frames]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-obsidian">
        <div className="text-white text-[10px] tracking-[0.5em] uppercase mb-12 animate-pulse font-light">
          Calibrating M-Engine Core
        </div>
        <div className="w-80 h-[1px] bg-white/5 relative overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-6 text-[8px] text-gray-600 font-mono tracking-widest uppercase">
          {progress}% Precision
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-obsidian overflow-hidden">
      <canvas ref={canvasRef} className="will-change-transform z-0" />
      
      {/* Cinematic Overlay */}
      <div ref={titleRef} className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center transition-transform duration-100 ease-out">
        <div className="text-center px-6">
          <h1 className="hero-heading text-[12vw] font-black tracking-tighter uppercase mb-2 text-white opacity-0 whitespace-nowrap">
            THE <span className="text-m-blue italic">M</span>5
          </h1>
          <p className="hero-heading text-[10px] md:text-xs tracking-[0.8em] uppercase text-gray-400 font-light opacity-0">
            Excess. In Every Sense.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-bounce">
        <div className="w-[1px] h-16 bg-white" />
        <span className="text-[8px] uppercase tracking-[0.4em]">Scroll</span>
      </div>
    </section>
  );
};

export default CinematicHero;
