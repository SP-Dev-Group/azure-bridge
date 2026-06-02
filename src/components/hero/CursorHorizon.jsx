import React from 'react';

export default function CursorHorizon({ mouseY }) {
  if (mouseY === null) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-30 h-px transition-all duration-150 ease-out"
      style={{
        top: mouseY,
        background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.15) 20%, rgba(56,189,248,0.4) 50%, rgba(56,189,248,0.15) 80%, transparent 100%)',
        boxShadow: '0 0 40px 8px rgba(56,189,248,0.08)',
      }}
    />
  );
}