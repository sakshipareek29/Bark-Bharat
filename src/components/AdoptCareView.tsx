import React, { useState, useMemo } from 'react';
import { Shelter } from '../types';

interface AdoptCareViewProps {
  shelters: Shelter[];
  onOpenReportMill: () => void;
  onSelectBreed: (breedId: string) => void;
}

export const AdoptCareView: React.FC<AdoptCareViewProps> = ({
  shelters,
  onOpenReportMill,
  onSelectBreed,
}) => {
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedShelterForModal, setSelectedShelterForModal] = useState<Shelter | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');

  const quickCities = ['All', 'Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Chennai', 'Kolkata', 'Hyderabad'];

  const filteredShelters = useMemo(() => {
    return shelters.filter((shelter) => {
      const matchesCityChip = selectedCity === 'All' || shelter.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesSearch =
        citySearch.trim() === '' ||
        shelter.city.toLowerCase().includes(citySearch.toLowerCase()) ||
        shelter.name.toLowerCase().includes(citySearch.toLowerCase()) ||
        shelter.state.toLowerCase().includes(citySearch.toLowerCase());
      return matchesCityChip && matchesSearch;
    });
  }, [shelters, selectedCity, citySearch]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setSelectedShelterForModal(null);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
    }, 2500);
  };

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-12 md:space-y-16">
      {/* Hero Section: Adopt Don't Shop */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-6">
          <span className="inline-block bg-[#00a572] text-[#00311f] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            Adopt Don't Shop
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-[#111c2d] leading-tight tracking-tight">
            The Indian Pariah Dog (Desi)
          </h1>

          <p className="text-base md:text-lg text-[#554336] leading-relaxed max-w-xl">
            Discover the unparalleled companionship of our native breeds. Hardy, fiercely loyal, and adapted to our climate, adopting a Desi dog is a rewarding journey of giving a loving home to a deserving soul.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 bg-[#f0f3ff] px-4 py-3 rounded-xl shadow-xs border border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-[#006c49] text-xl">health_and_safety</span>
              <span className="text-xs md:text-sm font-bold text-[#111c2d]">Extremely Hardy</span>
            </div>

            <div className="flex items-center gap-2 bg-[#f0f3ff] px-4 py-3 rounded-xl shadow-xs border border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-[#006c49] text-xl">savings</span>
              <span className="text-xs md:text-sm font-bold text-[#111c2d]">Zero Purchase Cost</span>
            </div>

            <div className="flex items-center gap-2 bg-[#f0f3ff] px-4 py-3 rounded-xl shadow-xs border border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-[#006c49] text-xl">wb_sunny</span>
              <span className="text-xs md:text-sm font-bold text-[#111c2d]">Climate Adapted</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelectBreed('indian-pariah')}
              className="bg-[#006c49] hover:bg-[#005236] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Explore Desi Dog Profile</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden shadow-xl h-[340px] md:h-[480px] border border-[#e7eeff] group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz_euwgLzWwK84saIO3INzelm_g0lb725hUYoJKcaprgteU_y-Cd276qdg2SAzP4065vV9ve__WDVWONR8XV32QoCUeP3ONW4qcuxewlUIZZTyJfn-CozHIkcLD6Dw2aGmuKSwWjLoXsbrZasBf4bzXl9gAl9FJS4cPtNsApzr755zl1FRwjaetepCRXtrpSSr6UoCT6Xbsjq3yJUilTNY8CKmy3j4t65GFYmjapBd-4yM9x9_nxFy"
            alt="The Indian Pariah Dog Desi"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="bg-[#006c49] text-white text-xs font-bold px-3 py-1 rounded-md">
              100% Native Companion
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid: KCI Registration Checklist & Breeder Red Flags */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* KCI Checklist (Span 7) */}
        <div className="md:col-span-7 bg-[#ffffff] rounded-2xl shadow-md p-6 md:p-8 border border-[#d8e3fb] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="material-symbols-outlined text-3xl text-[#8d4b00] icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#111c2d]">KCI Registration Checklist</h2>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4 items-start p-4 bg-[#f0f3ff] rounded-xl border border-[#d8e3fb]/40 hover:bg-[#e7eeff] transition-colors">
                <div className="bg-[#b15f00] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm shadow-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111c2d] mb-1">Verify Breeder Papers</h3>
                  <p className="text-xs md:text-sm text-[#554336] leading-relaxed">
                    Ensure the breeder provides official Kennel Club of India (KCI) registration certificates for both parents with authentic microchip barcodes.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start p-4 bg-[#f0f3ff] rounded-xl border border-[#d8e3fb]/40 hover:bg-[#e7eeff] transition-colors">
                <div className="bg-[#b15f00] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm shadow-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111c2d] mb-1">Microchipping Verification</h3>
                  <p className="text-xs md:text-sm text-[#554336] leading-relaxed">
                    A registered puppy must be microchipped before handover. Request the ISO 11784/11785 15-digit microchip number and scan it at a local vet clinic.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start p-4 bg-[#f0f3ff] rounded-xl border border-[#d8e3fb]/40 hover:bg-[#e7eeff] transition-colors">
                <div className="bg-[#b15f00] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm shadow-xs">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111c2d] mb-1">Transfer of Ownership</h3>
                  <p className="text-xs md:text-sm text-[#554336] leading-relaxed">
                    Complete the transfer endorsement signature section provided by KCI to officially register the companion under your legal pet parent name.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e7eeff] text-xs text-[#554336] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#006c49]">info</span>
            <span>Always visit the breeder's premises in person to observe maternal health and sanitation.</span>
          </div>
        </div>

        {/* Red Flags (Span 5) */}
        <div className="md:col-span-5 bg-[#ffdad6]/40 rounded-2xl shadow-md p-6 md:p-8 border border-[#ba1a1a]/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="material-symbols-outlined text-3xl text-[#ba1a1a] icon-fill"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#111c2d]">Breeder Red Flags</h2>
            </div>

            <p className="text-xs md:text-sm text-[#554336] mb-6 leading-relaxed">
              Protect yourself and the animals. Avoid backyard breeders and illegal puppy mills by watching out for these warning signs:
            </p>

            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-xs md:text-sm text-[#111c2d]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-lg mt-0.5 shrink-0">close</span>
                <span>Refuses to let you see the puppy's mother or living conditions.</span>
              </li>
              <li className="flex items-start gap-3 text-xs md:text-sm text-[#111c2d]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-lg mt-0.5 shrink-0">close</span>
                <span>Always has multiple breeds and litters available year-round.</span>
              </li>
              <li className="flex items-start gap-3 text-xs md:text-sm text-[#111c2d]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-lg mt-0.5 shrink-0">close</span>
                <span>Offers "registered" puppies without official KCI paperwork.</span>
              </li>
              <li className="flex items-start gap-3 text-xs md:text-sm text-[#111c2d]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-lg mt-0.5 shrink-0">close</span>
                <span>Willing to sell puppies before they are 8 weeks old.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenReportMill}
            className="mt-8 w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-sm py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">flag</span>
            <span>Report Suspected Mills</span>
          </button>
        </div>
      </section>

      {/* Find a Shelter Near You Section */}
      <section className="bg-[#dee8ff] rounded-3xl p-6 md:p-12 text-center max-w-5xl mx-auto shadow-sm border border-[#d8e3fb]">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#111c2d] mb-3">
          Find a Shelter Near You
        </h2>
        <p className="text-sm md:text-base text-[#554336] mb-8 max-w-2xl mx-auto leading-relaxed">
          Ready to bring a new friend home? Search for verified animal shelters and rescue organizations across major Indian cities.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#554336]">
              search
            </span>
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Enter city (e.g., Mumbai, Bangalore, Delhi, Pune)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#ffffff] border border-[#dbc2b0]/40 focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 outline-none text-sm text-[#111c2d] shadow-sm transition-all"
            />
          </div>
          <button
            onClick={() => {}}
            className="bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            Search Shelters
          </button>
        </div>

        {/* City Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {quickCities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                setCitySearch('');
              }}
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all shadow-2xs ${
                selectedCity === city
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'bg-white text-[#554336] hover:bg-[#f0f3ff] border border-[#dbc2b0]/30'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Filtered Shelter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-10">
          {filteredShelters.map((shelter) => (
            <div
              key={shelter.id}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e7eeff] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-base md:text-lg text-[#111c2d] leading-snug">
                    {shelter.name}
                  </h3>
                  {shelter.verified && (
                    <span className="bg-[#6ffbbe] text-[#002113] text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-[#554336] mb-2 font-medium">
                  <span className="material-symbols-outlined text-sm text-[#8d4b00]">location_on</span>
                  <span>{shelter.address}</span>
                </div>

                <p className="text-xs text-[#554336] mb-4 leading-relaxed line-clamp-2">
                  {shelter.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {shelter.types.map((type, idx) => (
                    <span key={idx} className="bg-[#f0f3ff] text-[#554336] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {type}
                    </span>
                  ))}
                  <span className="bg-[#e7eeff] text-[#8d4b00] text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {shelter.dogsAvailable} Pups Available
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e7eeff] flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-[#554336]">
                  <span className="font-semibold text-[#111c2d]">{shelter.visitingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${shelter.phone}`}
                    className="bg-[#f0f3ff] hover:bg-[#d8e3fb] text-[#111c2d] p-2 rounded-lg text-xs font-semibold flex items-center justify-center"
                    title="Call Shelter"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                  </a>
                  <button
                    onClick={() => setSelectedShelterForModal(shelter)}
                    className="bg-[#006c49] hover:bg-[#005236] text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs"
                  >
                    Enquire to Adopt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enquire to Adopt Modal */}
      {selectedShelterForModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-[#d8e3fb] relative">
            <button
              onClick={() => setSelectedShelterForModal(null)}
              className="absolute top-4 right-4 p-2 text-[#554336] hover:text-[#111c2d] rounded-full hover:bg-[#f0f3ff]"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#006c49] text-2xl">volunteer_activism</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006c49]">Adoption Application</span>
            </div>

            <h3 className="text-xl font-extrabold text-[#111c2d] mb-1">
              {selectedShelterForModal.name}
            </h3>
            <p className="text-xs text-[#554336] mb-6">
              Connect with this verified shelter in {selectedShelterForModal.city}. Their team will contact you to schedule a meet-and-greet.
            </p>

            {inquirySubmitted ? (
              <div className="bg-[#6ffbbe]/30 text-[#002113] p-6 rounded-2xl text-center flex flex-col items-center gap-2 border border-[#00a572]/30">
                <span className="material-symbols-outlined text-4xl text-[#006c49] icon-fill">check_circle</span>
                <span className="font-bold text-base">Inquiry Sent Successfully!</span>
                <span className="text-xs">
                  The shelter volunteer team will reach out to you within 24 hours. Thank you for choosing adoption!
                </span>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#554336] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Sakshi Sharma"
                    className="w-full bg-[#f0f3ff] rounded-xl px-4 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#006c49] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#554336] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#f0f3ff] rounded-xl px-4 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#006c49] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#554336] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="w-full bg-[#f0f3ff] rounded-xl px-4 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#006c49] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#554336] mb-1">Preferred Companion Type</label>
                  <select className="w-full bg-[#f0f3ff] rounded-xl px-4 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#006c49] outline-none">
                    <option>Indie Puppy (2 - 4 Months)</option>
                    <option>Young Adult Desi Dog (6 - 18 Months)</option>
                    <option>Senior Loving Dog</option>
                    <option>Special Needs Companion</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#006c49] hover:bg-[#005236] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-95 mt-2 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                  <span>Submit Adoption Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
