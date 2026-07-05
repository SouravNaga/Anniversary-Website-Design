import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MUSIC_PLAYLIST } from '../data/memoriesData';

interface MusicPlayerProps {
  isLight: boolean;
}

export default function MusicPlayer({ isLight }: MusicPlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = MUSIC_PLAYLIST[trackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Audio autoplay prevented by browser permissions', err));
      }
    }
  }, [trackIndex]);

  // Autoplay handler on initial load or first interaction
  useEffect(() => {
    let playOnInteraction: () => void;
    
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            cleanup();
          })
          .catch(err => {
            console.log('Autoplay prevented on mount, waiting for user interaction:', err);
          });
      }
    };

    const cleanup = () => {
      window.removeEventListener('click', playOnInteraction);
      window.removeEventListener('touchstart', playOnInteraction);
      window.removeEventListener('keydown', playOnInteraction);
    };

    playOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            cleanup();
          })
          .catch(err => {
            console.log('Play on interaction failed:', err);
          });
      }
    };

    // Try playing immediately
    attemptPlay();

    // Set up listeners for interaction (any click/touch/keydown on the page)
    window.addEventListener('click', playOnInteraction);
    window.addEventListener('touchstart', playOnInteraction);
    window.addEventListener('keydown', playOnInteraction);

    return () => {
      cleanup();
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Autoplay block on initial load', err);
        // Toggle play state anyway so UI updates
        setIsPlaying(true);
      });
    }
  };

  const handleNext = () => {
    setTrackIndex(prev => (prev + 1) % MUSIC_PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* Expanded Player panel */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className={`p-4 rounded-3xl border w-64 shadow-2xl flex flex-col gap-3.5 relative ${
              isLight
                ? 'bg-white/90 backdrop-blur-md border-rose-100 shadow-rose-500/10'
                : 'bg-black/85 backdrop-blur-md border-amber-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.7)]'
            }`}
          >
            {/* Header / Collapse toggler */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music size={14} className={isLight ? 'text-rose-600' : 'text-amber-500'} />
                <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-gray-500">
                  LOFI ROMANCE
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg hover:bg-rose-100/10 transition-colors cursor-pointer text-gray-400 hover:text-white"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Track Info */}
            <div className="flex items-center gap-3 text-left">
              {/* Spinning CD avatar */}
              <div className={`relative w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center border ${
                isLight ? 'bg-rose-50 border-rose-200' : 'bg-black/50 border-amber-500/30'
              }`}>
                <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${
                  isPlaying ? 'animate-spin' : ''
                } ${isLight ? 'border-rose-300' : 'border-amber-500/30'}`}>
                  <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-rose-600' : 'bg-amber-500'}`} />
                </div>
              </div>

              <div className="space-y-0.5 overflow-hidden">
                <h4 className="text-xs font-serif font-bold text-gray-950 dark:text-white truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-[10px] font-mono text-gray-500 truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-2">
              {/* Play / pause */}
              <button
                onClick={handlePlayPause}
                className={`p-3 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isLight
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-amber-500 text-black hover:bg-amber-600'
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>

              {/* Next track */}
              <button
                onClick={handleNext}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  isLight
                    ? 'border-rose-100 hover:bg-rose-50 text-rose-700'
                    : 'border-amber-500/10 hover:bg-amber-500/5 text-amber-500'
                }`}
              >
                <SkipForward size={14} />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 flex-1 pl-1">
                <Volume2 size={13} className="text-gray-500" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className={`w-full h-1 rounded-lg appearance-none cursor-pointer ${
                    isLight ? 'bg-rose-100 accent-rose-600' : 'bg-gray-800 accent-amber-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Collapsed Floating button */
          <motion.button
            key="collapsed"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`p-3.5 rounded-full border shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isLight
                ? 'bg-white border-rose-100 text-rose-600 shadow-rose-500/10'
                : 'bg-black/90 border-amber-500/20 text-amber-500 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            }`}
          >
            <div className="relative">
              <Music size={18} className={isPlaying ? 'animate-bounce' : ''} />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase pr-1 font-mono hidden sm:inline">
              {isPlaying ? 'PLAYING' : 'ROMANTIC MUSIC'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}