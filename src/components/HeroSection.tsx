import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
  isLight: boolean;
}

export default function HeroSection({ onScrollTo, isLight }: HeroSectionProps) {
  return (
    <div className="relative py-12 md:py-20 flex justify-center items-center overflow-hidden">
      {/* Decorative Gold Corners on Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={`relative w-full max-w-3xl mx-auto px-6 py-12 md:p-16 rounded-3xl border text-center z-10 ${
          isLight
            ? 'bg-white/80 backdrop-blur-md border-rose-100 shadow-[0_10px_30px_rgba(225,29,72,0.05)]'
            : 'bg-black/40 backdrop-blur-md border-amber-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Cinematic gold borders */}
        <div className={`absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 ${isLight ? 'border-rose-300' : 'border-amber-500/30'}`} />
        <div className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 ${isLight ? 'border-rose-300' : 'border-amber-500/30'}`} />
        <div className={`absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 ${isLight ? 'border-rose-300' : 'border-amber-500/30'}`} />
        <div className={`absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 ${isLight ? 'border-rose-300' : 'border-amber-500/30'}`} />

        <div className="space-y-6">
          <span className={`inline-block text-xs font-mono tracking-[0.3em] uppercase ${isLight ? 'text-rose-500 font-semibold' : 'text-amber-500'}`}>
            Celebrating 5 Years of Infinity
          </span>

          <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight`}>
            Half a Decade <br />
            <span className={`italic font-normal ${isLight ? 'text-rose-600' : 'text-amber-500'}`}>
              of Love & Laughter
            </span>
          </h1>

          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
            From her college senior to her forever person — a journey written by fate, filled with love, and cherished through every moment since 2021. ❤️✨
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onScrollTo('timeline-section')}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
                isLight
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/10 hover:scale-[1.02]'
                  : 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/10 hover:scale-[1.02]'
              }`}
            >
              <Camera size={14} />
              View Time Capsule
            </button>
            <button
              onClick={() => onScrollTo('poem-section')}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
                isLight
                  ? 'border-rose-200 text-rose-700 hover:bg-rose-50 bg-white/50'
                  : 'border-amber-500/30 text-amber-500 hover:bg-amber-500/5 bg-black/30'
              }`}
            >
              <Sparkles size={14} />
              Craft AI Poem
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
