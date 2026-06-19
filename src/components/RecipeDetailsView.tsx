import React, { useState } from 'react';
import { Clock, ChefHat, Heart, Printer, Share2, ArrowLeft, Star, Send, CheckCircle, Flame } from 'lucide-react';
import { Recipe, Comment } from '../types';

interface RecipeDetailsViewProps {
  recipe: Recipe;
  onBack: () => void;
  isSaved: boolean;
  toggleSave: (id: string) => void;
}

const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'rec-1': [
    { id: 'c1', author: 'Aria Malik', rating: 5, content: 'This tasted incredible! The jammy 6-min eggs were so sweet, and adding sesame black seeds of high quality was a marvelous hack!', date: 'Today' },
    { id: 'c2', author: 'Siddharth Sharma', rating: 4, content: 'Sourdough toast was crispy and delightful. Will make again as a quick office lunch!', date: 'Yesterday' }
  ],
  'rec-2': [
    { id: 'c3', author: 'Maya Rogers', rating: 5, content: 'Tahini sauce dressing is pure gold! Roasted spiced chickpeas stayed crisp all week.', date: '3 days ago' }
  ],
  'rec-3': [
    { id: 'c4', author: 'Devon Keats', rating: 5, content: 'Insanely fast! Literally done in 12 minutes flat and the garlic oil smelled brilliant.', date: 'June 10, 2026' }
  ],
  'rec-4': [
    { id: 'c5', author: 'Sarah Connor', rating: 5, content: 'Perfect crispy skin. Basting it in brown butter dill is a game-changing cooking technique.', date: 'June 15, 2026' }
  ],
  'rec-6': [
    { id: 'c6', author: 'Rohan Deshmukh', rating: 5, content: 'Lava cake melted exactly as promised! Make sure to take them out of the ramekin carefully!', date: 'Yesterday' }
  ]
};

