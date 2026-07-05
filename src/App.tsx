import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  Download,
  Calendar,
  MessageCircle,
  Play,
  Share2,
  Wand
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Types
import { LoveConfig } from './types';

// Import Custom Subcomponents
import UnlockScreen from './components/UnlockScreen';
import HeroSection from './components/HeroSection';
import AnniversaryCounter from './components/AnniversaryCounter';
import JourneyTimeline from './components/JourneyTimeline';
import SocialFeed from './components/SocialFeed';
import ReelGallery from './components/ReelGallery';
import LovePoemGenerator from './components/LovePoemGenerator';
import ZodiacSandbox from './components/ZodiacSandbox';
import Guestbook from './components/Guestbook';
import MusicPlayer from './components/MusicPlayer';
import ZipExporter from './components/ZipExporter';

// Default Initial Data
const DEFAULT_CONFIG: LoveConfig = {
  partner1: 'Sourav',
  partner2: 'Atri',
  anniversaryDate: '2021-07-04', // 5 Years Anniversary in July 2026!
};

export default function App() {
  // Lock state
  const [isUnlocked, setIsUnlocked] = useState(() => {
    const saved = localStorage.getItem('love_hub_unlocked');
    return saved === 'true';
  });

  // Top level couples config
  const [config, setConfig] = useState<LoveConfig>(() => {
    const saved = localStorage.getItem('love_hub_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  // Light/Dark theme state
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('love_hub_theme');
    return saved === 'light';
  });

  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync unlock state to storage
  useEffect(() => {
    localStorage.setItem('love_hub_unlocked', String(isUnlocked));
  }, [isUnlocked]);

  // Sync config state to storage
  useEffect(() => {
    localStorage.setItem('love_hub_config', JSON.stringify(config));
  }, [config]);

  // Sync theme class on body
  useEffect(() => {
    const body = document.body;
    if (isLight) {
      body.classList.add('light-theme');
      localStorage.setItem('love_hub_theme', 'light');
    } else {
      body.classList.remove('light-theme');
      localStorage.setItem('love_hub_theme', 'dark');
    }
  }, [isLight]);

  // Handle smooth scroll to section ids
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Play sweet tick or focus on main
  };

  // Nav items list
  const NAV_ITEMS = [
    { id: 'timeline-section', label: 'Timeline', icon: Calendar },
    { id: 'social-section', label: 'Social Feed', icon: MessageCircle },
    { id: 'theater-section', label: 'Cinema Room', icon: Play },
    { id: 'poem-section', label: 'Poem AI', icon: Sparkles },
    { id: 'harmony-section', label: 'Harmony Matrix', icon: Wand },
    { id: 'guestbook-section', label: 'Wishes', icon: Heart },
    // { id: 'exporter-section', label: 'Source Pack', icon: Download },
  ];

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors duration-500 ${
      isLight ? 'bg-[#faf7f5] text-[#1c1917]' : 'bg-[#121212] text-[#f5f5f5]'
    }`}>
      
      {/* 1. Unlock Screen Overlay */}
      <AnimatePresence>
        {!isUnlocked && (
          <UnlockScreen onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* 2. Main Page Header (Fixed at top) */}
      <header className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        isLight 
          ? 'bg-white/80 backdrop-blur-md border-rose-100/60' 
          : 'bg-[#121212]/80 backdrop-blur-md border-amber-500/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-xl flex items-center justify-center ${
              isLight ? 'bg-rose-50 text-rose-500' : 'bg-amber-500/10 text-amber-500'
            }`}>
              <Heart className={`w-5 h-5 fill-current animate-heartPulse`} />
            </div>
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight">
              {config.partner1} & {config.partner2} Hub
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1 items-center">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isLight
                      ? 'text-gray-600 hover:text-rose-600 hover:bg-rose-50/50'
                      : 'text-gray-400 hover:text-amber-500 hover:bg-amber-500/5'
                  }`}
                >
                  <Icon size={12} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls (Theme Toggler + Hamburger) */}
          <div className="flex items-center gap-3">
            {/* Theme switcher toggle */}
            <button
              onClick={() => setIsLight(!isLight)}
              className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                isLight 
                  ? 'border-rose-100 bg-rose-50/20 text-rose-600 hover:bg-rose-50/50' 
                  : 'border-amber-500/10 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10'
              }`}
              title={isLight ? "Switch to Luxury Dark Theme" : "Switch to Romantic Cream Theme"}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-rose-600 rounded-xl hover:bg-rose-50/20 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`fixed top-16 inset-x-0 z-30 border-b lg:hidden shadow-lg ${
              isLight ? 'bg-white/95 backdrop-blur-lg border-rose-100' : 'bg-[#121212]/95 backdrop-blur-lg border-amber-500/10'
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isLight
                        ? 'text-gray-700 hover:bg-rose-50/50 hover:text-rose-600'
                        : 'text-gray-300 hover:bg-amber-500/5 hover:text-amber-400'
                    }`}
                  >
                    <Icon size={14} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single-Page Scroll Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
        
        {/* A. Hero Section Banner */}
        <HeroSection onScrollTo={handleScrollTo} isLight={isLight} />

        {/* B. Anniversary Countdown Panel */}
        <div className="max-w-3xl mx-auto">
          <AnniversaryCounter config={config} onUpdateConfig={setConfig} />
        </div>

        {/* C. Journey Timeline (Year-by-Year Horizontal Masonry Rows) */}
        <JourneyTimeline isLight={isLight} />

        {/* D. Instagram-Style Highlights Feed */}
        <SocialFeed isLight={isLight} />

        {/* E. Cinema Room Video Loop Reel Gallery */}
        <ReelGallery isLight={isLight} />

        {/* F. AI Love Poem & Wish Generator */}
        <LovePoemGenerator isLight={isLight} defaultSender={config.partner1} defaultRecipient={config.partner2} />

        {/* G. Cosmic Alignment Harmony and Mouse-Particle Sandbox */}
        <ZodiacSandbox isLight={isLight} defaultName1={config.partner1} defaultName2={config.partner2} />

        {/* H. Guestbook Wishes Submission & Scrolling timeline */}
        <Guestbook isLight={isLight} />

        {/* I. ZIP Download / Backup Section
        <section id="exporter-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
          <ZipExporter />
        </section> */}

      </main>

      {/* J. Floating Lofi Music Player */}
      <MusicPlayer isLight={isLight} />

      {/* Footer Branding */}
      <footer className={`border-t py-10 text-center transition-colors duration-500 mt-auto ${
        isLight ? 'bg-white/60 border-rose-100/40' : 'bg-[#151515]/60 border-amber-500/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 space-y-2">
          <p className="font-serif italic text-gray-400 font-semibold flex items-center justify-center gap-1.5 text-sm">
            Made with <Heart size={12} className="text-red-500 fill-red-500 animate-heartPulse" /> for {config.partner1} & {config.partner2}
          </p>
          <p className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
            Celebrating half a decade of stellar celestial magic. 2021 &infin; 2026.
          </p>
          <p className="pt-2 text-gray-400">&copy; {new Date().getFullYear()} Love Memories Hub. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
