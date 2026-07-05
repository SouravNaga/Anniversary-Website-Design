import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface UnlockScreenProps {
  onUnlock: () => void;
}

export default function UnlockScreen({ onUnlock }: UnlockScreenProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex bg-black">
      {/* Left panel */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-[#121212] border-r border-amber-500/20 flex flex-col justify-center items-end pr-8 sm:pr-16 text-right select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-2"
        >
          <span className="text-amber-500 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase">OUR STORY</span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-semibold">
            Ekta & Amit
          </h2>
          <p className="text-amber-500/60 font-mono text-xs tracking-widest uppercase mt-1">
            Since 2021
          </p>
        </motion.div>
      </motion.div>

      {/* Center Heart Lock Indicator */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.button
          onClick={onUnlock}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center rounded-full bg-black/90 border-2 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all cursor-pointer select-none"
        >
          {/* Pulsing Outer Rings */}
          <span className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping opacity-60"></span>
          <span className="absolute inset-[-6px] rounded-full border border-amber-500/10 animate-pulse"></span>
          
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 fill-amber-500 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300 animate-heartPulse" />
          <span className="text-[9px] sm:text-[10px] text-amber-500/80 font-mono font-medium tracking-[0.2em] mt-1.5 uppercase">
            Unlock
          </span>
        </motion.button>
      </div>

      {/* Right panel */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-[#121212] flex flex-col justify-center items-start pl-8 sm:pl-16 text-left select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-2"
        >
          <span className="text-gray-400 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase">ANNIVERSARY</span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-gray-200 font-semibold">
            5 Golden Years
          </h2>
          <p className="text-amber-500 font-mono text-xs tracking-widest uppercase mt-1">
            Half a Decade
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
