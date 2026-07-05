import React, { useState } from 'react';
import { Camera, Calendar, Tag, Plus, X, Heart, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Memory } from '../types';

interface MemoryGalleryProps {
  memories: Memory[];
  onAddMemory: (newMemory: Omit<Memory, 'id' | 'createdAt'>) => void;
  onDeleteMemory: (id: string) => void;
}

const CATEGORIES = ['All', 'Firsts', 'Trips', 'Anniversaries', 'Everyday'];

const TEMPLATE_IMAGES = [
  { name: 'Warm Hug', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80' },
  { name: 'Sunset Date', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80' },
  { name: 'Coffee Together', url: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600&auto=format&fit=crop&q=80' },
  { name: 'Hold Hands', url: 'https://images.unsplash.com/photo-1494972308805-463bc619b34e?w=600&auto=format&fit=crop&q=80' },
];

export default function MemoryGallery({ memories, onAddMemory, onDeleteMemory }: MemoryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Everyday');
  const [description, setDescription] = useState('');
  const [imageType, setImageType] = useState<'upload' | 'template'>('template');
  const [templateUrl, setTemplateUrl] = useState(TEMPLATE_IMAGES[0].url);
  const [uploadedBase64, setUploadedBase64] = useState('');

  const filteredMemories = selectedCategory === 'All'
    ? memories
    : memories.filter(m => m.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const selectedImage = imageType === 'upload' ? (uploadedBase64 || TEMPLATE_IMAGES[0].url) : templateUrl;

    onAddMemory({
      title: title.trim(),
      date,
      category,
      description: description.trim(),
      image: selectedImage,
    });

    // Reset and close
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Everyday');
    setDescription('');
    setUploadedBase64('');
    setImageType('template');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8" id="memory-gallery">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="text-rose-500" />
            Our Memory Lane
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Capturing the beautiful, messy, and sweet chapters of us.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} /> Add Memory
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-rose-100/40">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-rose-50/50 border border-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Memories */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-rose-200">
          <ImageIcon className="mx-auto w-12 h-12 text-rose-200" />
          <h3 className="mt-4 font-serif text-lg font-medium text-gray-800">No memories in this category yet</h3>
          <p className="text-xs text-gray-400 mt-1">Start painting your story by clicking "Add Memory"!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((memory) => (
              <motion.div
                key={memory.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-50/50 hover:shadow-md transition-all flex flex-col group relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => onDeleteMemory(memory.id)}
                  className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 hover:bg-white text-gray-400 hover:text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove memory"
                >
                  <X size={14} />
                </button>

                {/* Cover Image */}
                <div className="relative h-48 bg-rose-50/40 overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider">
                    <Tag size={10} className="text-rose-400" />
                    {memory.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-1.5 font-medium">
                      <Calendar size={12} />
                      {new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {memory.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {memory.description}
                    </p>
                  </div>

                  <div className="flex justify-end pt-4 mt-4 border-t border-rose-50/40">
                    <div className="flex items-center gap-1 text-rose-500 font-semibold text-[10px] uppercase tracking-wider">
                      <Heart size={10} className="fill-rose-500" />
                      Loved Moment
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-xl relative z-10 overflow-hidden border border-rose-100 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-rose-50 flex items-center justify-between bg-gradient-to-r from-rose-50/50 to-pink-50/30">
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900">Add to Memory Lane</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Capture another beautiful piece of our story</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-rose-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-left">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., The Day We Found Our Secret Café"
                    className="w-full px-4 py-2.5 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-sm"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-sm"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Story / Note</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe what made this moment special, what you did, or how you felt..."
                    className="w-full px-4 py-2.5 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-rose-50/10 text-sm resize-none"
                  />
                </div>

                {/* Image Section */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Cover Image</label>
                  <div className="flex gap-4 mb-3 border-b border-rose-50/50 pb-2">
                    <button
                      type="button"
                      onClick={() => setImageType('template')}
                      className={`text-xs font-semibold pb-1 border-b-2 transition-all cursor-pointer ${
                        imageType === 'template'
                          ? 'border-rose-500 text-rose-600'
                          : 'border-transparent text-gray-400'
                      }`}
                    >
                      Choose Aesthetic Cover
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageType('upload')}
                      className={`text-xs font-semibold pb-1 border-b-2 transition-all cursor-pointer ${
                        imageType === 'upload'
                          ? 'border-rose-500 text-rose-600'
                          : 'border-transparent text-gray-400'
                      }`}
                    >
                      Upload Photo
                    </button>
                  </div>

                  {imageType === 'template' ? (
                    <div className="grid grid-cols-4 gap-2">
                      {TEMPLATE_IMAGES.map(img => (
                        <button
                          key={img.url}
                          type="button"
                          onClick={() => setTemplateUrl(img.url)}
                          className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            templateUrl === img.url ? 'border-rose-500 scale-95 shadow-sm' : 'border-transparent opacity-80'
                          }`}
                        >
                          <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                      />
                      {uploadedBase64 && (
                        <div className="relative h-20 w-32 rounded-lg overflow-hidden border border-rose-100">
                          <img src={uploadedBase64} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-rose-50">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-100 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    Add Moment
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
