import React, { useState } from 'react';

interface ReportMillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportMillModal: React.FC<ReportMillModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [city, setCity] = useState('');
  const [breederName, setBreederName] = useState('');
  const [complaintType, setComplaintType] = useState('unregistered_mill');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-[#ffdad6] my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#554336] hover:text-[#111c2d] rounded-full hover:bg-[#f0f3ff]"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#ba1a1a] text-2xl icon-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ba1a1a]">
            Animal Welfare Enforcement
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-[#111c2d] mb-1">
          Report Suspected Puppy Mill / Illegal Breeder
        </h2>
        <p className="text-xs text-[#554336] mb-6">
          The Animal Welfare Board of India (AWBI) and Prevention of Cruelty to Animals (Dog Breeding & Marketing Rules, 2017) require mandatory registration. Reports are forwarded to accredited animal rights inspection teams.
        </p>

        {submitted ? (
          <div className="bg-[#ffdad6]/40 text-[#111c2d] p-6 rounded-2xl text-center flex flex-col items-center gap-2 border border-[#ba1a1a]/30">
            <span className="material-symbols-outlined text-4xl text-[#006c49] icon-fill">check_circle</span>
            <span className="font-bold text-base text-[#111c2d]">Report Logged & Forwarded</span>
            <span className="text-xs text-[#554336]">
              Thank you for protecting innocent animals. Your report has been dispatched to local animal protection task forces.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#554336] mb-1">City / Region</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai, Pune, Thane"
                  className="w-full bg-[#f0f3ff] rounded-xl px-3.5 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#ba1a1a] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#554336] mb-1">Breeder / Kennel Name or Contact</label>
                <input
                  type="text"
                  required
                  value={breederName}
                  onChange={(e) => setBreederName(e.target.value)}
                  placeholder="e.g. XYZ Kennel or Phone #"
                  className="w-full bg-[#f0f3ff] rounded-xl px-3.5 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#ba1a1a] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#554336] mb-1">Violation Category</label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full bg-[#f0f3ff] rounded-xl px-3.5 py-2.5 text-sm border border-[#dbc2b0]/30 focus:border-[#ba1a1a] outline-none font-medium text-[#111c2d]"
              >
                <option value="unregistered_mill">Unregistered Backyard Puppy Mill / Cramped Cages</option>
                <option value="underage_sale">Selling Puppies Younger than 8 Weeks</option>
                <option value="fake_papers">Fake KCI Papers / Refusal to Show Mother</option>
                <option value="sick_puppy">Selling Sick / Unvaccinated Puppies</option>
                <option value="cruelty">Physical Cruelty & Neglect</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#554336] mb-1">Incident Details & Address/Location</label>
              <textarea
                rows={3}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what you observed (address, online listing links, conditions of parent dogs)..."
                className="w-full bg-[#f0f3ff] rounded-xl p-3 text-sm border border-[#dbc2b0]/30 focus:border-[#ba1a1a] outline-none"
              />
            </div>

            {/* Helpline Contacts */}
            <div className="bg-[#f0f3ff] p-3.5 rounded-xl border border-[#d8e3fb] text-xs text-[#554336] space-y-1">
              <span className="font-bold text-[#111c2d] block">Official Emergency Helplines:</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span>• AWBI Helpline: <strong>0129-2555700</strong></span>
                <span>• PETA India Anti-Cruelty: <strong>+91 (0) 98201 22602</strong></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">flag</span>
              <span>Submit Welfare Complaint</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
