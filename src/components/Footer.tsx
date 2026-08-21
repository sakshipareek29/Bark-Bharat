import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenCalculator: () => void;
  onOpenReportMill: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenCalculator,
  onOpenReportMill,
}) => {
  return (
    <footer className="w-full bg-[#111c2d] text-[#cfdaf2] pt-12 pb-24 md:pb-12 mt-16 border-t border-[#263143]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#263143]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-[#ffdcc3]">
              <span className="material-symbols-outlined text-2xl icon-fill text-[#ffb77d]" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              <span className="text-2xl font-black tracking-tight text-white">BarkBharat</span>
            </div>
            <p className="text-sm text-[#cfdaf2]/80 leading-relaxed max-w-sm">
              Empowering Indian pet parents with transparent regional puppy pricing, KCI registration checklists, climate suitability guidance, and verified adoption networks.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6ffbbe]">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Committed to Ethical Pet Care & Indian Breed Preservation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('explore');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Explore Dog Breeds
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('states');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  State Cost Guide & Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('care');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Adopt Don't Shop Directory
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-white transition-colors text-left text-[#ffdcc3]"
                >
                  First-Year Cost Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Welfare & Emergency */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Animal Welfare & Legal Help
            </h4>
            <p className="text-xs text-[#cfdaf2]/80 leading-relaxed">
              If you witness animal cruelty, illegal puppy farming, or unethical breeder conditions, report immediately to local authorities.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenReportMill}
                className="bg-[#ba0035] hover:bg-[#920028] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">flag</span>
                <span>Report Illegal Breeding</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#cfdaf2]/60">
          <div>
            © {new Date().getFullYear()} BarkBharat. For educational and responsible pet parenting guidance across India.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy & Data</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">KCI Guidelines</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Shelter Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
