import React, { useState } from 'react';
import { Sparkles, Languages, Copy, Check, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LovePoemGeneratorProps {
  isLight: boolean;
  defaultSender: string;
  defaultRecipient: string;
}

export default function LovePoemGenerator({ isLight, defaultSender, defaultRecipient }: LovePoemGeneratorProps) {
  const [senderName, setSenderName] = useState(defaultSender);
  const [recipientName, setRecipientName] = useState(defaultRecipient);
  const [language, setLanguage] = useState<'BENGALI' | 'ENGLISH'>('BENGALI');
  const [loading, setLoading] = useState(false);
  const [poem, setPoem] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!senderName.trim() || !recipientName.trim()) {
      alert('Please fill out both names to spark the cosmic Muse!');
      return;
    }

    setLoading(true);
    setPoem('');
    try {
      const response = await fetch('/api/love-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName.trim(),
          recipientName: recipientName.trim(),
          language: language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPoem(data.text || '');
      } else {
        const err = await response.json();
        alert(err.error || 'Failed to craft the poem. Please configure your GEMINI_API_KEY!');
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to the AI Oracle.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(poem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="poem-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
      <div className="text-center space-y-2 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[10px] font-bold tracking-widest uppercase">
          <Sparkles size={11} className="animate-spin" /> AI Core Enabled
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          AI Love Poem Generator
        </h2>
        <p className={`text-xs md:text-sm max-w-lg mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          Input your names, choose a language, and watch the AI write a touching, romantic anniversary wish/poem in real-time.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className={`p-6 md:p-8 rounded-3xl border ${
          isLight
            ? 'bg-white border-rose-100 shadow-[0_10px_35px_rgba(225,29,72,0.03)]'
            : 'bg-[#151515] border-amber-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
        }`}>
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Your Name (Sender)
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="E.g. Amit"
                className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                  isLight
                    ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10'
                    : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-white'
                }`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Your Partner's Name (Recipient)
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="E.g. Ekta"
                className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                  isLight
                    ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10'
                    : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-white'
                }`}
              />
            </div>
          </div>

          {/* Language selection toggle */}
          <div className="mt-6 space-y-2 text-left">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
              Poetry Language
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('BENGALI')}
                className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  language === 'BENGALI'
                    ? isLight
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'bg-amber-500 border-amber-500 text-black'
                    : isLight
                    ? 'border-rose-100 text-gray-500 hover:bg-rose-50 bg-white/40'
                    : 'border-amber-500/10 text-gray-400 hover:bg-amber-500/5 bg-black/20'
                }`}
              >
                <Languages size={14} />
                BENGALI (বাংলা) 🇧🇩
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ENGLISH')}
                className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  language === 'ENGLISH'
                    ? isLight
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'bg-amber-500 border-amber-500 text-black'
                    : isLight
                    ? 'border-rose-100 text-gray-500 hover:bg-rose-50 bg-white/40'
                    : 'border-amber-500/10 text-gray-400 hover:bg-amber-500/5 bg-black/20'
                }`}
              >
                <Languages size={14} />
                ENGLISH (UK) 🇬🇧
              </button>
            </div>
          </div>

          {/* CTA Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full mt-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              loading
                ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                : isLight
                ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/10 active:scale-98'
                : 'bg-amber-500 text-black hover:bg-amber-600 shadow-md shadow-amber-500/10 active:scale-98'
            }`}
          >
            <Sparkles size={14} className={loading ? 'animate-spin' : ''} />
            {loading ? 'AI is composing your masterpiece...' : 'GENERATE ROMANTIC POEM & WISH ✨'}
          </button>

          {/* Result Scroll display */}
          <AnimatePresence>
            {poem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="mt-8 relative overflow-hidden"
              >
                {/* Scroll look container */}
                <div className={`p-6 md:p-8 rounded-2xl border text-center shadow-inner relative max-h-96 overflow-y-auto ${
                  isLight 
                    ? 'bg-amber-50/20 border-amber-200/50' 
                    : 'bg-amber-500/5 border-amber-500/10'
                }`}>
                  {/* Copy button */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className={`p-2 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLight
                          ? 'border-amber-200 bg-white text-gray-600 hover:bg-amber-50'
                          : 'border-amber-500/20 bg-black/40 text-amber-500 hover:bg-amber-500/10'
                      }`}
                      title="Copy Poem"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      <span className="text-[10px] font-bold">Copy</span>
                    </button>
                  </div>

                  <p className={`font-serif text-sm sm:text-base leading-relaxed whitespace-pre-wrap py-4 italic max-w-lg mx-auto ${
                    isLight ? 'text-amber-950 font-medium' : 'text-amber-100'
                  }`}>
                    {poem}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
