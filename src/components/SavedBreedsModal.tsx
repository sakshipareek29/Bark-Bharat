import React from 'react';
import { Breed } from '../types';

interface SavedBreedsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBreedIds: string[];
  allBreeds: Breed[];
  onSelectBreed: (breedId: string) => void;
  onToggleSave: (breedId: string) => void;
  onOpenCalculator: () => void;
}

export const SavedBreedsModal: React.FC<SavedBreedsModalProps> = ({
  isOpen,
  onClose,
  savedBreedIds,
  allBreeds,
  onSelectBreed,
  onToggleSave,
  onOpenCalculator,
}) => {
  if (!isOpen) return null;

  const savedBreeds = allBreeds.filter((b) => savedBreedIds.includes(b.id));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-[#d8e3fb] my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#554336] hover:text-[#111c2d] rounded-full hover:bg-[#f0f3ff]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#ba0035] text-2xl icon-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ba0035]">
            My Shortlist
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-[#111c2d] mb-1">
          Saved Breeds ({savedBreeds.length})
        </h2>
        <p className="text-xs text-[#554336] mb-6">
          Compare your favorited breeds, check regional price estimates, and review their climate suitability in India.
        </p>

        {savedBreeds.length === 0 ? (
          <div className="bg-[#f0f3ff] p-8 rounded-2xl text-center flex flex-col items-center gap-3 border border-[#d8e3fb]">
            <span className="material-symbols-outlined text-4xl text-[#554336]">favorite_border</span>
            <span className="font-bold text-base text-[#111c2d]">No Breeds Saved Yet</span>
            <p className="text-xs text-[#554336] max-w-sm">
              Click the heart icon on any breed card in the Explore or Details tab to save and compare them here.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {savedBreeds.map((breed) => (
              <div
                key={breed.id}
                className="bg-[#f0f3ff] hover:bg-[#e7eeff] p-4 rounded-2xl border border-[#d8e3fb] flex items-center justify-between gap-4 transition-colors"
              >
                <div
                  onClick={() => {
                    onSelectBreed(breed.id);
                    onClose();
                  }}
                  className="flex items-center gap-4 cursor-pointer flex-grow"
                >
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-xs shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#111c2d] hover:text-[#8d4b00] transition-colors">
                      {breed.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#554336] mt-0.5">
                      <span className="bg-white px-2 py-0.5 rounded font-semibold text-[#8d4b00]">
                        {breed.size}
                      </span>
                      <span>{breed.avgPriceIndia}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectBreed(breed.id);
                      onClose();
                    }}
                    className="bg-[#8d4b00] hover:bg-[#b15f00] text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all shadow-xs"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onToggleSave(breed.id)}
                    className="p-2 text-[#ba0035] hover:bg-white rounded-xl transition-colors"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#e7eeff] flex justify-between items-center">
          <button
            onClick={() => {
              onClose();
              onOpenCalculator();
            }}
            className="text-xs font-bold text-[#8d4b00] hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">calculate</span>
            <span>Calculate Multi-Breed Budget</span>
          </button>

          <button
            onClick={onClose}
            className="bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#111c2d] text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
