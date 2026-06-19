import React, { useRef } from 'react';
import { Clock, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';

interface TrendingCarouselProps {
  recipes: Recipe[];
  onSelectRecipe: (id: string) => void;
  savedRecipes: string[];
  toggleSave: (e: React.MouseEvent, id: string) => void;
}

export default function TrendingCarousel({
  recipes,
  onSelectRecipe,
  savedRecipes,
  toggleSave
}: TrendingCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trendingRecipes = recipes.filter(r => r.isTrending);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="my-12 relative">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Social Feed Favorites</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-accent">Trending Recipes 🔥</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-100 hover:text-primary transition-all active:scale-90 cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-100 hover:text-primary transition-all active:scale-90 cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel list wrapper */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trendingRecipes.map(recipe => {
          const isSaved = savedRecipes.includes(recipe.id);
          return (
            <div
              key={recipe.id}
              className="w-72 sm:w-80 flex-shrink-0 bg-white border border-gray-100 rounded-3xl overflow-hidden group shadow-xs hover:shadow-lg transition-all duration-300 snap-start flex flex-col justify-between"
            >
              {/* Media Container */}
              <div
                className="h-48 relative overflow-hidden cursor-pointer"
                onClick={() => onSelectRecipe(recipe.id)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Diet Badge */}
                {recipe.diet !== 'None' && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 uppercase">
                    {recipe.diet}
                  </span>
                )}

                {/* Save Heart Overlap */}
                <button
                  id={`save-btn-${recipe.id}`}
                  onClick={(e) => toggleSave(e, recipe.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-primary text-white scale-110 shadow-md'
                      : 'bg-white/80 text-gray-500 hover:bg-white hover:text-primary'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Core Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                    {recipe.category}
                  </span>
                  <h3
                    onClick={() => onSelectRecipe(recipe.id)}
                    className="text-base sm:text-lg font-serif font-semibold text-accent mt-1 leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-2"
                  >
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-2 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>

                {/* Footer Metrics */}
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-50 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{recipe.prepTime + recipe.cookTime} mins</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-accent">{recipe.rating}</span>
                    <span className="text-gray-400 text-[10px]">({recipe.reviewsCount})</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
