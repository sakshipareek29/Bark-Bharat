import React, { useState, useMemo } from 'react';
import { Breed } from '../types';

interface ExploreViewProps {
  breeds: Breed[];
  onSelectBreed: (breedId: string) => void;
  savedBreeds: string[];
  onToggleSave: (breedId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  breeds,
  onSelectBreed,
  savedBreeds,
  onToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedFilterChip, setSelectedFilterChip] = useState('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<'All' | 'Small' | 'Medium' | 'Large'>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(60000);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed) => {
      // Search text filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        breed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Chip shortcut filter
      let matchesChip = true;
      if (selectedFilterChip === 'labrador') {
        matchesChip = breed.id.includes('labrador');
      } else if (selectedFilterChip === 'german-shepherd') {
        matchesChip = breed.id.includes('german-shepherd');
      } else if (selectedFilterChip === 'beagle') {
        matchesChip = breed.id.includes('beagle');
      } else if (selectedFilterChip === 'desi') {
        matchesChip = breed.isAdoptable || breed.id.includes('pariah');
      }

      // Size filter
      const matchesSize = selectedSizeFilter === 'All' || breed.size === selectedSizeFilter;

      // Price filter
      const matchesPrice = breed.minPrice <= maxPriceFilter;

      return matchesSearch && matchesChip && matchesSize && matchesPrice;
    });
  }, [breeds, searchQuery, selectedFilterChip, selectedSizeFilter, maxPriceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-8 flex flex-col gap-6">
      {/* Hero Section */}
      <section className="flex flex-col gap-3 pt-2 pb-6 md:py-10 md:text-center md:items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111c2d] tracking-tight max-w-3xl leading-tight">
          Find Your Perfect <span className="text-[#8d4b00]">Canine Companion</span> in India
        </h1>
        <p className="text-base md:text-lg text-[#554336] max-w-2xl mt-1 leading-relaxed">
          Discover breeds tailored to your lifestyle, compare prices across regions, and learn everything you need to know about welcoming a new furry friend.
        </p>

        {/* Search & Filter Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-6 w-full max-w-3xl bg-[#ffffff] rounded-2xl shadow-md p-2.5 flex flex-col sm:flex-row gap-2 border border-[#e7eeff]"
        >
          <div className="flex-grow flex items-center bg-[#f0f3ff] rounded-xl px-4 py-3 border border-[#dbc2b0]/30 focus-within:border-[#8d4b00] transition-colors">
            <span className="material-symbols-outlined text-[#554336] mr-3 text-xl">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search breeds by name, temperament, or traits..."
              className="bg-transparent border-none focus:ring-0 w-full text-base text-[#111c2d] placeholder:text-[#554336]/60 p-0 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#554336] hover:text-[#111c2d]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          <div className="relative w-full sm:w-48">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="appearance-none w-full bg-[#f0f3ff] rounded-xl px-4 py-3 pr-10 border border-[#dbc2b0]/30 focus:border-[#8d4b00] focus:ring-1 focus:ring-[#8d4b00] text-sm text-[#111c2d] outline-none cursor-pointer font-medium"
            >
              <option value="all">All States</option>
              <option value="mh">Maharashtra</option>
              <option value="dl">Delhi NCR</option>
              <option value="ka">Karnataka</option>
              <option value="tn">Tamil Nadu</option>
              <option value="wb">West Bengal</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#554336] pointer-events-none text-xl">
              expand_more
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#8d4b00] hover:bg-[#b15f00] text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>Find Dogs</span>
            <span className="material-symbols-outlined text-lg">search</span>
          </button>
        </form>
      </section>

      {/* Quick Chips & Filter Controls */}
      <section className="w-full">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex-shrink-0 flex items-center gap-1.5 mr-2 text-[#554336]">
            <span className="material-symbols-outlined text-lg">tune</span>
            <span className="font-semibold text-xs uppercase tracking-wider">Filters:</span>
          </div>

          {/* All Breeds Chip */}
          <button
            onClick={() => {
              setSelectedFilterChip('all');
              setSelectedSizeFilter('All');
              setMaxPriceFilter(60000);
            }}
            className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all shadow-xs ${
              selectedFilterChip === 'all' && selectedSizeFilter === 'All' && maxPriceFilter >= 60000
                ? 'bg-[#b15f00] text-white border-[#b15f00]'
                : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
            }`}
          >
            All Breeds
          </button>

          {/* Labrador Chip */}
          <button
            onClick={() => setSelectedFilterChip(selectedFilterChip === 'labrador' ? 'all' : 'labrador')}
            className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all ${
              selectedFilterChip === 'labrador'
                ? 'bg-[#b15f00] text-white border-[#b15f00]'
                : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
            }`}
          >
            Labrador
          </button>

          {/* German Shepherd Chip */}
          <button
            onClick={() => setSelectedFilterChip(selectedFilterChip === 'german-shepherd' ? 'all' : 'german-shepherd')}
            className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all ${
              selectedFilterChip === 'german-shepherd'
                ? 'bg-[#b15f00] text-white border-[#b15f00]'
                : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
            }`}
          >
            German Shepherd
          </button>

          {/* Beagle Chip */}
          <button
            onClick={() => setSelectedFilterChip(selectedFilterChip === 'beagle' ? 'all' : 'beagle')}
            className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all ${
              selectedFilterChip === 'beagle'
                ? 'bg-[#b15f00] text-white border-[#b15f00]'
                : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
            }`}
          >
            Beagle
          </button>

          {/* Desi (Indian Pariah) Chip */}
          <button
            onClick={() => setSelectedFilterChip(selectedFilterChip === 'desi' ? 'all' : 'desi')}
            className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
              selectedFilterChip === 'desi'
                ? 'bg-[#006c49] text-white border-[#006c49]'
                : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">volunteer_activism</span>
            <span>Desi (Indian Pariah)</span>
          </button>

          {/* Price Filter Dropdown Toggle */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => {
                setShowPriceDropdown(!showPriceDropdown);
                setShowSizeDropdown(false);
              }}
              className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all flex items-center gap-1 ${
                maxPriceFilter < 60000
                  ? 'bg-[#ffdcc3] text-[#2f1500] border-[#8d4b00]'
                  : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
              }`}
            >
              <span>{maxPriceFilter < 60000 ? `Max ₹${maxPriceFilter / 1000}k` : 'Price'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
            </button>

            {showPriceDropdown && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl p-4 z-30 border border-[#d8e3fb]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#554336]">Max Purchase Price</span>
                  <span className="text-xs font-bold text-[#8d4b00]">₹{maxPriceFilter.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={60000}
                  step={5000}
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-full accent-[#8d4b00] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#554336] mt-1">
                  <span>₹5k</span>
                  <span>₹30k</span>
                  <span>₹60k+</span>
                </div>
                <button
                  onClick={() => setShowPriceDropdown(false)}
                  className="w-full mt-3 bg-[#f0f3ff] hover:bg-[#e7eeff] text-xs font-semibold py-1.5 rounded-lg text-[#111c2d]"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Size Filter Dropdown Toggle */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => {
                setShowSizeDropdown(!showSizeDropdown);
                setShowPriceDropdown(false);
              }}
              className={`flex-shrink-0 font-semibold text-sm px-4 py-2 rounded-full border transition-all flex items-center gap-1 ${
                selectedSizeFilter !== 'All'
                  ? 'bg-[#ffdcc3] text-[#2f1500] border-[#8d4b00]'
                  : 'bg-[#ffffff] text-[#111c2d] border-[#dbc2b0] hover:bg-[#f0f3ff]'
              }`}
            >
              <span>{selectedSizeFilter !== 'All' ? selectedSizeFilter : 'Size'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
            </button>

            {showSizeDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl p-2 z-30 border border-[#d8e3fb] flex flex-col gap-1">
                {(['All', 'Small', 'Medium', 'Large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSizeFilter(size);
                      setShowSizeDropdown(false);
                    }}
                    className={`text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      selectedSizeFilter === size ? 'bg-[#ffdcc3] text-[#2f1500]' : 'hover:bg-[#f0f3ff] text-[#111c2d]'
                    }`}
                  >
                    {size === 'All' ? 'All Sizes' : `${size} Dogs`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Count & Quick Status */}
      <div className="flex justify-between items-center text-xs text-[#554336] px-1">
        <span>Showing {Math.min(visibleCount, filteredBreeds.length)} of {filteredBreeds.length} breeds</span>
        {(searchQuery || selectedFilterChip !== 'all' || selectedSizeFilter !== 'All' || maxPriceFilter < 60000) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilterChip('all');
              setSelectedSizeFilter('All');
              setMaxPriceFilter(60000);
            }}
            className="text-[#ba0035] hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Breed Showcase Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filteredBreeds.slice(0, visibleCount).map((breed) => {
          const isSaved = savedBreeds.includes(breed.id);
          // Check if state pricing is available for currently selected state
          const statePrice = selectedState !== 'all'
            ? breed.regionalPrices.find((rp) => rp.stateCode.toLowerCase() === selectedState)
            : null;

          return (
            <article
              key={breed.id}
              className="bg-[#ffffff] rounded-2xl shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 border border-[#e7eeff] hover:-translate-y-1"
            >
              {/* Image Container with Badges */}
              <div className="relative h-52 w-full overflow-hidden bg-[#d8e3fb]">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Size Badge */}
                <div className="absolute top-3 right-3 bg-[#ffffff]/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-[#e7eeff]">
                  <span className="material-symbols-outlined text-[#8d4b00] text-[15px]">straighten</span>
                  <span className="text-xs font-semibold text-[#111c2d]">{breed.size}</span>
                </div>

                {/* Adopt Badge for Indian Pariah / Desi */}
                {breed.isAdoptable && (
                  <div className="absolute top-3 left-3 bg-[#006c49] text-white px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">volunteer_activism</span>
                    <span>Adopt</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#111c2d] leading-snug group-hover:text-[#8d4b00] transition-colors">
                      {breed.name}
                    </h3>
                    <button
                      aria-label="Save"
                      onClick={() => onToggleSave(breed.id)}
                      className={`p-1 rounded-full transition-colors ${
                        isSaved ? 'text-[#ba0035]' : 'text-[#554336] hover:text-[#ba0035]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl" style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}>
                        {isSaved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>

                  {/* Origin */}
                  <div className="flex items-center gap-1.5 text-[#554336] mt-1.5 text-xs">
                    <span className="material-symbols-outlined text-[16px]">public</span>
                    <span>Origin: {breed.origin}</span>
                  </div>

                  {/* Quick Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {breed.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f0f3ff] text-[#554336] text-[11px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-2 pt-3 border-t border-[#dbc2b0]/20 flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs text-[#554336] block mb-0.5 font-medium">
                        {statePrice ? `${statePrice.state} Price` : breed.isAdoptable ? 'Avg. Price / Adoption' : 'Avg. Price (India)'}
                      </span>
                      <span className={`text-xl font-extrabold ${breed.isAdoptable ? 'text-[#006c49]' : 'text-[#8d4b00]'}`}>
                        {statePrice ? statePrice.priceRange : breed.avgPriceIndia}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectBreed(breed.id)}
                    className="w-full bg-[#b15f00] hover:bg-[#8d4b00] text-white text-sm font-semibold py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Load More Breeds */}
      {visibleCount < filteredBreeds.length && (
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="font-semibold text-sm text-[#8d4b00] border-2 border-[#8d4b00] px-8 py-3 rounded-full hover:bg-[#8d4b00]/5 transition-colors shadow-xs active:scale-95 flex items-center gap-2"
          >
            <span>Load More Breeds</span>
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
        </div>
      )}
    </main>
  );
};
