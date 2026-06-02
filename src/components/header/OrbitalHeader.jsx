import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OrbitalHeader() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const letters = "AZURE".split("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-[8vw] py-6 flex items-center justify-between">
      {/* Scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Azure text with pixel-assembly effect */}
      <div className="flex items-center gap-0.5">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-sm md:text-base font-semibold tracking-[0.35em] text-foreground uppercase font-heading"
            initial={{ opacity: 0, filter: "blur(8px)", y: -10 }}
            animate={revealed ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* System status indicator */}
      <div className="flex items-center gap-3">
        <span className="text-xs tracking-widest text-muted-foreground uppercase hidden sm:block">
          System Active
        </span>
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
        </div>
      </div>
    </header>
  );
}