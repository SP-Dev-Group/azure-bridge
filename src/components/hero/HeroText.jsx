import React from 'react';
import { motion } from 'framer-motion';

export default function HeroText({ scrollProgress }) {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* "Base 44" — faded, stroked, slides down on scroll */}
      <motion.div
        className="relative"
        style={{ y: scrollProgress * 60 }}
      >
        <h2
          className="text-[12vw] md:text-[10vw] font-extrabold font-display uppercase leading-none tracking-tight"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(224, 242, 254, 0.25)',
            opacity: 0.35,
          }}
        >
          Base 44
        </h2>
      </motion.div>

      {/* "to Azure" — glowing, scales up on scroll */}
      <motion.div
        className="relative -mt-[3vw] md:-mt-[2vw]"
        style={{ scale: 1 + scrollProgress * 0.15 }}
      >
        <h2
          className="text-[12vw] md:text-[10vw] font-extrabold font-display uppercase leading-none tracking-tight text-foreground relative z-10"
          style={{ letterSpacing: '-0.03em' }}
        >
          to Azure
        </h2>
        {/* Outer glow */}
        <div
          className="absolute inset-0 text-[12vw] md:text-[10vw] font-extrabold font-display uppercase leading-none tracking-tight text-primary blur-2xl opacity-30 pointer-events-none z-0"
          aria-hidden
          style={{ letterSpacing: '-0.03em' }}
        >
          to Azure
        </div>
      </motion.div>
    </div>
  );
}