export default function RecipeDetailsView({
  recipe,
  onBack,
  isSaved,
  toggleSave
}: RecipeDetailsViewProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Comments feed state
  const [commentsList, setCommentsList] = useState<Comment[]>(
    INITIAL_COMMENTS[recipe.id] || [
      { id: 'def-1', author: 'Gourmet Lover', rating: 5, content: 'Tried this yesterday and loved it. Flavor is spot on!', date: 'June 17, 2026' }
    ]
  );
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newRating, setNewRating] = useState(5);

  const [shareToast, setShareToast] = useState(false);
  const [printIndicator, setPrintIndicator] = useState(false);

  // Scaling logic helper
  const scaleRatio = servings / recipe.servings;

  const handleServingChange = (change: number) => {
    const nextVal = servings + change;
    if (nextVal >= 1 && nextVal <= 24) {
      setServings(nextVal);
    }
  };

  const toggleIngredient = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Trigger print view
  const handlePrint = () => {
    setPrintIndicator(true);
    setTimeout(() => {
      setPrintIndicator(false);
      window.print();
    }, 1200);
  };

  // Link copy sharing simulation
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    });
  };

  // Post comment review handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: newCommentName,
      rating: newRating,
      content: newCommentText,
      date: 'Just now'
    };

    setCommentsList(prev => [newComment, ...prev]);
    setNewCommentName('');
    setNewCommentText('');
    setNewRating(5);
  };

  const toggleLikeReview = (id: string) => {
    setLikedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatFraction = (amount: number) => {
    const rawVal = amount * scaleRatio;
    // Pretty format fractions
    if (rawVal === 0.5) return '1/2';
    if (rawVal === 0.25) return '1/4';
    if (rawVal === 0.75) return '3/4';
    if (rawVal % 1 === 0) return rawVal.toString();
    return rawVal.toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 sm:px-0">
      {/* Back navigation Row */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-xs font-semibold text-accent hover:text-primary transition-all border border-gray-100 rounded-full hover:bg-gray-50 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </button>

      {/* Share / Copy feedback banners */}
      {shareToast && (
        <div className="mb-6 p-3 bg-primary text-white text-xs font-semibold rounded-2xl flex items-center justify-between shadow-lg sticky top-24 z-50 animate-bounce">
          <span>🔗 Recipe URL copied to your clipboard! Share it with your friends!</span>
          <button onClick={() => setShareToast(false)} className="text-white font-bold px-2">✕</button>
        </div>
      )}

      {printIndicator && (
        <div className="mb-6 p-3 bg-accent text-white text-xs font-semibold rounded-2xl animate-pulse">
          🖨️ Generating printable recipe PDF... Please wait.
        </div>
      )}

      {/* Recipe Header Module */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl mb-10">
        <div className="h-64 sm:h-[450px] relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Floaters inside hero card */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white px-2.5 py-1 bg-primary rounded-md">
                {recipe.category}
              </span>
              {recipe.diet !== 'None' && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-white px-2.5 py-1 rounded-md">
                  {recipe.diet}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black">{recipe.title}</h1>
            <p className="text-xs sm:text-sm text-gray-200 mt-2 font-light line-clamp-2 max-w-2xl">{recipe.description}</p>
          </div>
        </div>

        {/* Action controls row */}
        <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <img
              src={recipe.authorAvatar}
              className="w-9 h-9 rounded-full object-cover border-2 border-white"
              alt={recipe.author}
            />
            <div className="text-xs">
              <span className="text-gray-400 block text-[10px]">Author</span>
              <span className="font-semibold text-accent">{recipe.author}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleSave(recipe.id)}
              className={`p-2.5 rounded-full border border-gray-200 flex items-center justify-center transition-all bg-white hover:bg-red-50 hover:text-red-500 cursor-pointer ${
                isSaved ? 'text-primary border-primary/20 bg-primary/5' : 'text-gray-400'
              }`}
              title="Add to Saved Bookmarks"
            >
              <Heart className={`h-4.5 w-4.5 ${isSaved ? 'fill-primary text-primary' : ''}`} />
            </button>
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-accent hover:bg-gray-100 transition-all bg-white cursor-pointer"
              title="Print Recipe Sheet"
            >
              <Printer className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-accent hover:bg-gray-100 transition-all bg-white cursor-pointer"
              title="Share Recipe Link"
            >
              <Share2 className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Nutritional overview & statistics */}
        <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center border-b border-gray-50">
          <div className="p-3 bg-secondary/25 rounded-2xl">
            <Clock className="w-5 h-5 mx-auto text-primary mb-1" />
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">Prep Time</span>
            <span className="block text-sm font-bold text-accent mt-0.5">{recipe.prepTime} mins</span>
          </div>

          <div className="p-3 bg-secondary/25 rounded-2xl">
            <ChefHat className="w-5 h-5 mx-auto text-primary mb-1" />
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">Cook Time</span>
            <span className="block text-sm font-bold text-accent mt-0.5">{recipe.cookTime} mins</span>
          </div>

          <div className="p-3 bg-secondary/25 rounded-2xl">
            <div className="text-xl mb-1">🔥</div>
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">Calories</span>
            <span className="block text-sm font-bold text-accent mt-0.5">{recipe.calories} kcal</span>
          </div>

          <div className="p-3 bg-secondary/25 rounded-2xl">
            <div className="text-xl mb-1">⭐</div>
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">Rating</span>
            <span className="block text-sm font-bold text-accent mt-0.5">{recipe.rating} ★ ({recipe.reviewsCount})</span>
          </div>
        </div>

        {/* Recipe scaling tool */}
        <div className="p-6 border-b border-gray-100 bg-orange-50/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xs font-bold text-accent">Serving Adjustment Engine</h3>
            <p className="text-[11px] text-gray-500 font-light mt-0.5">Toggle portions below. Ingredient measurements scale dynamically.</p>
          </div>
          <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-xs">
            <button
              onClick={() => handleServingChange(-1)}
              className="text-primary font-black w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 cursor-pointer disabled:text-gray-200"
              disabled={servings <= 1}
            >
              -
            </button>
            <span className="text-xs font-bold w-12 text-center text-accent">{servings} Servings</span>
            <button
              onClick={() => handleServingChange(1)}
              className="text-primary font-black w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 cursor-pointer disabled:text-gray-200"
              disabled={servings >= 24}
            >
              +
            </button>
          </div>
        </div>

        {/* Main Cooking columns layout */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Ingredients Left Panel (40%) */}
          <div className="md:col-span-5">
            <h3 className="text-lg font-serif font-bold text-accent mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Ingredients List</span>
              <span className="text-[10px] font-sans font-bold text-gray-400">Scale: {scaleRatio}x</span>
            </h3>

            <div className="space-y-3">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-gray-50/50 border-gray-100 text-gray-400'
                        : 'bg-white border-gray-100 hover:border-primary/20 text-accent'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleIngredient(ing.name)}
                      className="mt-0.5 rounded text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer h-4 w-4 accent-primary"
                    />
                    <div className="text-xs leading-relaxed flex justify-between w-full">
                      <span className={isChecked ? 'line-through decoration-primary' : 'font-medium'}>
                        {ing.name}
                      </span>
                      <span className="font-bold text-primary flex-shrink-0 ml-2">
                        {formatFraction(ing.amount)} {ing.unit}{scaleRatio * ing.amount > 1 && ing.unit.length > 2 && !ing.unit.endsWith('s') ? 's' : ''}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 mt-4 font-light">💡 Check off ingredients as you pull them from your pantry to stay organized.</p>
          </div>

          {/* Instructions Right Panel (60%) */}
          <div className="md:col-span-7">
            <h3 className="text-lg font-serif font-bold text-accent mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Preparation Steps</span>
              <span className="text-[10px] font-sans font-bold text-primary">Recipe Instructions</span>
            </h3>

            <div className="space-y-6">
              {recipe.instructions.map((step, idx) => {
                const isStepCleared = !!completedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isStepCleared
                        ? 'bg-emerald-50/20 border-emerald-100 text-gray-400'
                        : 'bg-white border-gray-50 hover:border-orange-100'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isStepCleared
                          ? 'bg-emerald-500 text-white'
                          : 'bg-accent text-white'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="text-xs leading-relaxed">
                      <p className={isStepCleared ? 'line-through font-light' : 'font-light text-accent'}>
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Short form embedded video section if available */}
        {recipe.videoUrl && (
          <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-1.5 uppercase tracking-wider">
              🎥 Tutorial Playback (Short reel)
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
              <iframe
                title="Recipe Video Guide"
                src={recipe.videoUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Community review forum module */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl mt-10">
        <h2 className="text-xl font-serif font-bold text-accent mb-6 flex items-center justify-between">
          <span>Community Reviews & Discussions 🗣️</span>
          <span className="text-xs font-sans font-semibold text-gray-400">{commentsList.length} Comments</span>
        </h2>

        {/* Comment input form */}
        <form onSubmit={handleAddComment} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 mb-8">
          <h4 className="text-xs font-bold text-accent uppercase mb-3">Add your cooking review</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Riya"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="block w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Star rating</label>
              <div className="flex items-center space-x-1.5 pt-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-0.5 focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Review description</label>
            <textarea
              required
              rows={3}
              placeholder="Tell other food lovers how it went or suggest quick revisions..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="block w-full text-xs p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400"
            />
          </div>
          <button
            id="comments-submit-action-btn"
            type="submit"
            className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/95 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5" /> Post Review
          </button>
        </form>

        {/* Comments Feed List */}
        <div className="space-y-4">
          {commentsList.map(item => {
            const isLiked = !!likedReviews[item.id];
            return (
              <div key={item.id} className="p-4 border-b border-gray-50 flex items-start gap-4">
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 shadow-xs">
                  {item.author.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-accent">{item.author}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(st => (
                            <Star
                              key={st}
                              className={`w-3 h-3 ${st <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleLikeReview(item.id)}
                      className={`text-[10px] font-bold px-3 py-1 bg-gray-50 rounded-full flex items-center gap-1 hover:bg-red-50 transition-colors ${
                        isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} /> Helpful
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 font-light mt-2 bg-gray-50/20 p-2 rounded-lg leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
