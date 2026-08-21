import React from 'react';
import { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenCalculator: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  onOpenCalculator,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <>
      {/* TopAppBar (Desktop) */}
      <header className="hidden md:flex justify-between items-center w-full px-6 md:px-10 py-4 sticky top-0 z-40 bg-[#f9f9ff]/95 backdrop-blur-md transition-colors border-b border-[#e7eeff] shadow-sm">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2 text-[#8d4b00] active:scale-95 transition-transform duration-150 text-left focus:outline-none"
        >
          <span className="material-symbols-outlined text-[#8d4b00] text-3xl icon-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-[#8d4b00]">BarkBharat</span>
        </button>

        {/* Navigation links */}
        <nav className="flex items-center gap-2 bg-[#f0f3ff] p-1.5 rounded-full border border-[#d8e3fb]">
          <button
            onClick={() => setActiveTab('explore')}
            className={`font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'explore'
                ? 'bg-[#8d4b00] text-white shadow-sm'
                : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff]'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'details'
                ? 'bg-[#8d4b00] text-white shadow-sm'
                : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff]'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('states')}
            className={`font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'states'
                ? 'bg-[#8d4b00] text-white shadow-sm'
                : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff]'
            }`}
          >
            States
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'care'
                ? 'bg-[#006c49] text-white shadow-sm'
                : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff]'
            }`}
          >
            Adoptable & Care
          </button>
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 text-xs font-semibold bg-[#ffdcc3] text-[#2f1500] hover:bg-[#ffb77d] px-3.5 py-2 rounded-full shadow-sm transition-all active:scale-95"
            title="Dog Ownership Cost Calculator"
          >
            <span className="material-symbols-outlined text-base">calculate</span>
            <span>Cost Calculator</span>
          </button>

          <button
            onClick={onOpenSaved}
            className="relative w-10 h-10 rounded-full bg-[#dee8ff] hover:bg-[#d8e3fb] transition-colors text-[#111c2d] flex items-center justify-center active:scale-95 shadow-sm"
            title="Saved Breeds"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ba0035] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden flex justify-between items-center w-full px-4 py-3.5 sticky top-0 z-40 bg-[#f9f9ff]/95 backdrop-blur-md border-b border-[#e7eeff] shadow-xs">
        <button
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2 text-[#8d4b00]"
        >
          <span className="material-symbols-outlined text-[#8d4b00] text-2xl icon-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
          <span className="text-xl font-extrabold text-[#8d4b00]">BarkBharat</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSaved}
            className="relative p-2 text-[#554336] rounded-full hover:bg-[#e7eeff]"
          >
            <span className="material-symbols-outlined text-2xl">favorite_border</span>
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#ba0035] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111c2d] rounded-full hover:bg-[#e7eeff]"
            aria-label="Open Menu"
          >
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#d8e3fb] p-4 shadow-lg sticky top-[57px] z-40 flex flex-col gap-2">
          <button
            onClick={() => {
              setActiveTab('explore');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
              activeTab === 'explore' ? 'bg-[#ffdcc3] text-[#2f1500]' : 'text-[#554336] hover:bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">home</span>
            <span>Explore All Breeds</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('details');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
              activeTab === 'details' ? 'bg-[#ffdcc3] text-[#2f1500]' : 'text-[#554336] hover:bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">info</span>
            <span>Breed Details & Climate</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('states');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
              activeTab === 'states' ? 'bg-[#ffdcc3] text-[#2f1500]' : 'text-[#554336] hover:bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">map</span>
            <span>State Cost Guide & KCI Rules</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('care');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
              activeTab === 'care' ? 'bg-[#6ffbbe] text-[#002113]' : 'text-[#554336] hover:bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">volunteer_activism</span>
            <span>Adopt Don't Shop & Shelters</span>
          </button>
          <div className="pt-2 mt-2 border-t border-[#e7eeff] flex gap-2">
            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#8d4b00] text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-base">calculate</span>
              Cost Calculator
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-3 pb-safe pt-2 bg-[#ffffff]/98 backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.06)] rounded-t-2xl border-t border-[#e7eeff]">
        {/* Explore */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'explore'
              ? 'bg-[#b15f00] text-white rounded-full px-5 py-1.5 shadow-sm'
              : 'text-[#554336] px-3 py-1.5 hover:text-[#8d4b00]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={activeTab === 'explore' ? { fontVariationSettings: "'FILL' 1" } : {}}>
            home
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Explore</span>
        </button>

        {/* Details */}
        <button
          onClick={() => setActiveTab('details')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'details'
              ? 'bg-[#b15f00] text-white rounded-full px-5 py-1.5 shadow-sm'
              : 'text-[#554336] px-3 py-1.5 hover:text-[#8d4b00]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={activeTab === 'details' ? { fontVariationSettings: "'FILL' 1" } : {}}>
            info
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Details</span>
        </button>

        {/* States */}
        <button
          onClick={() => setActiveTab('states')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'states'
              ? 'bg-[#b15f00] text-white rounded-full px-5 py-1.5 shadow-sm'
              : 'text-[#554336] px-3 py-1.5 hover:text-[#8d4b00]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={activeTab === 'states' ? { fontVariationSettings: "'FILL' 1" } : {}}>
            map
          </span>
          <span className="text-[11px] font-semibold mt-0.5">States</span>
        </button>

        {/* Care / Adoptable */}
        <button
          onClick={() => setActiveTab('care')}
          className={`flex flex-col items-center justify-center transition-all duration-200 ${
            activeTab === 'care'
              ? 'bg-[#006c49] text-white rounded-full px-5 py-1.5 shadow-sm'
              : 'text-[#554336] px-3 py-1.5 hover:text-[#006c49]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={activeTab === 'care' ? { fontVariationSettings: "'FILL' 1" } : {}}>
            volunteer_activism
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Care</span>
        </button>
      </nav>
    </>
  );
};
