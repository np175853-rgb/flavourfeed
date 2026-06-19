import React, { useState } from 'react';
import { Calendar, User, Heart, Share2, ArrowLeft, Twitter, Facebook, ExternalLink, MessageSquare } from 'lucide-react';
import { BLOGS } from '../data/blogs';
import { BlogPost } from '../types';

export default function BlogView() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [postLikes, setPostLikes] = useState<Record<string, { count: number; active: boolean }>>(() => {
    const initial: Record<string, { count: number; active: boolean }> = {};
    BLOGS.forEach(b => {
      initial[b.id] = { count: b.likes, active: false };
    });
    return initial;
  });

  const [shareToast, setShareToast] = useState(false);

  // Categories requested in PRD
  const categories = ['All', 'Recipes', 'Food Reviews', 'Restaurant Guides', 'Healthy Eating', 'Cooking Tips', 'Viral Food Trends'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOGS
    : BLOGS.filter(p => p.category === selectedCategory);

  const handleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setPostLikes(prev => {
      const current = prev[postId] || { count: 0, active: false };
      return {
        ...prev,
        [postId]: {
          count: current.active ? current.count - 1 : current.count + 1,
          active: !current.active
        }
      };
    });
  };

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto my-8">
      {shareToast && (
        <div className="fixed top-24 right-4 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-full z-50 shadow-lg animate-bounce">
          🔗 Post link copied! Share with your food circles.
        </div>
      )}

      {selectedPost ? (
        /* Full Article reading viewport with clean elegant typography */
        <div className="max-w-3xl mx-auto py-4 animate-fadeIn">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold text-accent hover:text-primary transition-all border border-gray-100 rounded-full hover:bg-gray-55 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </button>

          {/* Editorial Content header */}
          <article className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full inline-block">
                {selectedPost.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-accent leading-tight">
                {selectedPost.title}
              </h1>

              {/* Publisher metadata card */}
              <div className="flex flex-wrap items-center gap-4 py-4 border-b border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedPost.authorAvatar}
                    className="w-9 h-9 rounded-full object-cover"
                    alt={selectedPost.author}
                  />
                  <div className="text-xs font-semibold text-accent">{selectedPost.author}</div>
                </div>

                <span className="text-gray-300">•</span>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-light">
                  <Calendar className="w-4.5 h-4.5" />
                  <span>{selectedPost.date}</span>
                </div>

                <span className="text-gray-300">•</span>

                <span className="text-xs font-semibold text-primary uppercase bg-orange-50 px-2.5 py-0.5 rounded-md">
                  {selectedPost.readTime}
                </span>
              </div>
            </div>

            {/* Main high resolution photoround */}
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={selectedPost.image}
                className="w-full h-full object-cover"
                alt={selectedPost.title}
              />
            </div>

            {/* Pure reading markup section with high readability typography */}
            <div className="prose prose-orange max-w-none text-gray-700 leading-relaxed text-sm sm:text-base space-y-6 font-light">
              {selectedPost.content.split('\n\n').map((para, i) => {
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-xl font-serif font-black text-accent pt-4 border-b border-gray-50 pb-1.5">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }
                if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ') || para.startsWith('4. ')) {
                  return (
                    <div key={i} className="pl-4 border-l-2 border-primary/40 py-1 bg-primary/2 rounded-r-xl p-3 my-3">
                      <p className="font-medium text-accent">{para}</p>
                    </div>
                  );
                }
                return (
                  <p key={i} className="whitespace-pre-line leading-relaxed">
                    {para.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                );
              })}
            </div>

            {/* Social sharing widget and interaction metrics */}
            <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 sm:p-6 rounded-3xl border border-gray-100 mt-12">
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleLike(e, selectedPost.id)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold transition-all cursor-pointer ${
                    postLikes[selectedPost.id]?.active
                      ? 'bg-rose-50 border-rose-100 text-rose-500 scale-105'
                      : 'bg-white border-gray-100 text-gray-500 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${postLikes[selectedPost.id]?.active ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{postLikes[selectedPost.id]?.count ?? selectedPost.likes} Votes</span>
                </button>
                <span className="text-xs text-gray-400 font-light">• 98% positive sentiment</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Share:</span>
                <button
                  onClick={() => handleShare(selectedPost.title)}
                  className="p-2 bg-white border border-gray-200 hover:text-primary transition-colors hover:scale-105 rounded-full text-gray-400"
                  title="Copy Link share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-white border border-gray-200 hover:text-cyan-500 transition-colors hover:scale-105 rounded-full text-gray-400"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-white border border-gray-200 hover:text-blue-600 transition-colors hover:scale-105 rounded-full text-gray-400"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      ) : (
        /* Blog grid with beautiful list catalog filters */
        <div className="space-y-8 animate-fadeIn">
          {/* Header summary */}
          <div className="text-left space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">The Taste Journal</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-accent">Food Trends & Aromatic Lifestyle</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
              Explore reviews of stunning cafés, behind the scenes baking walkthroughs, food styling photography codes, and quick recipes from our global authors directory.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-3 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-1.5 text-xs font-semibold rounded-full border transition-all flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-primary/20 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid listing */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const likedInfo = postLikes[post.id] || { count: post.likes, active: false };
                return (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    {/* Media */}
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      />
                      <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {post.category}
                      </span>
                    </div>

                    {/* Content details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-serif font-bold text-accent group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Info bar footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorAvatar}
                            className="w-6 h-6 rounded-full object-cover"
                            alt=""
                          />
                          <span className="text-[10px] font-semibold text-accent">{post.author}</span>
                        </div>

                        {/* Likes action */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => handleLike(e, post.id)}
                            className={`flex items-center gap-1.5 text-xs font-bold p-1 rounded-full px-2.5 ${
                              likedInfo.active ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:text-rose-500'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedInfo.active ? 'fill-rose-500' : ''}`} />
                            <span className="text-[10px]">{likedInfo.count}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="p-16 text-center text-sm text-gray-400 bg-gray-50 rounded-2xl">
              No articles registered in "{selectedCategory}" at this time. Read our other guides instead!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
