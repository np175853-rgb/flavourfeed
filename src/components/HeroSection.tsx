import React from 'react';
import { Clock, ChefHat, Heart, Flame } from 'lucide-react';
import { Recipe } from '../types';

interface HeroSectionProps {
  featuredRecipe: Recipe;
  onSelectRecipe: (recipeId: string) => void;
  isSaved: boolean;
  toggleSave: (e: React.MouseEvent, id: string) => void;
}

export default function HeroSection({
  featuredRecipe,
  onSelectRecipe,
  isSaved,
  toggleSave
}: HeroSectionProps) {
  return (
    <div className="relative bg-secondary/30 rounded-3xl overflow-hidden mt-6 mb-12 border border-secondary/50">
      <div className="absolute top-5 left-5 z-20">
        <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest text-white uppercase bg-primary shadow-md">
          <Flame className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
          Recipe of the Week
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
        {/* Left Side: Cooking Detail */}
        <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
              {featuredRecipe.category}
            </span>
            {featuredRecipe.diet !== 'None' && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                {featuredRecipe.diet}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-accent leading-tight">
            {featuredRecipe.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            {featuredRecipe.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-primary/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-medium uppercase">Prep</span>
                <span className="text-xs font-bold text-accent">{featuredRecipe.prepTime} mins</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-medium uppercase">Cook</span>
                <span className="text-xs font-bold text-accent">{featuredRecipe.cookTime} mins</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary font-bold">
                🍳
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-medium uppercase">Serve</span>
                <span className="text-xs font-bold text-accent">{featuredRecipe.servings} portions</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary">
                📊
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-medium uppercase">Rating</span>
                <span className="text-xs font-bold text-accent">{featuredRecipe.rating} ★ ({featuredRecipe.reviewsCount})</span>
              </div>
            </div>
          </div>

          {/* CTA & Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-view-recipe-cta"
              onClick={() => onSelectRecipe(featuredRecipe.id)}
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              Start Cooking Now
            </button>
            <button
              id="hero-save-recipe-icon-btn"
              onClick={(e) => toggleSave(e, featuredRecipe.id)}
              className={`p-3 rounded-full border border-gray-200 flex items-center justify-center transition-all bg-white hover:bg-primary/5 cursor-pointer ${
                isSaved ? 'text-primary border-primary/20' : 'text-gray-400 hover:text-primary'
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-primary' : ''}`} />
            </button>
          </div>

          {/* Author info */}
          <div className="flex items-center gap-3 pt-4">
            <img
              src={featuredRecipe.authorAvatar}
              alt={featuredRecipe.author}
              className="w-10 h-10 rounded-full border-2 border-white shadow-xs object-cover"
            />
            <div>
              <span className="block text-[10px] text-gray-400">Curated & Crafted by</span>
              <span className="text-xs font-semibold text-accent">{featuredRecipe.author}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Zooming Imagery Cover */}
        <div className="flex-1 min-h-[300px] lg:min-h-full relative overflow-hidden group">
          <img
            src={featuredRecipe.image}
            alt={featuredRecipe.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
            onClick={() => onSelectRecipe(featuredRecipe.id)}
          />
          {/* Subtle gradient overlay to fade content on small viewports */}
          <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent lg:hidden pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
