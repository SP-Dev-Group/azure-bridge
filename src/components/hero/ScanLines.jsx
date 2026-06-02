import React from 'react';

export default function ScanLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Horizontal data-trace lines */}
      {[15, 30, 50, 70, 85].map((top) => (
        <div
          key={top}
          className="absolute left-0 right-0"
          style={{
            top: `${top}%`,
            height: '0.5px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.06) 30%, rgba(56,189,248,0.06) 70%, transparent 100%)',
          }}
        />
      ))}
    </div>
  );
}