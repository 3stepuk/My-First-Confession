import React, { useState } from 'react';
import { ActiveTab, UserProgress, UserProfile } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  ScrollText, 
  HelpCircle, 
  UserCheck, 
  Home, 
  Menu, 
  X, 
  Cross,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  progress: UserProgress;
  profile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  profile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'lessons', label: 'Conversations (12)', icon: BookOpen },
    { id: 'drill', label: 'Memory Drill', icon: Sparkles },
    { id: 'catechism', label: 'Summary Q&A', icon: HelpCircle },
    { id: 'appendices', label: 'Appendices', icon: ScrollText },
    { id: 'profile', label: 'Sponsor / Mentor', icon: UserCheck },
  ];

  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / 12) * 100);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border-2 gold-border flex items-center justify-center bg-[#141414] group-hover:scale-105 transition-transform shadow-sm flex-shrink-0">
              <div className="w-3.5 h-3.5 gold-bg rounded-xs rotate-45 flex items-center justify-center">
                <span className="text-[9px] font-bold text-black -rotate-45">☩</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="heading-font text-base sm:text-lg font-bold tracking-widest text-slate-100 group-hover:text-[#D4A936] transition-colors">
                  MY FIRST CONFESSION
                </span>
              </div>
              <p className="text-[11px] body-font italic gold-text/90 hidden sm:block tracking-wide">
                Jesus calls me back to his friendship
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded text-xs uppercase tracking-wider font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#1C1C1C] text-[#D4A936] border border-[#D4A936]/40 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#161616]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4A936]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Progress Badge & Profile Avatar */}
          <div className="hidden lg:flex items-center space-x-3 pl-3 border-l border-white/5">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-sans-main">Progress</div>
              <div className="text-xs font-semibold text-[#D4A936]">
                {completedCount}/12 Done
              </div>
            </div>
            <button
              onClick={() => handleNavClick('profile')}
              title={profile.candidateName || 'User Profile / Sponsor'}
              className="w-9 h-9 rounded-full border border-white/10 bg-[#161616] hover:border-[#D4A936]/50 flex items-center justify-center text-xs font-semibold text-slate-200 transition-colors"
            >
              {profile.candidateName ? profile.candidateName.charAt(0).toUpperCase() : '☩'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <div className="text-xs font-semibold px-2 py-0.5 rounded bg-[#181818] border border-white/5 text-[#D4A936]">
              {completedCount}/12
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#181818] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-white/5 px-4 pt-2 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1C1C1C] text-[#D4A936] border border-[#D4A936]/40'
                    : 'text-slate-400 hover:bg-[#181818] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A936]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.id === 'lessons' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1F1F1F] text-[#D4A936]">
                    {completedCount}/12
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
