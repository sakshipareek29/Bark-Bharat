import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { breedsData } from './data/breedsData';
import { statesData } from './data/statesData';
import { sheltersData } from './data/sheltersData';
import { Navbar } from './components/Navbar';
import { ExploreView } from './components/ExploreView';
import { BreedDetailsView } from './components/BreedDetailsView';
import { AdoptCareView } from './components/AdoptCareView';
import { StateGuideView } from './components/StateGuideView';
import { CostCalculatorModal } from './components/CostCalculatorModal';
import { ReportMillModal } from './components/ReportMillModal';
import { SavedBreedsModal } from './components/SavedBreedsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedBreedId, setSelectedBreedId] = useState<string>('golden-retriever');
  const [savedBreeds, setSavedBreeds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('barkbharat_saved');
      return stored ? JSON.parse(stored) : ['golden-retriever', 'indian-pariah'];
    } catch {
      return ['golden-retriever', 'indian-pariah'];
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isReportMillOpen, setIsReportMillOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);

  // Sync saved breeds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('barkbharat_saved', JSON.stringify(savedBreeds));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [savedBreeds]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleToggleSave = (breedId: string) => {
    setSavedBreeds((prev) =>
      prev.includes(breedId) ? prev.filter((id) => id !== breedId) : [...prev, breedId]
    );
  };

  const handleSelectBreed = (breedId: string) => {
    setSelectedBreedId(breedId);
    setActiveTab('details');
  };

  const currentBreed = breedsData.find((b) => b.id === selectedBreedId) || breedsData[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2d] selection:bg-[#ffdcc3] selection:text-[#2f1500]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedBreeds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main View Router */}
      <div className="flex-grow">
        {activeTab === 'explore' && (
          <ExploreView
            breeds={breedsData}
            onSelectBreed={handleSelectBreed}
            savedBreeds={savedBreeds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'details' && (
          <BreedDetailsView
            breed={currentBreed}
            allBreeds={breedsData}
            onSelectBreed={(id) => setSelectedBreedId(id)}
            onBackToExplore={() => setActiveTab('explore')}
            isSaved={savedBreeds.includes(currentBreed.id)}
            onToggleSave={handleToggleSave}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {activeTab === 'states' && (
          <StateGuideView
            states={statesData}
            onSelectBreed={handleSelectBreed}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {activeTab === 'care' && (
          <AdoptCareView
            shelters={sheltersData}
            onOpenReportMill={() => setIsReportMillOpen(true)}
            onSelectBreed={handleSelectBreed}
          />
        )}
      </div>

      {/* Modals */}
      <CostCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        breeds={breedsData}
        initialBreedId={selectedBreedId}
      />

      <ReportMillModal
        isOpen={isReportMillOpen}
        onClose={() => setIsReportMillOpen(false)}
      />

      <SavedBreedsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedBreedIds={savedBreeds}
        allBreeds={breedsData}
        onSelectBreed={handleSelectBreed}
        onToggleSave={handleToggleSave}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenReportMill={() => setIsReportMillOpen(true)}
      />
    </div>
  );
}
