import React, { useState, useEffect } from 'react';
import OrbitalHeader from '../components/header/OrbitalHeader';
import HeroText from '../components/hero/HeroText';
import CursorHorizon from '../components/hero/CursorHorizon';
import NoiseOverlay from '../components/hero/NoiseOverlay';
import ScanLines from '../components/hero/ScanLines';

export default function Home() {
  const [mouseY, setMouseY] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => setMouseY(e.clientY);
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#020B1A' }}
    >
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Top light source */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(56,189,248,0.08) 0%, transparent 70%)',
        }}
      />

      <ScanLines />
      <NoiseOverlay />
      <CursorHorizon mouseY={mouseY} />
      <OrbitalHeader />

      {/* Hero section */}
      <main className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <HeroText scrollProgress={scrollProgress} />
      </main>

      {/* Extra scroll space for parallax */}
      <div className="h-[30vh]" />
    </div>
  );
}