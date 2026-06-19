import React, { useState } from 'react';
import { Search, Heart, Star, Clock, Sparkles } from 'lucide-react';
import { RECIPES } from '../data/recipes';
import { Recipe, DietType, DifficultyLevel } from '../types';

interface RecipesListViewProps {
  onSelectRecipe: (id: string) => void;
  savedRecipes: string[];
  toggleSave: (e: React.MouseEvent, id: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function RecipesListView({
  onSelectRecipe,
  savedRecipes,
  toggleSave,
  selectedCategory,
  setSelectedCategory
}: RecipesListViewProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietType | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'prepTime' | 'title'>('rating');

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Healthy Recipes', 'Quick Meals'];
  const diets: (DietType | 'All')[] = ['All', 'Vegan', 'Vegetarian', 'Gluten-Free'];
  const difficulties: (DifficultyLevel | 'All')[] = ['All', 'Easy', 'Medium', 'Hard'];

  // Deep combined filtering
  const filteredRecipes = RECIPES.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(localSearch.toLowerCase()) ||
                          r.description.toLowerCase().includes(localSearch.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || r.category === selectedCategory;
    const matchesDiet = selectedDiet === 'All' || r.diet === selectedDiet;
    const matchesDifficulty = selectedDifficulty === 'All' || r.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDiet && matchesDifficulty;
  });

  // Sorting
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'prepTime') return (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime);
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro details */}
      <div className="text-left space-y-2 max-w-2xl">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Gourmet Directory</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-accent">Discover Exquisite Recipes</h1>
        <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
          Search over dozens of styled dishes. Filter by preparation times, dietary constraints, or difficulty levels to match your cooking skills perfectly.
        </p>
      </div>

      {/* Directory Searching bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-gray-50/50 p-4 border border-gray-100 rounded-3xl">
        {/* Input */}
        <div className="md:col-span-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search sourdough, chocolate cake, healthy salads..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="block w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 font-light"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-[9px] text-gray-400 uppercase font-bold mb-1">Sorting Rank</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="block w-full text-xs p-2 bg-white border border-gray-200 rounded-xl focus:outline-none text-accent"
          >
            <option value="rating">★ Highest Customer Stars</option>
            <option value="prepTime">⏱️ Shortest Cooking + Prep</option>
            <option value="title">🔤 Alphabetical Name (A-Z)</option>
          </select>
        </div>

        {/* Action reset */}
        <div className="flex justify-end">
          {(localSearch || selectedCategory || selectedDiet !== 'All' || selectedDifficulty !== 'All') && (
            <button
              onClick={() => {
                setLocalSearch('');
                setSelectedCategory(null);
                setSelectedDiet('All');
                setSelectedDifficulty('All');
                setSortBy('rating');
              }}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer py-2 pr-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Quick Category filter buttons row */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-2">Filter by Category</span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((c) => {
              const matchesSelection = (!selectedCategory && c === 'All') || selectedCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c === 'All' ? null : c)}
                  className={`px-4.5 py-1.5 text-xs font-semibold rounded-full border transition-all flex-shrink-0 cursor-pointer ${
                    matchesSelection
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-primary/20 hover:text-primary'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Diets and difficulties side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Diets selection */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-2">Dietary Restrictions</span>
            <div className="flex flex-wrap gap-2">
              {diets.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiet(d)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                    selectedDiet === d
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulties selection */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-2">Skill Level required</span>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid count display */}
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-xs text-gray-400">
          Showing <span className="font-bold text-accent">{sortedRecipes.length}</span> verified recipes
        </span>
      </div>

      {/* Grid listing */}
      {sortedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRecipes.map((recipe) => {
            const isSaved = savedRecipes.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden group shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Cover */}
                <div
                  className="h-48 relative overflow-hidden cursor-pointer"
                  onClick={() => onSelectRecipe(recipe.id)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                    <span className="bg-white/90 backdrop-blur-md text-accent text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {recipe.difficulty}
                    </span>
                    {recipe.diet !== 'None' && (
                      <span className="bg-white/95 backdrop-blur-sm text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {recipe.diet}
                      </span>
                    )}
                  </div>

                  {/* Save toggle */}
                  <button
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

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                      {recipe.category}
                    </span>
                    <h3
                      onClick={() => onSelectRecipe(recipe.id)}
                      className="text-base font-serif font-bold text-accent mt-1 leading-snug line-clamp-2 hover:text-primary cursor-pointer transition-all"
                    >
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-light mt-1.5 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Stats foot */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-xs">
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
      ) : (
        <div className="p-16 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl">
          <div className="text-2xl mb-2">🍽️</div>
          <h3 className="text-sm font-bold text-accent">No Recipes Match Your Filters</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Try resetting the difficulty or selecting an "All" option to find recipes.</p>
        </div>
      )}
    </div>
  );
}
