import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, Environment, ContactShadows, Html, Float } from '@react-three/drei';
import { animate, eases } from 'animejs';

function Model({ url, annotations, rotation = [0, Math.PI / 2, 0], ...props }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Only subtle vertical hover, no rotation to keep side view perfect
    ref.current.position.y = Math.sin(t / 2) / 20;
  });

  return (
    <group ref={ref} rotation={rotation} {...props}>
      <primitive object={scene} />
      {annotations && annotations.map((note, i) => (
        <Html key={i} position={note.position} distanceFactor={10} occlude>
          <div className="group relative">
            <div className="w-4 h-4 rounded-full border-2 border-m-blue bg-white flex items-center justify-center cursor-help transition-transform duration-300 group-hover:scale-125">
              <div className="w-1 h-1 bg-m-blue rounded-full" />
            </div>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-48 bg-obsidian/80 backdrop-blur-md p-4 border-l-2 border-m-blue opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">{note.title}</h4>
              <p className="text-[9px] text-gray-400 leading-relaxed uppercase tracking-widest">{note.desc}</p>
            </div>
          </div>
        </Html>
      ))}
    </group>
  );
}

const WheelFeature = () => {
  const [activeTab, setActiveTab] = useState('wheel');

  const WHEEL_NOTES = [
    { position: [0.5, 0.5, 0], title: 'Alloy Composition', desc: 'Ultra-lightweight forged aluminum for reduced unsprung mass.' },
    { position: [-0.5, -0.2, 0], title: 'Heat Dissipation', desc: 'Aero-optimized spoke geometry for superior brake cooling.' }
  ];

  const RIM_NOTES = [
    { position: [0, 0.8, 0], title: 'Structural Integrity', desc: 'Reinforced core built to withstand extreme V8 torque.' },
    { position: [0.6, -0.4, 0], title: 'Surface Finish', desc: 'Diamond-cut edges with high-gloss obsidian coating.' }
  ];

  return (
    <section className="relative min-h-screen w-full bg-obsidian py-32 flex flex-col items-center overflow-hidden">
      
      {/* Background HUD Graphics */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border-2 border-dashed border-m-blue/10 rounded-full animate-spin-extremely-slow" />
      </div>

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase mb-4 leading-none">
          M-Performance <span className="text-m-blue underline decoration-white/10 underline-offset-8">Anatomy</span>.
        </h2>
        <p className="text-[10px] uppercase tracking-[0.8em] text-gray-500 max-w-2xl mx-auto leading-loose mt-8">
          A deep dive into the engineering of adrenaline. Hover over the technical points 
          to explore the precision behind the M-Power legacy.
        </p>
      </div>

      {/* Switcher */}
      <div className="relative z-10 flex gap-12 mb-16">
        {['wheel', 'rim'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[11px] uppercase tracking-[0.4em] font-black pb-4 border-b-2 transition-all duration-700 ${
              activeTab === tab ? 'text-white border-m-blue' : 'text-gray-700 border-transparent hover:text-gray-400'
            }`}
          >
            0{tab === 'wheel' ? '1' : '2'} / M-{tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="relative z-10 w-full flex-1 max-w-7xl h-[600px] glass-m rounded-[4rem] overflow-hidden border border-white/5">
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 35, position: [0, 0, 5] }}>
          <color attach="background" args={['#020202']} />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <PresentationControls speed={1} global zoom={0.8} polar={[-0.1, Math.PI / 4]}>
                <Stage environment="city" intensity={0.5} contactShadow={false}>
                  {activeTab === 'wheel' ? (
                    <Model url="/models/wheel.glb" scale={0.012} annotations={WHEEL_NOTES} rotation={[0, Math.PI / 2, 0]} />
                  ) : (
                    <Model url="/models/rim.glb" scale={0.012} annotations={RIM_NOTES} rotation={[0, Math.PI / 2, 0]} />
                  )}
                </Stage>
              </PresentationControls>
            </Float>
            <Environment preset="night" />
            <ContactShadows opacity={0.6} scale={15} blur={3} far={10} color="#000" />
          </Suspense>
        </Canvas>
        
        {/* Decorative Specs Overlay */}
        <div className="absolute top-12 left-12 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-m-blue" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-m-blue font-bold">Inertia Matrix v4.2</span>
          </div>
          <div className="text-[40px] font-black italic text-white/5 leading-none select-none">
            {activeTab === 'wheel' ? 'FORGED_01' : 'CORE_RIM_X'}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin-extremely-slow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .animate-spin-extremely-slow {
            animation: spin-extremely-slow 120s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default WheelFeature;
