'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Activity } from 'lucide-react';

export default function CinematicHero({ diffDays, liveEventsCount }: { diffDays: number, liveEventsCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Target coordinates based on mouse
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  // Current smoothed coordinates
  const currentX = useRef(0);
  const currentY = useRef(0);
  
  const rafId = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);
  
  // Prefers reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const time = useRef(0);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileQuery.matches);
    
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // pure black bg
    if (!ctx) return;

    // Handle Resize
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || motionQuery.matches) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width;
      const y = (e.clientY - rect.top) / height;
      targetX.current = (x - 0.5) * 2;
      targetY.current = (y - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove);

    // Generate Palace Particles from Image
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Mysore_Palace_Illumination.jpg";
    
    img.onload = () => {
      // Offscreen canvas to read image data
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;
      
      // Target bounds for Palace inside the hero (Right 70%, centered vertically)
      const isSmall = width < 768;
      const targetW = isSmall ? width * 0.9 : width * 0.6;
      const targetH = isSmall ? height * 0.4 : height * 0.7;
      
      const aspect = img.width / img.height;
      let drawW = targetW;
      let drawH = drawW / aspect;
      if (drawH > targetH) {
        drawH = targetH;
        drawW = drawH * aspect;
      }
      
      offscreen.width = drawW;
      offscreen.height = drawH;
      offCtx.drawImage(img, 0, 0, drawW, drawH);
      
      const imgData = offCtx.getImageData(0, 0, drawW, drawH).data;
      const particles = [];
      
      // Density sampling: skip pixels to form particles
      const step = isSmall ? 4 : 3; 
      
      // Calculate offset to place Palace on the right side
      const offsetX = isSmall ? (width - drawW) / 2 : width - drawW - (width * 0.05);
      const offsetY = isSmall ? (height - drawH) : (height - drawH) / 2 + 50;

      for (let y = 0; y < drawH; y += step) {
        for (let x = 0; x < drawW; x += step) {
          const i = (y * drawW + x) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          
          // Filter out the dark night sky
          const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (luma > 30) {
            // Apply "Mysuru Gold" toning
            // r=212, g=175, b=55 (#D4AF37) mixed with original luminance
            const goldR = Math.min(255, luma * 1.5 + 50);
            const goldG = Math.min(255, luma * 1.2 + 20);
            const goldB = Math.min(255, luma * 0.4);
            
            // Base coordinates
            const baseX = x + offsetX;
            const baseY = y + offsetY;
            
            // Random depth/z multiplier for 2.5D parallax
            // Brighter pixels (domes/lights) are closer (higher z)
            const z = (luma / 255) * 2 + Math.random() * 0.5;
            
            particles.push({
              baseX,
              baseY,
              x: baseX,
              y: baseY,
              z,
              r: goldR,
              g: goldG,
              b: goldB,
              size: (luma / 255) * 1.5 + 0.5,
              phase: Math.random() * Math.PI * 2,
              speed: 0.02 + Math.random() * 0.03
            });
          }
        }
      }
      particlesRef.current = particles;
    };

    // Render Loop
    const render = () => {
      if (isMobile) {
        time.current += 0.005;
        currentX.current = Math.sin(time.current) * 0.5;
        currentY.current = Math.cos(time.current * 0.8) * 0.3;
      } else {
        currentX.current += (targetX.current - currentX.current) * 0.08;
        currentY.current += (targetY.current - currentY.current) * 0.08;
      }
      
      // Clear background to deep navy/black
      ctx.fillStyle = '#020305';
      ctx.fillRect(0, 0, width, height);
      
      // Draw background glow based on camera position
      const glowX = width * 0.7 + (currentX.current * -50);
      const glowY = height * 0.6 + (currentY.current * -50);
      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.6);
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)'); // Mysuru gold glow
      gradient.addColorStop(1, 'rgba(2, 3, 5, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Particles
      const particles = particlesRef.current;
      const pLen = particles.length;
      
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        
        // 2.5D Parallax: offset X/Y based on Z depth and Mouse position
        // Parallax intensity (negative means it moves opposite to mouse, creating depth)
        const parallaxX = currentX.current * (p.z * -30);
        const parallaxY = currentY.current * (p.z * -15);
        
        // Subtle floating animation if not reduced motion
        let floatY = 0;
        let pulse = 1;
        if (!motionQuery.matches) {
          p.phase += p.speed;
          floatY = Math.sin(p.phase) * (p.z * 1.5);
          pulse = 0.8 + Math.sin(p.phase * 2) * 0.2;
        }

        p.x = p.baseX + parallaxX;
        p.y = p.baseY + parallaxY + floatY;
        
        // Draw particle
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(render);
    };
    
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, reducedMotion]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-[100vh] flex flex-col justify-center overflow-hidden bg-[#020305] border-b border-brand-gold/10"
    >
      {/* LAYER 1 & 2 & 3 & 4: WebGL/Canvas Particle Engine */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 block pointer-events-none"
      />
      
      {/* LAYER 5: Foreground Text Content */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 parallax-text transition-transform duration-100 ease-out will-change-transform">
        <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-start pt-24 pb-16 pointer-events-auto">
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
