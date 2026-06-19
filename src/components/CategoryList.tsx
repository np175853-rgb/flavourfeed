import React from 'react';
import { Sun, Utensils, Moon, Soup, Flame, Clock, Heart, Zap, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/recipes';

interface CategoryListProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
  setActiveTab
}: CategoryListProps) {
  // Map string name to a Lucide icon component
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Moon':
        return <Moon className="w-5 h-5" />;
      case 'Heart':
        return <Heart className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // toggle off
    } else {
      setSelectedCategory(categoryName);
      setActiveTab('recipes'); // jump to recipe tab with filter active
    }
  };

  return (
    <div className="my-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">What are you craving?</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-accent">Featured Categories 🍲</h2>
        </div>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-3 group ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/10 scale-105'
                  : 'bg-white hover:bg-secondary/20 border-gray-100 hover:border-primary/20 hover:shadow-xs'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-primary/5 text-primary group-hover:scale-110'
                }`}
              >
                {renderIcon(cat.icon)}
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide">{cat.name}</h3>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                  {cat.count} Recipes
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
