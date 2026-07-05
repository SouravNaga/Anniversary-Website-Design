import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Heart, Award, Star, Compass, Flame, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Milestone } from '../types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onAddMilestone: (newMilestone: Omit<Milestone, 'id'>) => void;
  onDeleteMilestone: (id: string) => void;
}

const ICONS = [
  { name: 'Heart', component: Heart },
  { name: 'Award', component: Award },
  { name: 'Star', component: Star },
  { name: 'Compass', component: Compass },
  { name: 'Flame', component: Flame },
  { name: 'Gift', component: Gift },
];

export default function MilestoneTimeline({ milestones, onAddMilestone, onDeleteMilestone }: MilestoneTimelineProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Heart');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddMilestone({
      title: title.trim(),
      date,
      description: description.trim(),
      icon,
    });

    // Reset
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setIcon('Heart');
    setIsAdding(false);
  };

  // Sort milestones by date ascending
  const sortedMilestones = [...milestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-8" id="relationship-timeline">
      {/* Timeline Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="text-rose-500 fill-rose-500" />
            Our Love Story Timeline
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Chronicles of major moments that defined our beautiful path.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} /> Add Milestone
        </button>
      </div>

      {/* Add Milestone Inline Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-4 text-left max-w-xl mx-auto">
              <h3 className="font-serif text-lg font-bold text-gray-900">Add a New Core Milestone</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Milestone Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., The Day We Moved In"
                    className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Short Description</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Tell the mini story of what made this moment unforgettable..."
                  className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-xs resize-none"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Choose Milestone Icon</label>
                <div className="flex gap-2">
                  {ICONS.map(ic => {
                    const IconComp = ic.component;
                    return (
                      <button
                        key={ic.name}
                        type="button"
                        onClick={() => setIcon(ic.name)}
                        className={`p-2 rounded-lg border-2 transition-all cursor-pointer ${
                          icon === ic.name
                            ? 'border-rose-500 bg-rose-50/30 text-rose-600 scale-105'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <IconComp size={16} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 border border-gray-100 hover:bg-gray-50 rounded-lg text-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 text-white hover:bg-rose-700 rounded-lg shadow-sm cursor-pointer"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Visual Track */}
      <div className="relative max-w-2xl mx-auto pl-6 sm:pl-0">
        {/* Continuous timeline line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-pink-200 to-rose-200 transform sm:-translate-x-1/2" />

        <div className="space-y-8 relative">
          {sortedMilestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const IconObj = ICONS.find(i => i.name === milestone.icon) || ICONS[0];
            const MilestoneIcon = IconObj.component;

            return (
              <div key={milestone.id} className="relative flex flex-col sm:flex-row items-start sm:items-center">
                {/* Timeline center node */}
                <div className="absolute left-0 sm:left-1/2 w-12 h-12 rounded-full bg-white border-2 border-rose-300 shadow-sm flex items-center justify-center transform sm:-translate-x-1/2 z-10 text-rose-500">
                  <MilestoneIcon size={18} className={milestone.icon === 'Heart' ? 'fill-rose-500/20' : ''} />
                </div>

                {/* Left block (Desktop) */}
                <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 sm:pr-8 text-left ${isLeft ? 'sm:text-right' : 'sm:opacity-0 sm:pointer-events-none'}`}>
                  {isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      className="bg-white p-5 rounded-2xl border border-rose-50 shadow-sm relative group hover:border-rose-100 transition-colors"
                    >
                      <button
                        onClick={() => onDeleteMilestone(milestone.id)}
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                        title="Delete milestone"
                      >
                        <Trash2 size={12} />
                      </button>
                      <span className="inline-block text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full mb-2">
                        {new Date(milestone.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <h4 className="font-serif text-base font-bold text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{milestone.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Right block (Desktop) */}
                <div className={`w-full sm:w-1/2 pl-14 sm:pl-8 text-left ${!isLeft ? '' : 'sm:opacity-0 sm:pointer-events-none sm:absolute'}`}>
                  {!isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      className="bg-white p-5 rounded-2xl border border-rose-50 shadow-sm relative group hover:border-rose-100 transition-colors"
                    >
                      <button
                        onClick={() => onDeleteMilestone(milestone.id)}
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                        title="Delete milestone"
                      >
                        <Trash2 size={12} />
                      </button>
                      <span className="inline-block text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full mb-2">
                        {new Date(milestone.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <h4 className="font-serif text-base font-bold text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{milestone.description}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
