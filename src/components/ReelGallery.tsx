import React, { useRef, useState } from 'react';
import { Film, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { ROMANCE_REELS } from '../data/memoriesData';

interface ReelGalleryProps {
  isLight: boolean;
}

export default function ReelGallery({ isLight }: ReelGalleryProps) {
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [muted, setMuted] = useState<Record<string, boolean>>(
    ROMANCE_REELS.reduce((acc, r) => ({ ...acc, [r.id]: true }), {})
  );
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setPlaying(prev => ({ ...prev, [reelId]: true }));
      }).catch(err => console.log(err));
    } else {
      video.pause();
      setPlaying(prev => ({ ...prev, [reelId]: false }));
    }
  };

  const toggleMute = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering play/pause
    const video = videoRefs.current[reelId];
    if (!video) return;

    video.muted = !video.muted;
    setMuted(prev => ({ ...prev, [reelId]: video.muted }));
  };

  return (
    <section id="theater-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
      <div className="text-center space-y-2 mb-10">
        <span className={`text-xs font-mono tracking-[0.2em] uppercase ${isLight ? 'text-rose-500 font-semibold' : 'text-amber-500'}`}>
          CINEMA ROOM
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          Our Romance Reel Gallery
        </h2>
        <p className={`text-xs md:text-sm max-w-lg mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          Relax and play these beautiful, romantic video moments that represent our lifetime of travel and cozy dates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
        {ROMANCE_REELS.map((reel, idx) => {
          const isPlay = playing[reel.id] || false;
          const isMute = muted[reel.id] !== false;

          return (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => togglePlay(reel.id)}
              className={`relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border cursor-pointer group flex flex-col justify-between p-4 ${
                isLight 
                  ? 'border-rose-100 bg-white/50 shadow-[0_10px_30px_rgba(225,29,72,0.03)]' 
                  : 'border-amber-500/10 bg-[#151515] shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* HTML5 video element */}
              <video
                ref={el => { videoRefs.current[reel.id] = el; }}
                src={reel.videoUrl}
                poster={reel.poster}
                loop
                muted={isMute}
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark overlay for cinema theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>

              {/* Reel Header / Category badge */}
              <div className="relative z-10 flex items-center justify-between pointer-events-none">
                <div className="p-2 bg-black/50 backdrop-blur-md rounded-xl text-amber-500">
                  <Film size={14} />
                </div>
                <span className="px-2 py-0.5 bg-amber-500/10 backdrop-blur-md text-amber-400 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider">
                  REEL {idx + 1}
                </span>
              </div>

              {/* Play Pause floating indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`p-4 rounded-full bg-black/60 border border-white/15 text-white transform transition-all duration-300 ${
                  isPlay ? 'scale-0 opacity-0' : 'scale-100 opacity-100 group-hover:bg-amber-500 group-hover:text-black group-hover:border-transparent'
                }`}>
                  {isPlay ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </div>
              </div>

              {/* Bottom Details panel */}
              <div className="relative z-10 space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-serif font-semibold text-white tracking-wide">
                    {reel.title}
                  </h3>
                  <button
                    onClick={(e) => toggleMute(reel.id, e)}
                    className="p-1.5 rounded-lg bg-black/40 hover:bg-black/80 text-white border border-white/5 transition-all cursor-pointer"
                  >
                    {isMute ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
