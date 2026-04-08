import React, { useEffect } from 'react';
import LuxuryNavbar from './components/LuxuryNavbar';
import CinematicHero from './components/CinematicHero';
import PerformanceHUD from './components/PerformanceHUD';
import IntermediateDrive from './components/IntermediateDrive';
import WheelFeature from './components/WheelFeature';
import SmoothScroll from './components/SmoothScroll';
import { animate, eases } from 'animejs';

const CustomCursor = () => {
  const cursorRef = React.useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        animate(cursorRef.current, {
          left: e.clientX - 10,
          top: e.clientY - 10,
          duration: 300,
          easing: eases.outQuad
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div id="custom-cursor" ref={cursorRef} className="hidden lg:block" />;
};

function App() {
  return (
    <SmoothScroll>
      <div className="grain-overlay relative">
        <CustomCursor />
        
        <LuxuryNavbar />

        <main className="bg-obsidian">
          
          <CinematicHero />

          <section className="h-screen w-full flex items-center justify-center p-24 bg-obsidian relative z-10">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            <div className="max-w-4xl text-center">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-12 text-white uppercase mix-blend-difference">
                The Anatomy of <span className="text-m-blue">Adrenaline</span>.
              </h2>
              <p className="text-gray-500 text-sm md:text-lg leading-relaxed tracking-widest uppercase font-light">
                Engineering isn’t just numbers; it’s the heartbeat of every corner, 
                the tension in the asphalt, and the silent roar of a V8 at rest. 
              </p>
            </div>
          </section>

          <PerformanceHUD />

          <IntermediateDrive />

          <WheelFeature />

          <footer className="py-32 px-16 border-t border-white/5 bg-obsidian relative z-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-m-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 relative z-10">
              <div className="flex flex-col gap-12">
                <div className="flex gap-1">
                  <div className="w-1 h-12 bg-m-light-blue" />
                  <div className="w-1 h-12 bg-m-dark-blue" />
                  <div className="w-1 h-12 bg-m-red" />
                </div>
                <div>
                  <div className="text-4xl font-black text-white italic tracking-tighter leading-none mb-2">
                    BMW <span className="text-m-blue">M</span>5
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gray-700 font-black">
                    PRECISION DIVISION
                  </p>
                </div>
              </div>
              
              {['Series', 'Innovation', 'Ownership', 'Culture'].map(col => (
                <div key={col} className="flex flex-col gap-8">
                  <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white border-b border-m-blue w-fit pb-2">{col}</h4>
                  <div className="flex flex-col gap-4">
                    {[1, 2, 3].map(i => (
                      <a key={i} href="#" className="text-[10px] uppercase tracking-[0.3em] text-gray-600 hover:text-m-blue transition-all duration-500 hover:translate-x-2">
                        {col} Concept 0{i}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-48 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
              <div className="text-[9px] uppercase tracking-[0.8em] text-gray-800 font-black">
                © 2026 BMW AG // M-POWER ENGINEERING
              </div>
              <div className="flex gap-16 text-[9px] uppercase tracking-[0.4em] text-gray-700 font-bold">
                <a href="#" className="hover:text-white transition-colors">Digital Registry</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Fleet</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
