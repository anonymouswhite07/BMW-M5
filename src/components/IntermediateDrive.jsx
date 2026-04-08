import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const START_FRAME = 99;
const END_FRAME = 192;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;
const FRAME_PATH = '/frames/frame_'; 

const IntermediateDrive = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedFrames = [];

    const preloadFrames = async () => {
      for (let i = START_FRAME; i <= END_FRAME; i++) {
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
        loadedFrames[i - START_FRAME] = img;
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

    const scrollAnim = gsap.to({}, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', 
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * TOTAL_FRAMES)
          );
          drawFrame(frameIndex);
        }
      }
    });

    return () => {
      scrollAnim.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading, frames]);

  if (isLoading) return null;

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-obsidian overflow-hidden">
      <canvas ref={canvasRef} className="will-change-transform z-0" />
      
      {/* Narrative Overlay */}
      <div className="absolute inset-0 z-10 flex items-center px-24">
        <div className="max-w-2xl bg-obsidian/40 backdrop-blur-xl p-12 border-l-2 border-m-blue">
          <h3 className="text-4xl font-black text-white italic tracking-tighter mb-4">
            A New Standard of Dominance.
          </h3>
          <p className="text-gray-400 text-sm tracking-widest leading-loose uppercase">
            Evolution isn’t a choice, it’s a consequence of engineering perfection. 
            The M-xDrive system redefines traction, delivering power exactly where 
            the asphalt demands it most.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntermediateDrive;
