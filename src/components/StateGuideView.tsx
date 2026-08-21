import React, { useState } from 'react';
import { StateGuide } from '../types';

interface StateGuideViewProps {
  states: StateGuide[];
  onSelectBreed: (breedId: string) => void;
  onOpenCalculator: () => void;
}

export const StateGuideView: React.FC<StateGuideViewProps> = ({
  states,
  onSelectBreed,
  onOpenCalculator,
}) => {
  const [activeStateId, setActiveStateId] = useState<string>('maharashtra');

  const currentState = states.find((s) => s.id === activeStateId) || states[0];

  return (
    <main className="flex-grow px-4 md:px-10 w-full max-w-[1280px] mx-auto py-6 md:py-8 flex flex-col gap-6">
      {/* Header & Intro */}
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111c2d] tracking-tight">
          State-by-State Dog Cost Guide
        </h1>
        <p className="text-base md:text-lg text-[#554336] max-w-3xl leading-relaxed">
          Compare ownership costs, local KCI guidelines, and top breeds across India. Select a state to explore detailed pricing factors in a friendly, comprehensive format.
        </p>
      </section>

      {/* State Selector Tabs */}
      <section className="w-full">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2" role="tablist">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => setActiveStateId(state.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm shadow-xs transition-all duration-200 flex-shrink-0 cursor-pointer ${
                activeStateId === state.id
                  ? 'bg-[#8d4b00] text-white shadow-md'
                  : 'bg-white text-[#554336] hover:bg-[#dee8ff] border border-[#d8e3fb]'
              }`}
              role="tab"
              aria-selected={activeStateId === state.id}
            >
              {state.name}
            </button>
          ))}
        </div>
      </section>

      {/* State Content Bento Grid */}
      <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
          {/* Overview Card (Spans 8 cols on desktop) */}
          <div className="md:col-span-8 bg-[#ffffff] rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center border border-[#e7eeff]">
            {/* Map Illustration Box */}
            <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-sm relative group bg-[#f0f3ff] border border-[#d8e3fb]">
              <img
                src={currentState.mapImage}
                alt={`${currentState.name} Price Guide Map`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-md">
                {currentState.name} Avg.
              </div>
            </div>

            {/* Overview Text & Stats */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#8d4b00]">
                {currentState.headline}
              </h2>
              <p className="text-xs md:text-sm text-[#554336] leading-relaxed">
                {currentState.demandSummary}
              </p>

              <div className="flex gap-3 mt-2">
                <div className="flex flex-col bg-[#e7eeff] rounded-xl p-3 w-1/2 items-center text-center border border-[#d8e3fb]">
                  <span className="text-[11px] text-[#554336] uppercase font-bold tracking-wider">
                    Avg Initial Cost
                  </span>
                  <span className="text-base md:text-lg font-extrabold text-[#8d4b00] mt-0.5">
                    {currentState.avgInitialCost}
                  </span>
                </div>
                <div className="flex flex-col bg-[#e7eeff] rounded-xl p-3 w-1/2 items-center text-center border border-[#d8e3fb]">
                  <span className="text-[11px] text-[#554336] uppercase font-bold tracking-wider">
                    Monthly Care
                  </span>
                  <span className="text-base md:text-lg font-extrabold text-[#8d4b00] mt-0.5">
                    {currentState.monthlyCare}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Local KCI Rules Card (Spans 4 cols on desktop) */}
          <div className="md:col-span-4 bg-[#00a572] rounded-2xl shadow-md p-6 md:p-8 flex flex-col justify-between text-[#002113]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="material-symbols-outlined text-2xl icon-fill text-[#002113]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <h3 className="text-xl font-extrabold text-[#002113]">Local KCI Rules</h3>
              </div>
              <p className="text-xs md:text-sm font-medium mb-4 text-[#002113]/90 leading-relaxed">
                {currentState.name} chapters enforce specific lineage registration and microchipping requirements.
              </p>

              <ul className="flex flex-col gap-2.5">
                {currentState.kciRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm font-medium text-[#002113]">
                    <span className="material-symbols-outlined text-base mt-0.5 shrink-0 text-[#00311f]">
                      check_circle
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-[#00311f]/20 flex items-center justify-between text-xs font-bold text-[#002113]">
              <span>Kennel Club of India Affiliate</span>
              <span className="material-symbols-outlined text-base">gavel</span>
            </div>
          </div>

          {/* Top 5 Breeds in State (Spans full 12 cols) */}
          <div className="md:col-span-12 flex flex-col gap-4 mt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#111c2d]">
                Top 5 Breeds in {currentState.name}
              </h3>
              <button
                onClick={onOpenCalculator}
                className="text-xs font-bold text-[#8d4b00] hover:underline flex items-center gap-1"
              >
                <span>Compare Costs in Calculator</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Sub-grid for ranked cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {currentState.topBreeds.map((topBreed) => (
                <div
                  key={topBreed.rank}
                  onClick={() => onSelectBreed(topBreed.breedId)}
                  className="bg-[#ffffff] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer border border-[#e7eeff] hover:-translate-y-1"
                >
                  <div className="w-full aspect-square overflow-hidden bg-[#dee8ff] relative">
                    <img
                      src={topBreed.image}
                      alt={topBreed.breedName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                      <span
                        className="material-symbols-outlined text-[#8d4b00] text-xs icon-fill"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs font-extrabold text-[#111c2d]">#{topBreed.rank}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-1 flex-grow justify-between">
                    <span className="text-sm font-bold text-[#111c2d] group-hover:text-[#8d4b00] transition-colors leading-tight">
                      {topBreed.breedName}
                    </span>
                    <span className="text-sm font-extrabold text-[#8d4b00]">
                      {topBreed.priceRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Factors Card (Spans full 12 cols) */}
          <div className="md:col-span-12 bg-[#ffffff] rounded-2xl shadow-md p-6 md:p-8 border border-[#e7eeff] mt-2">
            <h3 className="text-lg md:text-xl font-bold text-[#111c2d] mb-6">
              Key Pricing Factors in {currentState.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentState.pricingFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 p-5 rounded-xl bg-[#f0f3ff] border border-[#d8e3fb]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#111c2d]">{factor.title}</span>
                    <span className="material-symbols-outlined text-[#8d4b00] text-xl">
                      {factor.icon}
                    </span>
                  </div>

                  <p className="text-xs text-[#554336] leading-relaxed">
                    {factor.description}
                  </p>

                  <div className="w-full bg-[#d8e3fb] rounded-full h-2.5 mt-1 overflow-hidden">
                    <div
                      className="bg-[#8d4b00] h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${factor.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Veterinary Infrastructure Note */}
            <div className="mt-6 pt-4 border-t border-[#e7eeff] flex items-start gap-3 text-xs text-[#554336]">
              <span className="material-symbols-outlined text-lg text-[#006c49] shrink-0">local_hospital</span>
              <div>
                <span className="font-bold text-[#111c2d]">Veterinary Infrastructure: </span>
                <span>{currentState.vetInfrastructure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
