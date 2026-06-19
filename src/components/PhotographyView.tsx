import React, { useState } from 'react';
import { Camera, ExternalLink, Sparkles, BookOpen, Layers, Settings, ArrowLeftRight, X } from 'lucide-react';
import { PHOTO_ASSETS, EQUIPMENT_RECOMMENDATIONS } from '../data/photography';
import { PhotoAsset } from '../types';

export default function PhotographyView() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoAsset | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'camera' | 'lenses' | 'lighting' | 'accessories'>('all');
  const [isCopied, setIsCopied] = useState(false);

  const filteredEquipment = activeTab === 'all'
    ? EQUIPMENT_RECOMMENDATIONS
    : EQUIPMENT_RECOMMENDATIONS.filter(eq => eq.category.toLowerCase() === activeTab);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto my-8">
      {/* Intro visual banner */}
      <div className="bg-accent text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block">
            Instagram & Pinterest Inspired Gallery
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
            Food Photography & Behind-the-Scenes Artistry
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            Discover our curated, high-saturation portfolio. Explore how our resident food stylists utilize lighting arrays, backdrops, and camera adjustments to produce gorgeous, mouth-watering content.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleCopyLink}
              className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-semibold rounded-full shadow-md shadow-primary/20 hover:scale-103 transition-all cursor-pointer"
            >
              {isCopied ? '🔗 Link Copied!' : 'Share Portfolio'}
            </button>
          </div>
        </div>
      </div>

      {/* Masonry food photography gallery */}
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-accent mb-6 flex items-center gap-2">
        <span>Curator Masonry Feed 📷</span>
        <span className="text-xs font-sans font-normal text-gray-400">(Click to reveal BTS camera settings & styling tips)</span>
      </h2>

      {/* Columns layout simulating modern Pinterest boards */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mb-16">
        {PHOTO_ASSETS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="break-inside-avoid bg-white border border-gray-100 rounded-3xl overflow-hidden group shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer relative"
          >
            <div className="relative overflow-hidden cursor-zoom-in">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full object-cover group-hover:scale-[1.03] transition-all duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover overlay data */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                <div>
                  <h4 className="text-xs font-bold">{photo.title}</h4>
                  <span className="text-[10px] text-gray-300 font-light">by {photo.photographer}</span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded-md">
                  {photo.camera.split(' ')[0]} {photo.aperture}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Behind-The-Scenes full detail lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative no-scrollbar">
            {/* Direct dismiss click */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-gray-100 text-accent hover:text-red-500 transition-colors cursor-pointer shadow-md z-10"
              aria-label="Dismiss details lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side Imagery */}
              <div className="bg-gray-50 h-64 md:h-full min-h-[300px] relative">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Right Side BTS & Specs details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">
                    Creative Review Case Study
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-accent mt-1 leading-snug">
                    {selectedPhoto.title}
                  </h3>
                  <div className="flex items-center gap-2.5 mt-3">
                    <img
                      src={selectedPhoto.photographerAvatar}
                      className="w-8 h-8 rounded-full object-cover"
                      alt={selectedPhoto.photographer}
                    />
                    <div className="text-xs">
                      <span className="text-gray-400 block text-[9px]">Photographer</span>
                      <span className="font-semibold text-accent">{selectedPhoto.photographer}</span>
                    </div>
                  </div>
                </div>

                {/* Tab 1: Photographer story */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-accent tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                    <BookOpen className="w-4 h-4 text-primary" /> Inside Story behind the shot
                  </h4>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    "{selectedPhoto.story}"
                  </p>
                </div>

                {/* Tab 2: Food styling tips */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-accent tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                    <Sparkles className="w-4 h-4 text-primary" /> Pro Food Styling Tricks Used
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-600 font-light">
                    {selectedPhoto.stylingTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-orange-50 text-primary font-bold text-[10px] rounded-md flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tab 3: EXIF Metadata specs */}
                <div className="bg-secondary/30 rounded-2xl p-4 border border-secondary/50">
                  <h4 className="text-xs uppercase font-bold text-accent tracking-wider flex items-center gap-1.5 mb-3">
                    <Settings className="w-4 h-4 text-primary" /> Camera Setup & EXIF Data
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-medium">
                    <div>
                      <span className="block text-[9px] uppercase text-gray-400">Camera</span>
                      <span className="text-accent">{selectedPhoto.camera}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-gray-400">Prime Lens</span>
                      <span className="text-accent">{selectedPhoto.lens}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-gray-400">Aperture</span>
                      <span className="text-primary font-bold">{selectedPhoto.aperture}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-gray-400">Shutter Speed</span>
                      <span className="text-accent">{selectedPhoto.shutterSpeed}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-gray-400">Aperture ISO</span>
                      <span className="text-accent">{selectedPhoto.iso}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-gray-400">Lighting</span>
                      <span className="text-accent">Dimmable LED Softboxes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Suggestions Board */}
      <div className="bg-secondary/10 border border-secondary/40 rounded-3xl p-6 sm:p-10 mb-10">
        <div className="max-w-2xl text-left mb-8">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Creator Recommended Arsenal</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-accent mt-1">Equipment Recommendations 🎥</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mt-2">
            Looking to level up your food photography or start shooting professional culinary Reels? Here is our curated gear guide for beginner to intermediate creators.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-gray-100 pb-4">
          {(['all', 'camera', 'lenses', 'lighting', 'accessories'] as const).map(catName => (
            <button
              key={catName}
              onClick={() => setActiveTab(catName)}
              className={`px-4.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeTab === catName
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-primary/20 hover:text-primary'
              }`}
            >
              {catName.charAt(0).toUpperCase() + catName.slice(1)}
            </button>
          ))}
        </div>

        {/* Equipment listing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((eq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-50 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-lg shadow-xs">
                  {eq.image}
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded-full inline-block">
                    {eq.category}
                  </span>
                  <h4 className="text-sm font-bold text-accent mt-1.5">{eq.name}</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed mt-1">
                    {eq.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-50 flex justify-between items-center text-xs">
                <span className="text-gray-400 font-light">Est. Price Range</span>
                <span className="font-bold text-primary">{eq.priceRange}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
