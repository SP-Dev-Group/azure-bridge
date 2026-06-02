import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function DataSample() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.People.list().then((data) => {
      setPeople(data);
      setLoading(false);
    });
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: '#020B1A' }}
    >
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 px-8 md:px-[8vw] py-10">
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
          People
        </h1>
        <p className="text-sm tracking-widest uppercase mb-12" style={{ color: '#94A3B8' }}>
          Data Sample
        </p>

        {/* Table */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '0.5px solid rgba(56,189,248,0.15)' }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-2 px-6 py-3 text-xs tracking-widest uppercase"
            style={{
              background: 'rgba(56,189,248,0.05)',
              borderBottom: '0.5px solid rgba(56,189,248,0.1)',
              color: '#38BDF8',
            }}
          >
            <span>Unique ID</span>
            <span>Name</span>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm tracking-widest uppercase" style={{ color: '#94A3B8' }}>
              Loading...
            </div>
          ) : (
            people.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-2 px-6 py-4 text-sm"
                style={{
                  borderBottom: i < people.length - 1 ? '0.5px solid rgba(56,189,248,0.06)' : 'none',
                  color: '#E0F2FE',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(56,189,248,0.02)',
                }}
              >
                <span style={{ color: '#94A3B8', fontFamily: 'monospace' }}>{person.unique_id}</span>
                <span>{person.name}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}