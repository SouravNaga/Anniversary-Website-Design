import React, { useState, useRef, useEffect } from 'react';
import { Star, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ZodiacSandboxProps {
  isLight: boolean;
  defaultName1: string;
  defaultName2: string;
}

export default function ZodiacSandbox({ isLight, defaultName1, defaultName2 }: ZodiacSandboxProps) {
  // Zodiac state
  const [name1, setName1] = useState(defaultName1);
  const [name2, setName2] = useState(defaultName2);
  const [zodiac1, setZodiac1] = useState('Capricorn ♑');
  const [zodiac2, setZodiac2] = useState('Virgo ♍');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; summary: string } | null>(null);

  // Canvas Sandbox refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMeasure = async () => {
    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names/zodiac signs to consult the stars!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/zodiac-harmony', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name1: name1.trim(),
          name2: name2.trim(),
          zodiac1: zodiac1,
          zodiac2: zodiac2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        // Fallback calculation
        const randomScore = Math.floor(Math.random() * 15) + 85; // 85 - 99
        setResult({
          score: randomScore,
          summary: `The alignment between ${name1} (${zodiac1}) and ${name2} (${zodiac2}) radiates absolute warmth and spiritual alignment. Venus, the planet of love, rules strongly over your chart, promising a future of mutual understanding, laughter, and unbreakable vows.`,
        });
      }
    } catch (err) {
      console.error(err);
      const randomScore = Math.floor(Math.random() * 15) + 85;
      setResult({
        score: randomScore,
        summary: `Astrological alignment computed! The connection between ${name1} and ${name2} reflects a beautifully balanced partnership. Your stars form a perfect romantic trine, fostering steady communication and heartfelt resonance.`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Cosmic Particle Sandbox effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      canvas.width = rect?.width || 300;
      canvas.height = rect?.height || 260;
    };
    resizeCanvas();

    // Resize observer
    const observer = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'heart' | 'sparkle' | 'star';
      color: string;
      oscillation: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = -(Math.random() * 1.5 + 0.8);
        this.opacity = 1;
        this.oscillation = Math.random() * 100;
        
        const types: ('heart' | 'sparkle' | 'star')[] = ['heart', 'sparkle', 'star'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        // Match theme colors
        if (isLight) {
          const colors = ['#f43f5e', '#ec4899', '#f472b6', '#fb7185'];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
          const colors = ['#f59e0b', '#fbbf24', '#f59e0b', '#d97706'];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      update() {
        this.x += this.speedX + Math.sin(this.oscillation / 10) * 0.3;
        this.y += this.speedY;
        this.oscillation += 1;
        this.opacity -= 0.008;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;

        if (this.type === 'heart') {
          // Draw simple sweet heart
          c.beginPath();
          c.moveTo(this.x, this.y + this.size / 4);
          c.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
          c.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y + this.size / 4);
          c.closePath();
          c.fill();
        } else if (this.type === 'star') {
          // Draw standard star
          c.beginPath();
          for (let i = 0; i < 5; i++) {
            c.lineTo(
              this.x + Math.cos(((18 + i * 72) * Math.PI) / 180) * this.size,
              this.y - Math.sin(((18 + i * 72) * Math.PI) / 180) * this.size
            );
            c.lineTo(
              this.x + Math.cos(((54 + i * 72) * Math.PI) / 180) * (this.size / 2),
              this.y - Math.sin(((54 + i * 72) * Math.PI) / 180) * (this.size / 2)
            );
          }
          c.closePath();
          c.fill();
        } else {
          // Sparkle plus symbol
          c.beginPath();
          c.rect(this.x - 1, this.y - this.size, 2, this.size * 2);
          c.rect(this.x - this.size, this.y - 1, this.size * 2, 2);
          c.closePath();
          c.fill();
        }
        c.restore();
      }
    }

    const spawnParticles = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(x, y));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        spawnParticles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.opacity > 0);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [isLight]);

  const ZODIACS = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 
    'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 
    'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ];

  return (
    <section id="harmony-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
        
        {/* Zodiac Compatibility Calculator */}
        <div className={`p-6 md:p-8 rounded-3xl border flex flex-col justify-between text-left ${
          isLight
            ? 'bg-white border-rose-100 shadow-[0_10px_35px_rgba(225,29,72,0.03)]'
            : 'bg-[#151515] border-amber-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
        }`}>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase block">
                INTERACTIVE AI ANALYSIS
              </span>
              <h3 className="font-serif text-xl font-bold">
                Zodiac Harmony Analyzer
              </h3>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Check your love alignment & request sweet AI advice on continuing a golden relationship.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      isLight ? 'border-rose-100 bg-rose-50/10' : 'border-amber-500/10 bg-black/40 text-white'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                    Your Zodiac
                  </label>
                  <select
                    value={zodiac1}
                    onChange={(e) => setZodiac1(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      isLight ? 'border-rose-100 bg-rose-50/10 text-gray-700' : 'border-amber-500/10 bg-black/40 text-gray-200'
                    }`}
                  >
                    {ZODIACS.map(z => <option key={z} value={z} className="text-black bg-white">{z}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      isLight ? 'border-rose-100 bg-rose-50/10' : 'border-amber-500/10 bg-black/40 text-white'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                    Partner Zodiac
                  </label>
                  <select
                    value={zodiac2}
                    onChange={(e) => setZodiac2(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none ${
                      isLight ? 'border-rose-100 bg-rose-50/10 text-gray-700' : 'border-amber-500/10 bg-black/40 text-gray-200'
                    }`}
                  >
                    {ZODIACS.map(z => <option key={z} value={z} className="text-black bg-white">{z}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleMeasure}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isLight ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-black'
              }`}
            >
              <Wand2 size={13} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Consulting cosmic map...' : 'Measure Cosmic Harmony ✨'}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 pt-5 border-t border-rose-100/10 flex flex-col sm:flex-row items-center gap-4 text-left"
              >
                {/* Radial Percentage Gauge */}
                <div className="relative flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center bg-black/15 shadow-inner">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke={isLight ? '#fbcfe8' : '#334155'}
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke={isLight ? '#e11d48' : '#f59e0b'}
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 34}
                      strokeDashoffset={2 * Math.PI * 34 * (1 - result.score / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-sm font-serif font-bold text-gray-950 dark:text-white">
                      {result.score}%
                    </span>
                    <span className="text-[8px] tracking-wider uppercase font-semibold text-rose-500 dark:text-amber-500">
                      MATCH
                    </span>
                  </div>
                </div>

                <div className="space-y-1 max-h-32 overflow-y-auto scrollbar-none pr-1">
                  <span className="text-[10px] font-mono font-bold text-rose-500 dark:text-amber-500 uppercase tracking-widest block">
                    Celestial Synergy Summary
                  </span>
                  <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300 italic">
                    {result.summary}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cosmic Particle Sandbox */}
        <div
          ref={containerRef}
          className={`relative p-6 md:p-8 rounded-3xl border flex flex-col justify-between text-left overflow-hidden min-h-[320px] ${
            isLight
              ? 'bg-white border-rose-100 shadow-[0_10px_35px_rgba(225,29,72,0.03)]'
              : 'bg-[#151515] border-amber-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          }`}
        >
          <div className="relative z-10 space-y-1.5 pointer-events-none select-none">
            <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase block">
              INTERACTIVE HEART PARTICLES
            </span>
            <h3 className="font-serif text-xl font-bold">
              Cosmic Particle Sandbox
            </h3>
            <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
              Move your mouse or swipe across this dark container to spark cosmic heart elements that rise towards the sky!
            </p>
          </div>

          {/* Interactive HTML5 Canvas Layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair z-0 block"
          />

          <div className="relative z-10 pointer-events-none select-none text-right mt-auto">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              Hover to interact • Made with AI particles
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
