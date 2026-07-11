import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';

interface BubuPuchuAnimationProps {
  isLight: boolean;
}

type AnimationState = 
  | 'idle' 
  | 'hug' 
  | 'lovePoke' 
  | 'giggle' 
  | 'snuggle' 
  | 'cuddleKiss' 
  | 'sweetHeart';

interface Coupon {
  id: string;
  title: string;
  emoji: string;
  description: string;
  code: string;
  color: string;
}

// All of the user's custom Tenor & GifDB Bubu Puchu GIF URLs mapped beautifully
const GIF_MAP: Record<AnimationState, string> = {
  idle: 'https://media1.tenor.com/m/Z6uWvN9G_gAAAAAC/bubu-Puchu.gif',
  hug: 'https://media1.tenor.com/m/JMyM1f8Vge4AAAAC/Puchu-bubu.gif', // Original favorite tight hug
  lovePoke: 'https://media1.tenor.com/m/F9Q3thp6tzUAAAAC/bubu-bubu-Puchu.gif', // Bubu-bubu-Puchu shakes/hitting!
  giggle: 'https://media.tenor.com/5Ftk0dN0FMUAAAAC/xd.gif', // Giggling/laughing together!
  snuggle: 'https://media.tenor.com/8trqa66_h6MAAAAC/Puchu-bubu-bear-and-panda.gif', // Cuddling panda/bear roll!
  cuddleKiss: 'https://media1.tenor.com/m/0JWcKoeZ3kkAAAAC/bubu-bubu-Puchu.gif', // Sweet double face-kiss snuggle!
  sweetHeart: 'https://gifdb.com/images/high/Puchu-bubu-gif-olq5797hyu3g9drn.gif' // Beautiful heart throw / melting eyes!
};

const DIALOGUES: Record<AnimationState, string[]> = {
  idle: [
    "Puchu: Atri loves Sourav this much! 💖 Bubu: No, Sourav loves Atri way more! 🥰",
    "Bubu: Hey Puchu, are you thinking about Atri? 🧸 Puchu: Always! She is my favorite person! ✨",
    "Puchu: 5 Years of Love & Laughter... and we are still as crazy as day one! 🎉",
    "Bubu: Do you want a cuddle? 🌸 Puchu: Yes, please! A super tight one!"
  ],
  hug: [
    "Puchu: *SQUEEZE* Squeezing you tight so you feel all my warmth! 🫂",
    "Bubu: Cozy transmission complete! Atri's energy bar is now at 100%! ❤️",
    "Puchu: Real hugs soon, virtual hugs until then! 🥰"
  ],
  lovePoke: [
    "Bubu: *shake shake* Wake up Sourav! Give me chocolates and kisses now! 🍫⚡",
    "Puchu: *playful attacks* Love you love you love you love you! Hahaha! ❤️",
    "Bubu: Stop playing games and look at me! 🥰"
  ],
  giggle: [
    "Puchu: Hahaha! You are so silly, Sourav! 😂",
    "Bubu: Giggles activated! Laughing together is our favorite hobby! 💖",
    "Puchu: Wiggle wiggle! Your smile makes my day perfect! 🌟"
  ],
  snuggle: [
    "Bubu: Roll together! Hold my hand and never let go, okay? 🧸❤️",
    "Puchu: Cozy level over 9000! Staying like this forever! ✨",
    "Bubu: You are my sweet, fluffy teddy bear, Sourav! 🥰"
  ],
  cuddleKiss: [
    "Puchu: *smooch smooch smooch* Infinite sweet cheek kisses for my queen! 💋👑",
    "Bubu: *giggles* Your beard tickles, but I love it! Hahaha! 🌸",
    "Puchu: You are mine, only mine! 😘"
  ],
  sweetHeart: [
    "Puchu: Boooom! Sending a giant heart full of pure love to Atri! 💖✨",
    "Bubu: My eyes turn into literal hearts when I look at you! 😍",
    "Puchu: *hearts exploding* You are my happy place! ❤️"
  ]
};

