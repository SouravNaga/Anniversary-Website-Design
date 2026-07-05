import React from 'react';
import { YEAR_GALLERIES } from '../data/memoriesData';
import { motion } from 'motion/react';

interface JourneyTimelineProps {
  isLight: boolean;
}

export default function JourneyTimeline({ isLight }: JourneyTimelineProps) {
  return (
    <section id="timeline-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
      <div className="text-center space-y-2 mb-10">
        <span className={`text-xs font-mono tracking-[0.2em] uppercase ${isLight ? 'text-rose-500 font-semibold' : 'text-amber-500'}`}>
          MEMORIES SCROLL
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          Our Journey Year-by-Year
        </h2>
        <p className={`text-xs md:text-sm max-w-lg mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          Hover on the auto-sliding rows to pause and admire the memories. 10 captured moments for every single beautiful year.
        </p>
      </div>

      <div className="space-y-8 overflow-hidden py-4">
        {YEAR_GALLERIES.map((gallery, index) => {
          // Alternate scroll direction for visual dynamism
          const marqueeClass = index % 2 === 0 ? 'animate-marquee-left' : 'animate-marquee-right';
          // Duplicate items to ensure smooth seamless looping
          const displayImages = [...gallery.images, ...gallery.images, ...gallery.images];

          return (
            <div key={gallery.year} className="relative flex items-center w-full group">
              {/* Year label sticky on left */}
              <div className="absolute left-4 md:left-8 z-20 pointer-events-none">
                <span className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase shadow-lg select-none ${
                  isLight 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-amber-500 text-black'
                }`}>
                  📌 {gallery.year}
                </span>
              </div>

              {/* Loop gallery row */}
              <div className="w-full flex overflow-x-hidden relative py-1">
                {/* Fade overlays on sides for smooth depth */}
                <div className={`absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${isLight ? 'from-[#faf7f5] to-transparent' : 'from-[#121212] to-transparent'}`}></div>
                <div className={`absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${isLight ? 'from-[#faf7f5] to-transparent' : 'from-[#121212] to-transparent'}`}></div>

                <div className={`${marqueeClass} hover:[animation-play-state:paused] flex gap-4 pr-4 pl-20 sm:pl-32`}>
                  {displayImages.map((img, imgIdx) => (
                    <motion.div
                      key={`${gallery.year}-${imgIdx}`}
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`relative flex-shrink-0 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border cursor-pointer group/card ${
                        isLight ? 'border-rose-100/40 bg-white' : 'border-amber-500/10 bg-black/40'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-15 group-hover/card:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                      {/* Dark overlay showing caption on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                          {gallery.year} Moment
                        </span>
                        <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                          {img.caption}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
