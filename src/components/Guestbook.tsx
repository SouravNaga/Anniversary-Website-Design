import React, { useState, useEffect } from 'react';
import { Gift, Calendar, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_GUESTBOOK_WISHES, GuestbookWish } from '../data/memoriesData';

interface GuestbookProps {
  isLight: boolean;
}

export default function Guestbook({ isLight }: GuestbookProps) {
  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    const saved = localStorage.getItem('love_hub_guestbook_wishes');
    return saved ? JSON.parse(saved) : INITIAL_GUESTBOOK_WISHES;
  });

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend 🤝');
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('love_hub_guestbook_wishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: GuestbookWish = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      relation: relation,
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };

    setWishes(prev => [newWish, ...prev]);
    setName('');
    setMessage('');
  };

  const RELATIONS = [
    'Friend 🤝',
    'Best Friend 🌟',
    'Family ❤️',
    'Brother 🤜',
    'Sister 🌸',
    'Colleague 💼',
    'Well-Wisher 🍀'
  ];

  return (
    <section id="guestbook-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
      <div className="text-center space-y-2 mb-10">
        <div className={`inline-flex p-3 rounded-full ${isLight ? 'bg-rose-50 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
          <Gift size={24} />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          Send Anniversary Wishes
        </h2>
        <p className={`text-xs md:text-sm max-w-lg mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          Your blessing is our greatest gift. Leave your names and wish below to enter the live wedding timeline.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Wish Submission Form */}
        <div className={`p-6 md:p-8 rounded-3xl border ${
          isLight
            ? 'bg-white border-rose-100 shadow-[0_10px_35px_rgba(225,29,72,0.03)]'
            : 'bg-[#151515] border-amber-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                    isLight
                      ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10'
                      : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-white'
                  }`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  Relation to Couple
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                    isLight
                      ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10 text-gray-700'
                      : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-gray-200'
                  }`}
                >
                  {RELATIONS.map(rel => (
                    <option key={rel} value={rel} className="text-black bg-white">{rel}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Your Loving Wish Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your warm anniversary message here..."
                className={`w-full px-4 py-3 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                  isLight
                    ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10'
                    : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-white'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isLight
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md active:scale-98'
                  : 'bg-amber-500 text-black hover:bg-amber-600 shadow-md active:scale-98'
              }`}
            >
              Submit My Wish 🌸
            </button>
          </form>
        </div>

        {/* Wishes List Timeline */}
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-wider text-rose-500 font-bold uppercase block text-left">
            💕 Anniversary Wishes Timeline ({wishes.length})
          </span>

          <div className="space-y-4 text-left max-h-[450px] overflow-y-auto pr-2 scrollbar-none">
            <AnimatePresence initial={false}>
              {wishes.map((w, idx) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                  className={`p-5 rounded-2xl border ${
                    isLight
                      ? 'bg-white border-rose-100/70 shadow-[0_4px_20px_rgba(225,29,72,0.02)]'
                      : 'bg-[#151515] border-amber-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm tracking-tight">{w.name}</h4>
                      <p className="text-[10px] font-mono text-gray-500">{w.relation}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                      isLight ? 'bg-rose-50 text-rose-600' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      WISH
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed italic ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                    "{w.message}"
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-rose-100/10 text-[10px] text-gray-500 font-mono">
                    <Calendar size={11} />
                    <span>{w.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
