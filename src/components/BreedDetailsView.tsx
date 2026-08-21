import React, { useState } from 'react';
import { Breed } from '../types';

interface BreedDetailsViewProps {
  breed: Breed;
  allBreeds: Breed[];
  onSelectBreed: (breedId: string) => void;
  onBackToExplore: () => void;
  isSaved: boolean;
  onToggleSave: (breedId: string) => void;
  onOpenCalculator: () => void;
}

export const BreedDetailsView: React.FC<BreedDetailsViewProps> = ({
  breed,
  allBreeds,
  onSelectBreed,
  onBackToExplore,
  isSaved,
  onToggleSave,
  onOpenCalculator,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <main className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-4 md:py-6 flex flex-col gap-6">
      {/* Top Header / Switcher Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-[#e7eeff]">
        <button
          onClick={onBackToExplore}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#8d4b00] hover:text-[#b15f00] transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Back to All Breeds</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-[#554336] font-semibold whitespace-nowrap">Switch Breed:</span>
          {allBreeds.map((b) => (
            <button
              key={b.id}
              onClick={() => onSelectBreed(b.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                b.id === breed.id
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'bg-[#f0f3ff] text-[#554336] hover:bg-[#e7eeff]'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[360px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg group border border-[#e7eeff]">
        <img
          src={breed.image}
          alt={`${breed.name} Hero`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

        {/* Action Top Right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-md hover:bg-white text-[#111c2d] p-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center"
            title="Share Breed"
          >
            <span className="material-symbols-outlined text-lg">{copiedLink ? 'check' : 'share'}</span>
          </button>
          <button
            onClick={() => onToggleSave(breed.id)}
            className="bg-white/90 backdrop-blur-md hover:bg-white text-[#ba0035] p-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center"
            title="Save to Favorites"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {isSaved ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>

        {/* Hero Bottom Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-md">
              {breed.size} Dog
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">public</span>
              {breed.origin}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-2">
            {breed.name}
          </h1>

          <p className="text-white/90 text-sm md:text-base line-clamp-2 max-w-2xl drop-shadow-sm mb-3">
            {breed.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {breed.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#b15f00] text-white text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Content */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {/* Regional Price Estimates (Span 8 on desktop) */}
        <div className="md:col-span-8 bg-[#ffffff] rounded-2xl shadow-md p-6 md:p-8 border border-[#e7eeff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined text-[#8d4b00] text-2xl icon-fill"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-[#8d4b00]">Regional Price Estimates</h2>
              </div>
              <span className="text-xs bg-[#f0f3ff] text-[#554336] px-2.5 py-1 rounded-full font-semibold">
                KCI Registered Rates
              </span>
            </div>

            <p className="text-[#554336] text-sm md:text-base mb-6">
              Current market rates for KCI-registered puppies and ethical adoption benchmarks across major Indian states.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {breed.regionalPrices.slice(0, 3).map((rp, idx) => (
                <div
                  key={idx}
                  className="bg-[#e7eeff] rounded-xl p-4 flex flex-col items-start border border-[#dbc2b0]/30 relative overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="absolute -right-3 -top-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[80px]">map</span>
                  </div>
                  <span className="text-xs font-bold text-[#554336] mb-1">{rp.state}</span>
                  <span className="text-xl font-extrabold text-[#8d4b00]">{rp.priceRange}</span>
                  <span className="text-[10px] text-[#554336] mt-1">Direct Kennel Average</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e7eeff] flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-xs text-[#554336]">
              *Prices vary based on lineage, champion titles, and breeder reputation.
            </span>
            <button
              onClick={onOpenCalculator}
              className="text-xs font-bold text-[#8d4b00] hover:text-[#b15f00] flex items-center gap-1 hover:underline"
            >
              <span>Calculate First-Year Budget</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Climate Advisory (Span 4 on desktop) */}
        <div className="md:col-span-4 bg-[#00a572] text-[#00311f] rounded-2xl shadow-md p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="material-symbols-outlined text-2xl icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                thermostat
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#002113]">Climate Advisory</h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-[#002113]/90 mt-2 font-medium">
              {breed.climateAdvisory.text}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center justify-between bg-white/30 p-3 rounded-xl backdrop-blur-sm">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#002113]">Heat Tolerance</span>
              <div className="flex gap-1 text-[#002113]">
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-base"
                    style={{
                      fontVariationSettings: star <= breed.climateAdvisory.heatTolerance ? "'FILL' 1" : "'FILL' 0",
                      opacity: star <= breed.climateAdvisory.heatTolerance ? 1 : 0.4,
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
            <span className="text-[11px] text-[#002113]/80 text-center font-medium">
              {breed.climateAdvisory.heatToleranceText}
            </span>
          </div>
        </div>

        {/* Ongoing Cost Breakdown (Span 12) */}
        <div className="md:col-span-12 bg-[#ffffff] rounded-2xl shadow-md p-6 md:p-8 border border-[#e7eeff]">
          <div className="flex items-center gap-2.5 mb-6">
            <span
              className="material-symbols-outlined text-[#8d4b00] text-2xl icon-fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monitoring
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#8d4b00]">Ongoing Cost Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#dbc2b0]/30">
            {/* Monthly Food */}
            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="w-14 h-14 rounded-full bg-[#b15f00] text-white flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <h3 className="text-sm font-bold text-[#111c2d] mb-1">Monthly Food</h3>
              <span className="text-2xl font-extrabold text-[#8d4b00]">{breed.costs.monthlyFood}</span>
              <p className="text-xs text-[#554336] mt-2 max-w-xs">{breed.costs.monthlyFoodNote}</p>
            </div>

            {/* Vaccinations */}
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <div className="w-14 h-14 rounded-full bg-[#e21e49] text-white flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-2xl">vaccines</span>
              </div>
              <h3 className="text-sm font-bold text-[#111c2d] mb-1">Vaccinations</h3>
              <span className="text-2xl font-extrabold text-[#ba0035]">{breed.costs.vaccinations}</span>
              <p className="text-xs text-[#554336] mt-2 max-w-xs">{breed.costs.vaccinationsNote}</p>
            </div>

            {/* Maintenance */}
            <div className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <div className="w-14 h-14 rounded-full bg-[#d8e3fb] text-[#111c2d] flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-2xl">content_cut</span>
              </div>
              <h3 className="text-sm font-bold text-[#111c2d] mb-1">Maintenance</h3>
              <span className="text-2xl font-extrabold text-[#111c2d]">{breed.costs.maintenanceLevel}</span>
              <p className="text-xs text-[#554336] mt-2 max-w-xs">{breed.costs.maintenanceNote}</p>
            </div>
          </div>
        </div>

        {/* Breed Profile Specs & Trait Meters (Span 12) */}
        <div className="md:col-span-12 bg-[#f0f3ff] rounded-2xl shadow-sm p-6 md:p-8 border border-[#d8e3fb]">
          <h3 className="text-lg font-bold text-[#111c2d] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8d4b00]">tune</span>
            <span>Breed Temperament & Care Metrics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Spec 1 */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e7eeff]">
              <span className="text-xs text-[#554336] font-semibold block mb-1">Lifespan</span>
              <span className="text-lg font-bold text-[#111c2d]">{breed.lifespan}</span>
            </div>

            {/* Spec 2 */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e7eeff]">
              <span className="text-xs text-[#554336] font-semibold block mb-1">Average Weight</span>
              <span className="text-lg font-bold text-[#111c2d]">{breed.weight}</span>
            </div>

            {/* Spec 3 */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e7eeff]">
              <span className="text-xs text-[#554336] font-semibold block mb-1">Exercise Needs</span>
              <span className="text-lg font-bold text-[#111c2d]">{breed.exerciseNeeds}</span>
            </div>

            {/* Spec 4 */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#e7eeff]">
              <span className="text-xs text-[#554336] font-semibold block mb-1">Apartment Suitability</span>
              <div className="flex items-center gap-1 mt-1 text-[#8d4b00]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined text-base"
                    style={{
                      fontVariationSettings: star <= breed.traits.apartmentFriendly ? "'FILL' 1" : "'FILL' 0",
                      opacity: star <= breed.traits.apartmentFriendly ? 1 : 0.25,
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
