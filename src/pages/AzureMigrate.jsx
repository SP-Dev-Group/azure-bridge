import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NoiseOverlay from '../components/hero/NoiseOverlay';
import ScanLines from '../components/hero/ScanLines';

export default function AzureMigrate() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen" style={{ background: '#020B1A' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      />
      <ScanLines />
      <NoiseOverlay />

      <div className="relative z-20 px-8 md:px-[8vw] py-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm tracking-widest uppercase mb-12 transition-colors"
          style={{ color: '#94A3B8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-2 font-display"
          style={{ color: '#E0F2FE', letterSpacing: '-0.03em' }}
        >
          Azure Migrate
        </h1>
        <p className="text-sm tracking-widest uppercase mb-16" style={{ color: '#94A3B8' }}>
          Base44 → Azure Migration Hub
        </p>

        {/* Placeholder content */}
        <div
          className="rounded-lg p-12 flex items-center justify-center"
          style={{
            border: '0.5px solid rgba(56,189,248,0.15)',
            background: 'rgba(56,189,248,0.02)',
          }}
        >
          <p className="text-sm tracking-widest uppercase" style={{ color: '#38BDF8', opacity: 0.5 }}>
            Migration tools coming soon
          </p>
        </div>
      </div>
    </div>
  );
}