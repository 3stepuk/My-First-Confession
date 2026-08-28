import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#0F0F0F] py-12 px-4 sm:px-6 lg:px-8 text-slate-500 font-sans-main">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-full border-2 gold-border flex items-center justify-center bg-[#141414]">
              <div className="w-3.5 h-3.5 gold-bg rounded-xs rotate-45 flex items-center justify-center">
                <span className="text-[9px] font-bold text-black -rotate-45">☩</span>
              </div>
            </div>
            <div>
              <div className="heading-font text-sm sm:text-base font-bold text-slate-200 tracking-wider">
                MY FIRST CONFESSION
              </div>
              <div className="text-xs body-font italic gold-text">
                Jesus calls me back to his friendship
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
            <button onClick={() => handleNav('home')} className="hover:text-[#D4A936] transition-colors cursor-pointer">
              Home
            </button>
            <span className="text-neutral-700">•</span>
            <button onClick={() => handleNav('lessons')} className="hover:text-[#D4A936] transition-colors cursor-pointer">
              12 Conversations
            </button>
            <span className="text-neutral-700">•</span>
            <button onClick={() => handleNav('drill')} className="hover:text-[#D4A936] transition-colors cursor-pointer">
              Memory Drills
            </button>
            <span className="text-neutral-700">•</span>
            <button onClick={() => handleNav('catechism')} className="hover:text-[#D4A936] transition-colors cursor-pointer">
              Summary Q&A
            </button>
            <span className="text-neutral-700">•</span>
            <button onClick={() => handleNav('appendices')} className="hover:text-[#D4A936] transition-colors cursor-pointer">
              Appendices
            </button>
            <span className="text-neutral-700">•</span>
            <button onClick={() => handleNav('profile')} className="hover:text-[#D4A936] transition-colors cursor-pointer">
              Sponsor / Mentor
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>
            Parish, family, and mentor catechetical series. Fully client-side & privacy-respecting.
          </p>
          <p className="body-font italic text-slate-400 text-sm">
            "Your sins are forgiven" — Luke 7:48
          </p>
        </div>
      </div>
    </footer>
  );
};
