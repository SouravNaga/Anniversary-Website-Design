import React, { useState } from 'react';
import { Sparkles, Heart, FileText, Send, Copy, RefreshCw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoveLetterGeneratorProps {
  partnerName: string;
  senderName: string;
}

export default function LoveLetterGenerator({ partnerName, senderName }: LoveLetterGeneratorProps) {
  const [partner, setPartner] = useState(partnerName);
  const [sender, setSender] = useState(senderName);
  const [memories, setMemories] = useState('');
  const [tone, setTone] = useState('romantic, warm, and deeply heartfelt');
  const [format, setFormat] = useState('love letter');
  
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);

  const LOADING_MESSAGES = [
    'Consulting the AI Cupid...',
    'Sprinkling stardust on the keyboard...',
    'Translating raw emotion to words...',
    'Composing the perfect melody of phrases...',
    'Warming up the poetic engines...'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedText('');

    // Rotate loading messages
    const interval = setInterval(() => {
      setLoadingMessageIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    try {
      const response = await fetch('/api/love-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerName: partner.trim() || partnerName,
          senderName: sender.trim() || senderName,
          sharedMemories: memories.trim(),
          tone,
          format,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedText(data.text);
      } else {
        setGeneratedText(`Oops! ${data.error || 'The love letters helper had a tiny hiccup. Please try again!'}`);
      }
    } catch (err: any) {
      setGeneratedText('Unable to reach the AI Cupid. Please verify your backend server is active and Gemini API keys are configured!');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="ai-love-muse">
      {/* Header */}
      <div className="text-left">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-rose-500 fill-rose-500" />
          AI Cupid: Romantic Muse
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Struggling to put your feelings into words? Let our smart muse design a beautiful, heartfelt poem or letter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form panel */}
        <div className="bg-white p-6 rounded-2xl border border-rose-50/50 shadow-sm text-left space-y-4">
          <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-rose-50 pb-2 flex items-center gap-2">
            <Heart size={16} className="text-rose-500" /> Letter Customizer
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">To (Partner Name)</label>
                <input
                  type="text"
                  required
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs bg-rose-50/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">From (Your Name)</label>
                <input
                  type="text"
                  required
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs bg-rose-50/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Desired Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs bg-rose-50/10"
                >
                  <option value="deeply romantic, passionate, and warm">Romantic & Warm</option>
                  <option value="sweet, cheesy, and lighthearted with puns">Cute & Cheesy</option>
                  <option value="poetic, rich with metaphor, and literary">Poetic & Artistic</option>
                  <option value="witty, playful, and funny but still sweet">Witty & Playful</option>
                  <option value="extremely raw, vulnerable, and sincere">Raw & Sincere</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs bg-rose-50/10"
                >
                  <option value="love letter">Traditional Love Letter</option>
                  <option value="romantic poem">Beautiful Poem</option>
                  <option value="short sweet note">Short Sweet Sticky-Note</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Shared Memories / Favorite Qualities
              </label>
              <textarea
                value={memories}
                onChange={(e) => setMemories(e.target.value)}
                rows={4}
                placeholder="e.g., That rainy Tuesday we ate leftover pizza in our pajamas, your gorgeous eyes, how you always steal the blankets but bring me coffee..."
                className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs bg-rose-50/10 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 text-white shadow-sm transition-all cursor-pointer ${
                loading ? 'bg-rose-300' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={14} /> Write My Masterpiece
                </>
              )}
            </button>
          </form>
        </div>

        {/* Display parchment paper letter panel */}
        <div className="flex flex-col h-full min-h-[350px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 bg-amber-50/40 rounded-3xl border border-amber-200/50 p-8 flex flex-col items-center justify-center space-y-4"
              >
                <div className="relative">
                  <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-heartPulse" />
                  <Sparkles className="w-6 h-6 text-amber-500 absolute -top-1 -right-1 animate-spin" />
                </div>
                <p className="text-sm font-medium text-amber-900/80 animate-pulse">{LOADING_MESSAGES[loadingMessageIdx]}</p>
                <p className="text-xs text-gray-400 italic">Finding the perfect rhyme for your favorite smile...</p>
              </motion.div>
            ) : generatedText ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 bg-amber-50/50 rounded-3xl border border-amber-200/50 p-8 flex flex-col justify-between text-left shadow-xs relative overflow-hidden"
              >
                {/* Visual design lines representing premium letters */}
                <div className="absolute top-0 bottom-0 left-6 w-0.5 border-l border-amber-200/60" />

                <div className="pl-6 space-y-4 font-serif text-sm md:text-base text-amber-950 leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-line">
                  {generatedText}
                </div>

                <div className="pl-6 pt-4 border-t border-amber-200/30 mt-6 flex justify-end gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white/80 hover:bg-white border border-amber-200 rounded-lg text-amber-900 flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-all"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy text
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 bg-white rounded-3xl border border-dashed border-rose-200 p-8 flex flex-col items-center justify-center text-center space-y-3"
              >
                <FileText className="w-12 h-12 text-rose-200" />
                <h4 className="font-serif text-base font-semibold text-gray-800">Your Masterpiece Appears Here</h4>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  Customize the values on the left and tap "Write My Masterpiece" to watch AI craft a unique piece of love.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