const LOVE_COUPONS: Coupon[] = [
  {
    id: 'c1',
    title: 'Infinite Cuddle Pass',
    emoji: '🫂',
    description: 'Redeemable for 1 super cozy, warm hug session from Sourav. Valid anytime, anywhere.',
    code: 'HUG-999-FOREVER',
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'c2',
    title: 'Boba & Dessert Feast',
    emoji: '🧋',
    description: 'Sourav will treat Atri to her absolute favorite bubble tea and delicious cakes.',
    code: 'SWEET-BOBA-BOOM',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'c3',
    title: 'Argument Skip Voucher',
    emoji: '🧸',
    description: 'Instantly bypass any minor argument by showing this card with a cute pout. No questions asked.',
    code: 'POUT-MERCY-SKIP',
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'c4',
    title: 'Late Night Food Order',
    emoji: '🍕',
    description: 'Entitles Atri to a midnight craving order (Pizza, Biryani, or Momos) fully sponsored by Sourav.',
    code: 'CRUISE-MIDNIGHT-MUNCH',
    color: 'from-red-400 to-rose-600'
  },
  {
    id: 'c5',
    title: 'Unlimited Head Scratches & Massage',
    emoji: '💆‍♀️',
    description: 'Redeemable for a relaxing 30-minute head massage or hair styling session by Sourav.',
    code: 'SPA-ROYAL-PAMPER',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'c6',
    title: 'Yes Day Token',
    emoji: '👑',
    description: 'Sourav must say "Yes" to whatever Atri plans for the next 4 hours. Choose wisely!',
    code: 'YES-QUEEN-ATRI',
    color: 'from-amber-500 to-yellow-600'
  }
];

