'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Activity } from 'lucide-react';

export default function CinematicHero({ diffDays, liveEventsCount }: { diffDays: number, liveEventsCount: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Target coordinates based on mouse
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  // Current smoothed coordinates
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  const rafId = useRef<number>();
  
  // Prefers reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  // Is Mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // For automatic drift on mobile
  const time = useRef(0);

  useEffect(() => {
    // Check media queries
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileQuery.matches);
    
    if (motionQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1
      
      // Map to -1 to 1
      targetX.current = (x - 0.5) * 2;
      targetY.current = (y - 0.5) * 2;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const render = () => {
      if (!containerRef.current) return;
      
      if (isMobile) {
        // Automatic cinematic drift
        time.current += 0.005;
        currentX.current = Math.sin(time.current) * 0.5;
        currentY.current = Math.cos(time.current * 0.8) * 0.3;
      } else {
        // Lerp towards target for smooth inertia
        currentX.current += (targetX.current - currentX.current) * 0.05;
        currentY.current += (targetY.current - currentY.current) * 0.05;
      }
      
      // Calculate transforms
      const rotateY = currentX.current * 2; // -2 to 2 degrees
      const rotateX = -currentY.current * 1; // -1 to 1 degrees
      
      // Update DOM directly for performance (bypassing React state)
      const container = containerRef.current;
      
      // Layer 1: Background linework / far architecture (moves opposite/slowly)
      const layer1 = container.querySelector('.parallax-bg') as HTMLElement;
      if (layer1) layer1.style.transform = `translate3d(${currentX.current * -10}px, ${currentY.current * -10}px, 0) scale(1.05)`;
      
      // Layer 2: Glow
      const layer2 = container.querySelector('.parallax-glow') as HTMLElement;
      if (layer2) layer2.style.transform = `translate3d(${currentX.current * -5}px, ${currentY.current * -5}px, 0)`;
      
      // Layer 3: Palace (main subject)
      const layer3 = container.querySelector('.parallax-palace') as HTMLElement;
      if (layer3) layer3.style.transform = `translate3d(${currentX.current * 15}px, ${currentY.current * 10}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
      
      // Layer 4: Text Foreground (moves slightly in same direction to create depth against Palace)
      const layer4 = container.querySelector('.parallax-text') as HTMLElement;
      if (layer4) layer4.style.transform = `translate3d(${currentX.current * 5}px, ${currentY.current * 5}px, 0) rotateY(${rotateY * 0.5}deg) rotateX(${rotateX * 0.5}deg)`;
      
      // Layer 5: Particles
      const particles = container.querySelectorAll('.parallax-particle');
      particles.forEach((p, i) => {
        const el = p as HTMLElement;
        const depth = parseFloat(el.dataset.depth || "1");
        el.style.transform = `translate3d(${currentX.current * 30 * depth}px, ${currentY.current * 30 * depth}px, 0)`;
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, reducedMotion]);

  // Generate deterministic particles to avoid hydration mismatch
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${10 + (i * 47) % 80}%`,
    left: `${5 + (i * 61) % 90}%`,
    size: `${2 + (i % 4)}px`,
    depth: 0.5 + (i % 10) / 10,
    opacity: 0.2 + (i % 5) / 10,
    delay: `${(i % 5)}s`
  }));

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-[100vh] flex flex-col justify-center overflow-hidden bg-[#020305] border-b border-brand-gold/10"
      style={{ perspective: '1000px' }}
    >
      {/* LAYER 1: Deep Black Atmospheric Background & Linework */}
      <div className="absolute inset-0 z-0 parallax-bg transition-transform duration-1000 ease-out will-change-transform">
        {/* Subtle architectural arches pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10c22 0 40 18 40 40v40H10V50c0-22 18-40 40-40zm0 5c-19.3 0-35 15.7-35 35v35h70V50c0-19.3-15.7-35-35-35z' fill='%23D4AF37' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundPosition: 'center bottom'
          }}
        />
      </div>

      {/* LAYER 2: Golden Palace Illumination / Glow */}
      <div className="absolute inset-0 z-0 parallax-glow transition-transform duration-1000 ease-out will-change-transform">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-gold/10 rounded-full blur-[120px] mix-blend-screen"></div>
         <div className="absolute bottom-0 right-0 w-[50%] h-[60%] bg-[#ff7a00]/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* LAYER 3: Main Palace Image */}
      <div className="absolute inset-0 z-0 parallax-palace transition-transform duration-1000 ease-out will-change-transform flex items-center justify-end md:justify-center">
        {/* We use a masking gradient so the image fades smoothly into the black background */}
        <div 
          className="w-full h-full md:w-[120%] md:h-[120%] md:-right-[10%] relative opacity-80"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 80%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in'
          }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Mysore_Palace_Illumination.jpg" 
            alt="Mysuru Palace Illuminated" 
            className="w-full h-full object-cover md:object-contain object-right md:object-center mix-blend-lighten"
            style={{ filter: 'contrast(1.2) sepia(0.2) hue-rotate(-10deg) brightness(0.9)' }}
          />
        </div>
        
        {/* Overlay gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020305] via-[#020305]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020305] via-transparent to-[#020305]/60 z-10"></div>
      </div>

      {/* LAYER 4: Particles (Golden light specks) */}
      {!reducedMotion && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {particles.map(p => (
            <div 
              key={p.id}
              className="parallax-particle absolute rounded-full bg-[#FFF8D6] shadow-[0_0_8px_2px_rgba(212,175,55,0.6)] animate-pulse"
              data-depth={p.depth}
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDelay: p.delay,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      )}

      {/* LAYER 5: Foreground Text Content */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 parallax-text transition-transform duration-1000 ease-out will-change-transform">
        <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-start pt-24 pb-16">
          <h2 className="text-brand-gold font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-6 flex items-center gap-3 drop-shadow-md">
            <span className="w-10 h-[1px] bg-brand-gold"></span> OFFICIAL DIGITAL EXPERIENCE
          </h2>
          
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-widest shadow-xl">
            {diffDays > 0 ? (
              <><Clock size={14} className="text-brand-gold" /> Dasara begins in {diffDays} days</>
            ) : liveEventsCount > 0 ? (
              <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> LIVE NOW</>
            ) : (
              <><Activity size={14} className="text-brand-gold" /> Festival Ongoing</>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-bold mb-8 text-[#FFF8D6] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-[1.05] tracking-tight">
            Nada Habba<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#FFF8D6] to-brand-gold">Mysuru Dasara</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#FFF8D6]/70 mb-12 max-w-xl font-light leading-relaxed border-l-2 border-brand-gold/30 pl-6 drop-shadow-md">
            Everything happening in Mysuru Dasara.<br/>
            Everything you need to experience it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-30">
            <Link href="/events" className="bg-gradient-to-r from-brand-gold to-[#e5c158] hover:from-[#FFF8D6] hover:to-[#FFF8D6] text-[#020305] font-bold text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-0.5">
              Explore Dasara <ArrowRight size={20} />
            </Link>
            <Link href="/my-dasara" className="bg-black/30 hover:bg-black/50 backdrop-blur-md border border-brand-gold/30 text-[#FFF8D6] font-bold text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
              <Calendar size={20} className="text-brand-gold" /> Plan My Day
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
