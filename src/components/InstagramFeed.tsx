import React, { useEffect, useState, useRef } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

interface InstaPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
  caption: string;
  link: string;
}

const INSTA_POSTS: InstaPost[] = [
  {
    id: 'insta-1',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=500',
    likes: '1.2k',
    comments: '42',
    caption: 'blistering sweet cherry tomatoes for the 15-minute quick rigatoni ✨ al dente or nothing! Recipe link in bio #viral #cookingreels',
    link: 'https://instagram.com/flavorfeed'
  },
  {
    id: 'insta-2',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=500',
    likes: '2.4k',
    comments: '88',
    caption: 'Whipped avocado toast with microgreens & chili pepper flakes 🥑 camera-ready morning fuel!',
    link: 'https://instagram.com/flavorfeed'
  },
  {
    id: 'insta-3',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=500',
    likes: '942',
    comments: '31',
    caption: 'Matcha berry layered pudding morning routine. The secret is refrigerating it overnight! 🍵🍓 #aesthetic #veganrecipes',
    link: 'https://instagram.com/flavorfeed'
  },
  {
    id: 'insta-4',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500',
    likes: '3.1k',
    comments: '112',
    caption: 'Behind the scenes at FlavorFeed! Testing out the Sony Alpha 7 with direct lighting diffusers 📷 tag a friend who loves photography tips!',
    link: 'https://instagram.com/flavorfeed'
  },
  {
    id: 'insta-5',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500',
    likes: '1.8k',
    comments: '64',
    caption: 'Molten chocolate fudge lava cake with frozen winter raspberries. Liquid gold centers 🌋🍫',
    link: 'https://instagram.com/flavorfeed'
  },
  {
    id: 'insta-6',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=500',
    likes: '1.5k',
    comments: '40',
    caption: 'Crunchy lemongrass roasted tofu block before stuffing into our Banh Mi baguettes! Deep char magic.',
    link: 'https://instagram.com/flavorfeed'
  }
];

export default function InstagramFeed() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scrolling image slider animation loop
  useEffect(() => {
    let animationId: number;

    const scrollLoop = () => {
      if (!isPaused && containerRef.current) {
        const container = containerRef.current;
        // Scroll continuous right
        container.scrollLeft += 0.8;

        // Reset if we reach the end duplicate items
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scrollLoop);
    };

    animationId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <div className="my-16 border-t border-gray-100 pt-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
          <Instagram className="w-3.5 h-3.5" />
          Instagram Gallery
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-accent">Join Our Culinary Diary</h2>
        <p className="text-xs sm:text-sm text-gray-500 font-light mt-2">
          Step into our visual kitchen! Scan daily recipes, food reviews, and aesthetic bts updates on our feed <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">@flavorfeed</a>.
        </p>
      </div>

      {/* Auto-scrolling image slider */}
      <div className="relative">
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex overflow-x-auto no-scrollbar py-2 cursor-grab select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Double map to create seamless continuous looping scroll */}
          {[...INSTA_POSTS, ...INSTA_POSTS].map((post, idx) => (
            <div
              key={`${post.id}-${idx}`}
              className="w-56 sm:w-64 flex-shrink-0 px-3 relative block group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-xs border border-gray-100">
                <img
                  src={post.image}
                  alt="FlavorFeed Social Content"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Hover glass panel */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-end">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                      title="Follow Instagram link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] text-gray-200 line-clamp-3 font-light leading-relaxed">
                      {post.caption}
                    </p>
                    <div className="flex gap-4 text-xs font-bold pt-2 border-t border-white/10">
                      <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> {post.likes}</span>
                      <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5 fill-white text-white" /> {post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle blur fades at edges for gorgeous aesthetics */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none hidden sm:block" />
      </div>
    </div>
  );
}