export default function BubuPuchuAnimation({ isLight }: BubuPuchuAnimationProps) {
  const [animState, setAnimState] = useState<AnimationState>('idle');
  const [dialogue, setDialogue] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  // Rotate dialogues
  useEffect(() => {
    const list = DIALOGUES[animState];
    const randomIdx = Math.floor(Math.random() * list.length);
    setDialogue(list[randomIdx]);

    // Revert to idle after 6.5 seconds so it returns to cute standby
    if (animState !== 'idle') {
      const timer = setTimeout(() => {
        setAnimState('idle');
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [animState]);

  // Click handler to launch dynamic flying hearts
  const triggerHearts = (count = 12) => {
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10, // percentage x
      y: Math.random() * 40 + 40, // percentage y
      size: Math.random() * 20 + 12 // size in px
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    // Clean up hearts
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 3000);
  };

  const handleAction = (state: AnimationState) => {
    setAnimState(state);
    if (state === 'hug' || state === 'cuddleKiss' || state === 'sweetHeart') {
      triggerHearts(22);
    } else {
      triggerHearts(10);
    }
  };

  const handleGetCoupon = () => {
    const randomIdx = Math.floor(Math.random() * LOVE_COUPONS.length);
    setActiveCoupon(LOVE_COUPONS[randomIdx]);
    triggerHearts(15);
  };

  return (
    <section 
      id="bubu-Puchu-section" 
      className={`relative w-full rounded-3xl overflow-hidden py-16 px-4 md:px-8 shadow-2xl transition-all duration-500 border scroll-mt-24 ${
        isLight 
          ? 'bg-gradient-to-br from-rose-50 via-[#fffaf9] to-amber-50/50 border-rose-100' 
          : 'bg-gradient-to-br from-[#1d1215] via-[#140e10] to-[#111114] border-pink-500/10'
      }`}
    >
      {/* Decorative Floating Background items */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-24 h-24 bg-rose-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-rose-500/10 text-rose-500 dark:text-pink-400">
            <Heart size={10} className="fill-current animate-ping text-rose-500" />
            Love Stage
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-rose-600 to-amber-500 dark:from-pink-400 dark:to-amber-400 bg-clip-text text-transparent">
            Bubu & Puchu Love Sanctuary
          </h2>
          <p className={`text-xs md:text-sm max-w-lg mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
            Experience Sourav and Atri's adorable love story! Interact with live Bubu & Puchu action loops and trigger your favorite moments.
          </p>
        </div>

        {/* Dynamic Flying Hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: `${h.y}%`, x: `${h.x}%`, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0.8, 0], 
                  y: `${h.y - 45}%`, 
                  x: `${h.x + (Math.random() * 24 - 12)}%`,
                  scale: [0.5, 1.3, 1, 0.7],
                  rotate: [0, Math.random() * 50 - 25]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.8, ease: "easeOut" }}
                style={{ position: 'absolute', width: h.size, height: h.size }}
              >
                <Heart className="w-full h-full fill-rose-500 text-rose-500 filter drop-shadow-[0_2px_6px_rgba(244,63,94,0.5)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Speech/Dialogue bubble box */}
        <div className="w-full max-w-lg mb-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={dialogue}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`p-4 rounded-2xl border text-center shadow-md relative ${
                isLight 
                  ? 'bg-white border-rose-100 text-gray-800' 
                  : 'bg-[#1b1214] border-pink-500/20 text-gray-200'
              }`}
            >
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 border-r border-b z-0 bg-inherit" />
              <p className="font-sans text-xs sm:text-sm font-semibold italic relative z-10 select-none">
                {dialogue}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The Animated Stage (Polaroid Frame) */}
        <div className="w-full max-w-md relative z-10 px-4">
          <div className={`p-4 sm:p-5 rounded-3xl shadow-2xl border relative ${
            isLight 
              ? 'bg-white border-rose-100' 
              : 'bg-[#1b1214] border-pink-500/10'
          }`}>
            
            {/* Polaroid header */}
            <div className="flex justify-between items-center mb-3 px-1">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-rose-500/70 font-bold">
                ★ LIVE MOOD ★
              </span>
            </div>

            {/* Main Stage Image Wrapper */}
            <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center border ${
              isLight 
                ? 'bg-gradient-to-b from-rose-50/50 to-amber-50/30 border-rose-50' 
                : 'bg-zinc-950/40 border-pink-950/20'
            }`}>
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={animState}
                  src={GIF_MAP[animState]}
                  alt={`Bubu Puchu ${animState}`}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain pointer-events-none p-1 sm:p-2"
                />
              </AnimatePresence>

              {/* Sparkle hearts overlay during actions */}
              <AnimatePresence>
                {(animState === 'cuddleKiss' || animState === 'sweetHeart' || animState === 'hug') && (
                  <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="absolute text-3xl sm:text-4xl"
                    >
                      💝✨💖
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Polaroid caption signature */}
            <div className="mt-4 pt-1 flex flex-col items-center">
              <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
                Sourav ❤️ Atri
              </h3>
              <p className="font-mono text-[9px] tracking-widest text-amber-500/80 font-bold uppercase mt-0.5">
                Connected Since July 21, 2021
              </p>
            </div>

          </div>
        </div>

        {/* Beautiful Interaction Actions Grid */}
        <div className="w-full max-w-xl mt-8 relative z-10 px-2">
          <p className={`text-[10px] uppercase font-mono tracking-widest text-center mb-4 font-bold ${isLight ? 'text-rose-400' : 'text-pink-500/60'}`}>
            — Select Bubu & Puchu Action —
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleAction('hug')}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                animState === 'hug'
                  ? 'bg-rose-500 text-white ring-4 ring-rose-100 dark:ring-rose-500/20'
                  : 'bg-white hover:bg-rose-50 border border-rose-100 text-rose-600 dark:bg-zinc-900 dark:border-pink-500/10 dark:text-pink-400 dark:hover:bg-pink-500/5'
              }`}
            >
              <span>🫂</span> Cozy Hug
            </button>
            
            <button
              onClick={() => handleAction('cuddleKiss')}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                animState === 'cuddleKiss'
                  ? 'bg-pink-500 text-white ring-4 ring-pink-100 dark:ring-pink-500/20'
                  : 'bg-white hover:bg-pink-50 border border-pink-100 text-pink-600 dark:bg-zinc-900 dark:border-pink-500/10 dark:text-pink-400 dark:hover:bg-pink-500/5'
              }`}
            >
              <span>💋</span> Sweet Smooch
            </button>

            <button
              onClick={() => handleAction('lovePoke')}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                animState === 'lovePoke'
                  ? 'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-500/20'
                  : 'bg-white hover:bg-amber-50 border border-amber-100 text-amber-600 dark:bg-zinc-900 dark:border-pink-500/10 dark:text-amber-400 dark:hover:bg-amber-500/5'
              }`}
            >
              <span>⚡</span> Silly Poke
            </button>

            <button
              onClick={() => handleAction('giggle')}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                animState === 'giggle'
                  ? 'bg-violet-500 text-white ring-4 ring-violet-100 dark:ring-violet-500/20'
                  : 'bg-white hover:bg-violet-50 border border-violet-100 text-violet-600 dark:bg-zinc-900 dark:border-pink-500/10 dark:text-violet-400 dark:hover:bg-violet-500/5'
              }`}
            >
              <span>😆</span> Cute Giggle
            </button>

            <button
              onClick={() => handleAction('snuggle')}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                animState === 'snuggle'
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-500/20'
                  : 'bg-white hover:bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-zinc-900 dark:border-pink-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/5'
              }`}
            >
              <span>🧸</span> Cozy Roll
            </button>

            <button
              onClick={() => handleAction('sweetHeart')}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer col-span-2 sm:col-span-1 ${
                animState === 'sweetHeart'
                  ? 'bg-red-500 text-white ring-4 ring-red-100 dark:ring-red-500/20'
                  : 'bg-white hover:bg-red-50 border border-red-100 text-red-600 dark:bg-zinc-900 dark:border-pink-500/10 dark:text-red-400 dark:hover:bg-red-500/5'
              }`}
            >
              <span>💖</span> Heart Attack
            </button>
          </div>
        </div>

        {/* Love Coupon Oracle Feature */}
        <div className="w-full max-w-xl mt-12 border-t border-dashed border-rose-200/50 dark:border-pink-500/10 pt-10 flex flex-col items-center relative z-10">
          <div className="flex items-center gap-2 mb-4 text-center">
            <Gift className="text-amber-500 dark:text-amber-400 animate-bounce" size={20} />
            <h3 className="font-serif text-lg font-bold text-gray-800 dark:text-gray-100">
              Atri's Romantic Coupon Vault
            </h3>
          </div>
          <p className={`text-xs text-center max-w-sm mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            Click below to generate an official Bubu & Puchu themed love coupon to redeem with Sourav!
          </p>

          <button
            onClick={handleGetCoupon}
            className="px-6 py-3 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:from-rose-600 hover:to-amber-600 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/35 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Sparkles size={13} />
            Generate Cute Love Coupon
          </button>

          {/* Coupon Display Card with nice scratch/perforated borders */}
          <AnimatePresence>
            {activeCoupon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="mt-8 w-full max-w-md relative"
              >
                {/* Perforated paper container */}
                <div className={`p-6 rounded-2xl shadow-xl border-2 border-dashed overflow-hidden relative ${
                  isLight 
                    ? 'bg-white border-rose-200' 
                    : 'bg-[#1e1518] border-pink-500/30'
                }`}>
                  
                  {/* Left & Right punch holes decoration */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#faf7f5] dark:bg-[#121212] border-r-2 border-dashed border-rose-200 dark:border-pink-500/30" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#faf7f5] dark:bg-[#121212] border-l-2 border-dashed border-rose-200 dark:border-pink-500/30" />

                  <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${activeCoupon.color} text-white flex items-center justify-center text-3xl shadow-md`}>
                      {activeCoupon.emoji}
                    </div>
                    
                    <h4 className="font-serif text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                      {activeCoupon.title}
                    </h4>

                    <div className="w-16 h-0.5 bg-rose-200/50 dark:bg-pink-500/20" />

                    <p className={`text-xs leading-relaxed max-w-xs ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                      {activeCoupon.description}
                    </p>

                    <div className="pt-2 w-full">
                      <div className={`py-2 px-4 rounded-xl border font-mono text-xs font-semibold select-all text-center tracking-widest ${
                        isLight 
                          ? 'bg-rose-50/50 border-rose-100 text-rose-700' 
                          : 'bg-pink-950/20 border-pink-500/10 text-pink-400'
                      }`}>
                        CODE: {activeCoupon.code}
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1.5 font-mono uppercase tracking-wider">
                        ★ REDEEMABLE WITH SOURAV ON DEMAND ★
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}