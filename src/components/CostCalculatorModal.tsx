import React, { useState } from 'react';
import { Breed } from '../types';

interface CostCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  breeds: Breed[];
  initialBreedId?: string;
}

export const CostCalculatorModal: React.FC<CostCalculatorModalProps> = ({
  isOpen,
  onClose,
  breeds,
  initialBreedId,
}) => {
  const [selectedBreedId, setSelectedBreedId] = useState(initialBreedId || breeds[0]?.id || 'golden-retriever');
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [foodPlan, setFoodPlan] = useState<'standard' | 'premium' | 'home'>('premium');
  const [groomingPlan, setGroomingPlan] = useState<'diy' | 'monthly' | 'pro'>('monthly');
  const [isAdoption, setIsAdoption] = useState(false);

  if (!isOpen) return null;

  const currentBreed = breeds.find((b) => b.id === selectedBreedId) || breeds[0];

  // Calculations
  const basePurchaseCost = isAdoption ? 0 : (currentBreed?.minPrice + currentBreed?.maxPrice) / 2;
  const initialEssentials = 6000; // Crate, bed, collar, bowls, toys
  const initialVetAndShots = 5500; // Vaccines, microchipping, vet consultation
  const initialOneTimeTotal = basePurchaseCost + initialEssentials + initialVetAndShots;

  let monthlyFood = 3000;
  if (foodPlan === 'home') monthlyFood = 2000;
  if (foodPlan === 'standard') monthlyFood = 2800;
  if (foodPlan === 'premium') monthlyFood = currentBreed?.size === 'Large' ? 4500 : currentBreed?.size === 'Small' ? 2200 : 3200;

  let monthlyGrooming = 1000;
  if (groomingPlan === 'diy') monthlyGrooming = 300;
  if (groomingPlan === 'monthly') monthlyGrooming = 1500;
  if (groomingPlan === 'pro') monthlyGrooming = 2500;

  const monthlyVetPreventative = 800; // Tick/flea, deworming, routine check
  const monthlyRecurringTotal = monthlyFood + monthlyGrooming + monthlyVetPreventative;
  const yearOneTotal = initialOneTimeTotal + (monthlyRecurringTotal * 12);
  const subsequentYearAnnual = monthlyRecurringTotal * 12;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-[#d8e3fb] my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#554336] hover:text-[#111c2d] rounded-full hover:bg-[#f0f3ff]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#8d4b00] text-2xl">calculate</span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8d4b00]">
            Financial Preparedness Guide
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#111c2d] mb-1">
          Dog Ownership Cost Calculator
        </h2>
        <p className="text-xs text-[#554336] mb-6">
          Estimate realistic first-year investments and monthly maintenance budgets for raising a healthy companion in India.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Select Breed */}
          <div>
            <label className="block text-xs font-bold text-[#554336] mb-1.5">Select Breed</label>
            <select
              value={selectedBreedId}
              onChange={(e) => {
                setSelectedBreedId(e.target.value);
                const selected = breeds.find((b) => b.id === e.target.value);
                if (selected?.isAdoptable) setIsAdoption(true);
              }}
              className="w-full bg-[#f0f3ff] rounded-xl px-3.5 py-2.5 text-sm border border-[#dbc2b0]/30 font-medium text-[#111c2d] outline-none"
            >
              {breeds.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.size})
                </option>
              ))}
            </select>
          </div>

          {/* Select State */}
          <div>
            <label className="block text-xs font-bold text-[#554336] mb-1.5">Indian State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#f0f3ff] rounded-xl px-3.5 py-2.5 text-sm border border-[#dbc2b0]/30 font-medium text-[#111c2d] outline-none"
            >
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi NCR</option>
              <option>West Bengal</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Punjab</option>
            </select>
          </div>

          {/* Adoption Toggle */}
          <div className="sm:col-span-2 flex items-center justify-between bg-[#f0f3ff] p-3 rounded-xl border border-[#d8e3fb]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006c49]">volunteer_activism</span>
              <div>
                <span className="text-xs font-bold text-[#111c2d] block">Adopting from Shelter / Indie</span>
                <span className="text-[11px] text-[#554336]">Eliminates initial breeder purchase markups</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAdoption}
              onChange={(e) => setIsAdoption(e.target.checked)}
              className="w-5 h-5 accent-[#006c49] cursor-pointer rounded"
            />
          </div>

          {/* Diet Plan */}
          <div>
            <label className="block text-xs font-bold text-[#554336] mb-1.5">Diet Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'home', label: 'Home Cooked' },
                { id: 'standard', label: 'Standard' },
                { id: 'premium', label: 'Super Premium' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFoodPlan(p.id as any)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all ${
                    foodPlan === p.id
                      ? 'bg-[#8d4b00] text-white border-[#8d4b00]'
                      : 'bg-white text-[#554336] border-[#dbc2b0]/30 hover:bg-[#f0f3ff]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grooming Plan */}
          <div>
            <label className="block text-xs font-bold text-[#554336] mb-1.5">Grooming Frequency</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'diy', label: 'DIY At Home' },
                { id: 'monthly', label: 'Monthly Spa' },
                { id: 'pro', label: 'Show/Pro Salon' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setGroomingPlan(p.id as any)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition-all ${
                    groomingPlan === p.id
                      ? 'bg-[#8d4b00] text-white border-[#8d4b00]'
                      : 'bg-white text-[#554336] border-[#dbc2b0]/30 hover:bg-[#f0f3ff]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Results Summary */}
        <div className="bg-[#e7eeff] p-5 rounded-2xl border border-[#d8e3fb] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3.5 rounded-xl shadow-2xs border border-[#d8e3fb]">
              <span className="text-[11px] font-bold text-[#554336] uppercase tracking-wider block">
                Initial Year-1 Setup
              </span>
              <span className="text-xl font-black text-[#8d4b00] mt-1 block">
                ₹{initialOneTimeTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#554336]">
                {isAdoption ? 'Vaccines + Essentials' : 'Puppy + Shots + Gear'}
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl shadow-2xs border border-[#d8e3fb]">
              <span className="text-[11px] font-bold text-[#554336] uppercase tracking-wider block">
                Monthly Recurring
              </span>
              <span className="text-xl font-black text-[#8d4b00] mt-1 block">
                ₹{monthlyRecurringTotal.toLocaleString('en-IN')}/mo
              </span>
              <span className="text-[10px] text-[#554336]">Food, Grooming, Vet Care</span>
            </div>

            <div className="bg-[#8d4b00] text-white p-3.5 rounded-xl shadow-sm">
              <span className="text-[11px] font-bold text-[#ffdcc3] uppercase tracking-wider block">
                Total 1st Year Cost
              </span>
              <span className="text-xl font-black text-white mt-1 block">
                ₹{yearOneTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#ffdcc3]">Subsequent: ₹{subsequentYearAnnual.toLocaleString('en-IN')}/yr</span>
            </div>
          </div>

          <div className="text-[11px] text-[#554336] flex items-center gap-1.5 pt-1">
            <span className="material-symbols-outlined text-sm text-[#8d4b00]">lightbulb</span>
            <span>
              Tip: Routine preventive vet checkups save up to 40% in emergency medical expenses over a canine's lifetime.
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-sm active:scale-95"
        >
          Close Calculator
        </button>
      </div>
    </div>
  );
};
