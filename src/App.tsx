import React, { useState, useEffect } from 'react';
import { Bookmark, Sparkles, BookOpen, Clock, Heart, Flame } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryList from './components/CategoryList';
import TrendingCarousel from './components/TrendingCarousel';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import RecipeDetailsView from './components/RecipeDetailsView';
import RecipesListView from './components/RecipesListView';
import PhotographyView from './components/PhotographyView';
import BlogView from './components/BlogView';
import { RECIPES } from './data/recipes';
import { BLOGS } from './data/blogs';
import { Recipe } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Persistent bookmarked recipes state via localStorage
  const [savedRecipes, setSavedRecipes] = useState<string[]>(() => {
    const saved = localStorage.getItem('ff_saved_recipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ff_saved_recipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const toggleSaveRecipe = (id: string) => {
    setSavedRecipes(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleSaveRecipeEvent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleSaveRecipe(id);
  };

  const handleSelectRecipe = (id: string) => {
    setSelectedRecipeId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find selected recipe details
  const currentRecipe = RECIPES.find(r => r.id === selectedRecipeId);

  // The featured recipe
  const featuredRecipe = RECIPES.find(r => r.isFeatured) || RECIPES[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Structural Meta SEO Markup */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li><a href="/">Home</a></li>
          {activeTab !== 'home' && <li><a href={`#${activeTab}`}>{activeTab}</a></li>}
          {selectedRecipeId && <li>Recipe: {selectedRecipeId}</li>}
        </ol>
      </nav>

      {/* Navigation Layer */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedRecipeId(null); // Clear selected recipe when clicking main tabs
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectRecipe={handleSelectRecipe}
        savedRecipes={savedRecipes}
        toggleSaveRecipe={toggleSaveRecipe}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {currentRecipe ? (
          /* Active Recipe Full Specification screen */
          <RecipeDetailsView
            recipe={currentRecipe}
            onBack={() => setSelectedRecipeId(null)}
            isSaved={savedRecipes.includes(currentRecipe.id)}
            toggleSave={toggleSaveRecipe}
          />
        ) : (
          /* Main tab display systems */
          <>
            {activeTab === 'home' && (
              <div className="space-y-12 animate-fadeIn">
                {/* Visual Opening Section */}
                <HeroSection
                  featuredRecipe={featuredRecipe}
                  onSelectRecipe={handleSelectRecipe}
                  isSaved={savedRecipes.includes(featuredRecipe.id)}
                  toggleSave={toggleSaveRecipeEvent}
                />

                {/* Categories capsules */}
                <CategoryList
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setActiveTab={setActiveTab}
                />

                {/* Trending Carousels slider */}
                <TrendingCarousel
                  recipes={RECIPES}
                  onSelectRecipe={handleSelectRecipe}
                  savedRecipes={savedRecipes}
                  toggleSave={toggleSaveRecipeEvent}
                />

                {/* Featured Blog previews row */}
                <div className="my-16">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Creator Insight logs</span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-accent">Latest Culinary Journal Articles ✍️</h2>
                    </div>
                    <button
                      onClick={() => setActiveTab('blog')}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Browse full Journal →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOGS.slice(0, 3).map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => setActiveTab('blog')}
                        className="bg-white border border-gray-100 rounded-3xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <img
                            src={blog.image}
                            alt=""
                            className="w-full h-40 object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-300"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/5 px-2.5 py-0.5 rounded-full">
                              {blog.category}
                            </span>
                            <h3 className="text-base font-serif font-bold text-accent mt-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-light mt-1.5 line-clamp-2">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-50 text-[10px] text-gray-400 font-semibold">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Auto-Scroller Instagram Grid */}
                <InstagramFeed />
              </div>
            )}

            {activeTab === 'recipes' && (
              <RecipesListView
                onSelectRecipe={handleSelectRecipe}
                savedRecipes={savedRecipes}
                toggleSave={toggleSaveRecipeEvent}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {activeTab === 'photography' && (
              <PhotographyView />
            )}

            {activeTab === 'blog' && (
              <BlogView />
            )}
          </>
        )}
      </main>

      {/* Global Aesthetic Footer with Newsletter input */}
      <Footer />
    </div>
  );
}
