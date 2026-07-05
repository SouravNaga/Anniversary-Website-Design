import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, CheckCircle2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_SOCIAL_POSTS, SocialPost } from '../data/memoriesData';

interface SocialFeedProps {
  isLight: boolean;
}

export default function SocialFeed({ isLight }: SocialFeedProps) {
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('love_hub_social_posts');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
  });

  // Keep track of comment input fields for each post ID
  const [commentNames, setCommentNames] = useState<Record<string, string>>({});
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem('love_hub_social_posts', JSON.stringify(posts));
  }, [posts]);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLikedByUser;
          return {
            ...post,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
            isLikedByUser: isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const name = commentNames[postId]?.trim() || 'Anonymous';
    const text = commentTexts[postId]?.trim();

    if (!text) return;

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c-${Date.now()}`,
                author: name,
                text: text,
                date: new Date().toISOString().split('T')[0],
              },
            ],
          };
        }
        return post;
      })
    );

    // Clear text input
    setCommentTexts(prev => ({ ...prev, [postId]: '' }));
    // Retain name input for next comments
  };

  const handleShare = (postCaption: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Ekta & Amit Memory Feed',
        text: postCaption,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      // Fallback
      alert('Copied link of this sweet memory to your clipboard!');
    }
  };

  return (
    <section id="social-section" className="py-12 border-t border-rose-100/10 scroll-mt-20">
      <div className="text-center space-y-2 mb-10">
        <span className={`text-xs font-mono tracking-[0.2em] uppercase ${isLight ? 'text-rose-500 font-semibold' : 'text-amber-500'}`}>
          SOCIAL TIME CAPSULE
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          Our Insta-Feed Highlights
        </h2>
        <p className={`text-xs md:text-sm max-w-lg mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          Leave comments and likes. These reactions persist in your live database forever!
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-12">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`rounded-3xl border overflow-hidden ${
              isLight
                ? 'bg-white border-rose-100 shadow-[0_10px_35px_rgba(225,29,72,0.03)]'
                : 'bg-[#151515] border-amber-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
            }`}
          >
            {/* Post Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-rose-100/10">
              <div className="flex items-center gap-3">
                {/* Custom Avatar with initials */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                  isLight ? 'bg-rose-100 text-rose-700' : 'bg-amber-500/15 text-amber-500'
                }`}>
                  EE
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-bold tracking-tight">
                      ekta.and.amit
                    </span>
                    <CheckCircle2 size={13} className={`fill-current ${isLight ? 'text-rose-500' : 'text-amber-500'}`} />
                  </div>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1 font-mono">
                    📍 Memory of {post.year}
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold ${
                isLight ? 'bg-rose-50 text-rose-700' : 'bg-amber-500/10 text-amber-500'
              }`}>
                YEAR {post.year}
              </span>
            </div>

            {/* Post Image Container */}
            <div className="relative aspect-square w-full bg-black overflow-hidden group">
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>

            {/* Post Actions */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="group transition-transform active:scale-95 cursor-pointer"
                  >
                    <Heart
                      size={24}
                      className={`transition-colors duration-200 ${
                        post.isLikedByUser
                          ? 'text-red-500 fill-red-500'
                          : isLight
                          ? 'text-gray-700 hover:text-red-500'
                          : 'text-gray-300 hover:text-red-400'
                      }`}
                    />
                  </button>
                  <button className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
                    <MessageCircle size={24} className={isLight ? 'text-gray-700' : 'text-gray-300'} />
                  </button>
                  <button
                    onClick={() => handleShare(post.caption)}
                    className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Share2 size={22} className={isLight ? 'text-gray-700' : 'text-gray-300'} />
                  </button>
                </div>

                <span className="text-[10px] font-mono text-gray-400">
                  Anniversary Edition
                </span>
              </div>

              {/* Likes & Caption */}
              <div className="space-y-1 text-left">
                <p className="text-xs sm:text-sm font-bold">
                  {post.likes} likes
                </p>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  <span className="font-bold mr-1.5 text-gray-950 dark:text-white">ekta.and.amit</span>
                  {post.caption}
                </p>
              </div>

              {/* Comments Section */}
              <div className="border-t border-rose-100/10 pt-4 space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase block text-left">
                  Comments ({post.comments.length})
                </span>

                <div className="max-h-40 overflow-y-auto space-y-2 pr-1 scrollbar-none text-left">
                  <AnimatePresence>
                    {post.comments.map(c => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-2.5 rounded-xl border text-xs flex justify-between gap-2 ${
                          isLight ? 'bg-rose-50/35 border-rose-100/50' : 'bg-black/30 border-amber-500/5'
                        }`}
                      >
                        <div>
                          <span className={`font-bold mr-1.5 ${isLight ? 'text-rose-700' : 'text-amber-500'}`}>{c.author}:</span>
                          <span className={isLight ? 'text-gray-600' : 'text-gray-300'}>{c.text}</span>
                        </div>
                        <span className="text-[9px] text-gray-500 font-mono flex-shrink-0 self-center">
                          {c.date}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Comment Submission Form */}
                <form
                  onSubmit={(e) => handleAddComment(post.id, e)}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2"
                >
                  <input
                    type="text"
                    value={commentNames[post.id] || ''}
                    onChange={e => setCommentNames(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Your Name..."
                    className={`col-span-1 sm:col-span-4 px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                      isLight
                        ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10'
                        : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-white'
                    }`}
                  />
                  <div className="col-span-1 sm:col-span-8 flex gap-2">
                    <input
                      type="text"
                      value={commentTexts[post.id] || ''}
                      onChange={e => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Write a sweet comment..."
                      required
                      className={`flex-1 px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 ${
                        isLight
                          ? 'border-rose-100 focus:ring-rose-400 bg-rose-50/10'
                          : 'border-amber-500/10 focus:ring-amber-500/40 bg-black/40 text-white'
                      }`}
                    />
                    <button
                      type="submit"
                      className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isLight ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-amber-500 text-black hover:bg-amber-600'
                      }`}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
