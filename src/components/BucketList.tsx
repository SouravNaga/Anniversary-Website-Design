import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, Milestone, Heart, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BucketListItem } from '../types';

interface BucketListProps {
  items: BucketListItem[];
  onAddItem: (title: string) => void;
  onToggleItem: (id: string, note?: string) => void;
  onDeleteItem: (id: string) => void;
}

export default function BucketList({ items, onAddItem, onToggleItem, onDeleteItem }: BucketListProps) {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'remaining' | 'completed'>('all');
  
  // Note-editing state for checking off
  const [completingItemId, setCompletingItemId] = useState<string | null>(null);
  const [completionNote, setCompletionNote] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    onAddItem(newItemTitle.trim());
    setNewItemTitle('');
  };

  const startCompleting = (id: string) => {
    setCompletingItemId(id);
    setCompletionNote('');
  };

  const submitCompletion = () => {
    if (completingItemId) {
      onToggleItem(completingItemId, completionNote.trim() || undefined);
      setCompletingItemId(null);
      setCompletionNote('');
    }
  };

  const handleUncheck = (id: string) => {
    onToggleItem(id); // will uncheck since it's already checked
  };

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = items.filter(item => {
    if (activeTab === 'remaining') return !item.completed;
    if (activeTab === 'completed') return item.completed;
    return true;
  });

  return (
    <div className="space-y-8" id="bucket-list">
      {/* Bucket List Header */}
      <div className="text-left">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="text-rose-500" />
          Our Shared Bucket List
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Dreaming big, exploring deep, and making lifelong memories together.
        </p>
      </div>

      {/* Progress & Stats Card */}
      <div className="bg-white p-6 rounded-2xl border border-rose-50/50 shadow-sm flex flex-col md:flex-row items-center gap-8">
        {/* Circle Progress Bar */}
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#fee2e2"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#f43f5e"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * completionPercentage) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-gray-900 font-serif">{completionPercentage}%</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Done</span>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="flex-1 text-center md:text-left space-y-1">
          <h3 className="font-serif text-lg font-bold text-gray-800">
            {completedCount} of {totalCount} Dreams Fulfilled!
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {completionPercentage === 100
              ? "Unbelievable! You've accomplished everything! Ready to write down some new adventures?"
              : completionPercentage > 50
              ? "You've completed more than half of your bucket list. Keep checking off those beautiful moments!"
              : totalCount > 0
              ? "Every journey starts with a single step. Let's make some more magic happen!"
              : "Add some wild, cozy, or sweet dreams below to get started!"}
          </p>
        </div>
      </div>

      {/* Add Item Form & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Form */}
        <form onSubmit={handleAdd} className="flex-1 flex gap-2">
          <input
            type="text"
            required
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="e.g., Learn to dance Salsa together..."
            className="flex-1 px-4 py-2.5 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus size={16} /> Add
          </button>
        </form>

        {/* Filters */}
        <div className="flex bg-rose-100/30 p-1 rounded-xl self-start sm:self-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'remaining', label: 'Unfinished' },
            { id: 'completed', label: 'Completed' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-500 hover:text-rose-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Completion Modal/Form Overlay */}
      <AnimatePresence>
        {completingItemId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-rose-100 w-full max-w-sm text-left space-y-4"
            >
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">Check off this milestone!</h3>
                <p className="text-xs text-gray-400 mt-0.5">Add a quick memory note of how it went.</p>
              </div>
              <textarea
                value={completionNote}
                onChange={(e) => setCompletionNote(e.target.value)}
                placeholder="e.g., We did this in Paris! It was raining but it was the best day ever."
                rows={3}
                className="w-full px-3 py-2 border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs bg-rose-50/10 resize-none"
              />
              <div className="flex justify-end gap-2 text-xs font-medium">
                <button
                  onClick={() => setCompletingItemId(null)}
                  className="px-3 py-1.5 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submitCompletion}
                  className="px-3.5 py-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-sm cursor-pointer"
                >
                  Complete Dream
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bucket List Items list */}
      <div className="bg-white rounded-2xl border border-rose-50/50 overflow-hidden divide-y divide-rose-50/40 text-left shadow-sm">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Milestone className="mx-auto w-10 h-10 text-rose-100" />
            <p className="text-sm mt-3">No bucket list items found in this filter.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 flex items-start justify-between gap-4 group"
              >
                {/* Tick and title */}
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => item.completed ? handleUncheck(item.id) : startCompleting(item.id)}
                    className="mt-0.5 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                  >
                    {item.completed ? (
                      <CheckSquare size={20} className="fill-rose-50 text-rose-600" />
                    ) : (
                      <Square size={20} className="text-gray-300 hover:text-rose-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <span className={`text-sm font-medium leading-relaxed ${
                      item.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                    }`}>
                      {item.title}
                    </span>

                    {/* Completion Note & Date */}
                    {item.completed && (
                      <div className="bg-rose-50/40 border-l-2 border-rose-300 pl-2 py-1 text-xs text-gray-500">
                        {item.note && <p className="italic font-medium text-gray-600">"{item.note}"</p>}
                        <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block mt-0.5">
                          Achieved on {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : 'Anniversary'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
                  title="Delete bucket item"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
