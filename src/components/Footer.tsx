import React, { useState } from 'react';
import { Mail, Instagram, Bookmark, CheckCircle, Sparkles } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-accent text-white rounded-t-[2.5rem] mt-16 shadow-2xl relative overflow-hidden">
      {/* Background blobs for premium decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Newsletter Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 animate-bounce" /> Weekend Digest Signup
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white tracking-tight">
              Get the freshest recipes directly into your inbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light mt-2 max-w-lg leading-relaxed">
              Join 15,000+ foodies receiving weekly viral cooking hacks, photography styling guides, and gourmet restaurant recommendations with zero junk.
            </p>
          </div>

          <div>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all focus:bg-white/10"
                  />
                </div>
                <button
                  id="footer-newsletter-submit-btn"
                  type="submit"
                  className="px-8 py-3.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary/95 transition-all shadow-md shadow-primary/20 active:scale-95 cursor-pointer"
                >
                  Join FlavorFeed
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-300 animate-fadeIn">
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                <div className="text-xs">
                  <span className="font-bold block text-white text-sm">Welcome to FlavorFeed! 🌿</span>
                  <span>Check your email soon for a 15-minute Rigatoni recipe starter kit.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1 Brand summary */}
          <div className="space-y-4">
            <span className="text-xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-sans font-extrabold text-sm">FF</span>
              <span>FlavorFeed<span className="text-primary">.</span></span>
            </span>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              FlavorFeed is a Pinterest and Instagram-inspired recipe platform designed for young food enthusiasts to master cookery, discover trends, and snap beautiful pictures.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com" className="p-2 bg-white/5 hover:bg-primary rounded-full transition-colors group">
                <Instagram className="w-4 h-4 text-gray-300 group-hover:text-white" />
              </a>
              <a href="https://pinterest.com" className="p-2 bg-white/5 hover:bg-primary rounded-full transition-colors group">
                <Bookmark className="w-4 h-4 text-gray-300 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Col 2 Explore and find */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Recipes</h3>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li className="hover:text-primary transition-colors cursor-pointer">Avocado sourdough</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Atlantic Salmon</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Rigatoni Sweet Tomato</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Fudge Lava Cakes</li>
            </ul>
          </div>

          {/* Col 3 Guides and advice */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Cooking Tips</h3>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li className="hover:text-primary transition-colors cursor-pointer">Food styling tricks</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Lighting parameters</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Camera specifications</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Ingredient scaling metrics</li>
            </ul>
          </div>

          {/* Col 4 Contacts & Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Platform Details</h3>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>Development: ₹1,50,000 – ₹3,00,000</li>
              <li>Aesthetic style: Modern Minimalist</li>
              <li>Location scope: London, Paris, NYC</li>
              <li>Author network: Chef Isabella, Elena & Marcus</li>
            </ul>
          </div>
        </div>

        {/* Brand Copyright */}
        <div className="border-t border-white/5 mt-12 pt-8 text-center text-[10px] text-gray-400 font-light flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} FlavorFeed Food Platform. All culinary rights reserved. Designed for young food lovers.</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer select-none">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer select-none">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
