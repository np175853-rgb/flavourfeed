import React, { useState, useRef, useEffect } from 'react';
import { Search, Bookmark, Menu, X, Heart, Clock, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';
import { RECIPES } from '../data/recipes';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectRecipe: (recipeId: string) => void;
  savedRecipes: string[];
  toggleSaveRecipe: (id: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onSelectRecipe,
  savedRecipes,
  toggleSaveRecipe
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showBookmarksDropdown, setShowBookmarksDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const bookmarkRef = useRef<HTMLDivElement>(null);

  // Filter recipes for the search dropdown
  const filteredRecipes = searchQuery
    ? RECIPES.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.diet.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const savedRecipesObjects = RECIPES.filter(r => savedRecipes.includes(r.id));

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (bookmarkRef.current && !bookmarkRef.current.contains(event.target as Node)) {
        setShowBookmarksDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (recipeId: string) => {
    onSelectRecipe(recipeId);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'recipes', label: 'Recipes' },
    { id: 'photography', label: 'Photography' },
    { id: 'blog', label: 'Blog' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer select-none" onClick={() => setActiveTab('home')}>
            <span className="text-2xl font-serif font-black tracking-tight flex items-center gap-2">
              <span className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold font-sans text-lg">FF</span>
              <span>FlavorFeed<span className="text-primary font-sans font-bold">.</span></span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`text-sm font-medium tracking-wide transition-all py-2 relative cursor-pointer ${
                  activeTab === item.id
                    ? 'text-primary font-semibold'
                    : 'text-accent/70 hover:text-primary'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Right Side Activities (Search & Bookmarks) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Input */}
            <div ref={searchRef} className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="navbar-search-input"
                type="text"
                placeholder="Search recipes, healthy..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="block w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
              />

              {/* Search results dropdown */}
              {isSearchFocused && searchQuery && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-2 text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-gray-50/50">
                    Recipe Results
                  </div>
                  {filteredRecipes.length > 0 ? (
                    <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
                      {filteredRecipes.map(recipe => (
                        <div
                          key={recipe.id}
                          onClick={() => handleSearchResultClick(recipe.id)}
                          className="flex items-center gap-3 p-3 hover:bg-primary/5 cursor-pointer transition-colors"
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-accent leading-tight truncate">{recipe.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                              <span>{recipe.category}</span>
                              <span>•</span>
                              <span>{recipe.prepTime + recipe.cookTime} min</span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No recipes found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bookmarks Counter */}
            <div ref={bookmarkRef} className="relative">
              <button
                id="bookmarks-toggle-button"
                onClick={() => setShowBookmarksDropdown(!showBookmarksDropdown)}
                className="p-2 text-accent/80 hover:text-primary transition-colors relative cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <Bookmark className="h-5 w-5" />
                {savedRecipes.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-primary rounded-full transform translate-x-1.5 -translate-y-1.5">
                    {savedRecipes.length}
                  </span>
                )}
              </button>

              {/* Bookmarks dropdown */}
              {showBookmarksDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-55">
                    <span className="text-xs font-bold text-accent">Saved Recipes</span>
                    <span className="text-[10px] font-semibold text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full">{savedRecipes.length} items</span>
                  </div>
                  {savedRecipesObjects.length > 0 ? (
                    <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto no-scrollbar">
                      {savedRecipesObjects.map(recipe => (
                        <div
                          key={recipe.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 group transition-colors"
                        >
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0 cursor-pointer"
                            onClick={() => {
                              onSelectRecipe(recipe.id);
                              setShowBookmarksDropdown(false);
                            }}
                          />
                          <div className="min-w-0 flex-1 cursor-pointer" onClick={() => {
                            onSelectRecipe(recipe.id);
                            setShowBookmarksDropdown(false);
                          }}>
                            <h4 className="text-xs font-semibold text-accent leading-tight hover:text-primary transition-colors truncate">
                              {recipe.title}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400">
                              <Heart className="w-2.5 h-2.5 text-primary fill-primary" />
                              <span>{recipe.rating}</span>
                              <span>•</span>
                              <Clock className="w-2.5 h-2.5" />
                              <span>{recipe.prepTime + recipe.cookTime} m</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleSaveRecipe(recipe.id)}
                            className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Remove Saved"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-gray-400">
                      We found no saved recipes here. Explore home and hit the "Save Recipe" heart button!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => {
                setActiveTab('recipes');
                // quick search focus simulated
              }}
              className="p-1 px-2 border border-gray-100 rounded-full text-accent/60 flex items-center gap-1"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-[10px]">Filter</span>
            </button>
            <button
              id="mobile-menu-burger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-accent/80 hover:text-primary transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md py-4 px-6 space-y-4 shadow-inner transition-all duration-300">
          <div className="flex flex-col space-y-3">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`py-2 text-left text-sm font-semibold border-b border-gray-50 ${
                  activeTab === item.id ? 'text-primary pl-2 border-l-2 border-l-primary' : 'text-accent/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Saved Items Summary block inside mobile drawer */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs font-bold text-accent mb-2">
              <span className="flex items-center gap-1"><Bookmark className="w-4 h-4 text-primary" /> Saved Recipes</span>
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px]">{savedRecipes.length}</span>
            </div>
            {savedRecipesObjects.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto no-scrollbar">
                {savedRecipesObjects.map(recipe => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      onSelectRecipe(recipe.id);
                      setIsOpen(false);
                    }}
                    className="flex gap-2 items-center p-1.5 border border-gray-50 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <img src={recipe.image} alt="" className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
                    <span className="text-[10px] text-accent font-medium leading-tight line-clamp-1">{recipe.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-[11px] text-gray-400 font-light block pt-1">No bookmark saves yet.</span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
