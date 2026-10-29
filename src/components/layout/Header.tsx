import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTrack } from '../../context/TrackContext';

export type PageView = 'home' | 'listening' | 'reading' | 'writing';

export interface HeaderProps {
  currentView?: PageView;
  onNavigate?: (view: PageView, targetSectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView = 'home',
  onNavigate
}) => {
  const { theme, toggleTheme } = useTheme();
  const { track, setTrack } = useTrack();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: PageView, targetId?: string) => {
    if (onNavigate) {
      onNavigate(view, targetId);
    } else {
      if (view === 'home' && targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-md border-[#e5e5e7] dark:border-[#27272a]'
          : 'bg-white dark:bg-[#0a0a0c] border-[#e5e5e7] dark:border-[#27272a]'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Nav Links */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group tracking-apple focus:outline-none text-left"
            aria-label="PREP Home"
          >
            <div className="flex items-baseline">
              <span className="text-2xl font-bold tracking-tighter text-[#1d1d1f] dark:text-[#ededed]">
                PREP
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e0001a] inline-block ml-0.5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-[#86868b] dark:text-[#a1a1aa] font-bold">
              PRO
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-7 text-sm font-medium tracking-tight">
            <button
              type="button"
              onClick={() => handleNavClick('home', 'practice-modules')}
              className="text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed] transition-colors"
            >
              2×2 Modules
            </button>

            {/* Reading Tab */}
            <button
              type="button"
              onClick={() => handleNavClick('reading')}
              className={`transition-all ${
                currentView === 'reading'
                  ? 'text-[#1d1d1f] dark:text-white font-bold underline underline-offset-8 decoration-[#e0001a] decoration-2'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed]'
              }`}
            >
              <span>Reading</span>
            </button>

            {/* Listening Tab */}
            <button
              type="button"
              onClick={() => handleNavClick('listening')}
              className={`transition-all ${
                currentView === 'listening'
                  ? 'text-[#1d1d1f] dark:text-white font-bold underline underline-offset-8 decoration-[#e0001a] decoration-2'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed]'
              }`}
            >
              <span>Listening</span>
            </button>

            {/* Writing Tab */}
            <button
              type="button"
              onClick={() => handleNavClick('writing')}
              className={`transition-all ${
                currentView === 'writing'
                  ? 'text-[#1d1d1f] dark:text-white font-bold underline underline-offset-8 decoration-[#e0001a] decoration-2'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed]'
              }`}
            >
              <span>Writing</span>
            </button>

            {/* CD-Simulator */}
            <button
              type="button"
              onClick={() => handleNavClick('home', 'simulation-engine')}
              className="text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed] transition-colors flex items-center gap-1.5"
            >
              <span>CD-Simulator</span>
              <span className="inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 bg-[#e0001a]/10 text-[#e0001a] rounded font-bold">
                LIVE
              </span>
            </button>
          </nav>
        </div>

        {/* Right Controls: Track Selector Pill, Theme Toggle, CTA */}
        <div className="flex items-center gap-3">
          {/* Track Selector Pill */}
          <div
            className="inline-flex items-center p-1 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-xs sm:text-sm font-medium"
            role="group"
            aria-label="Exam track selector"
          >
            <button
              type="button"
              onClick={() => setTrack('academic')}
              className={`px-3.5 py-1 rounded-full transition-all duration-150 ${
                track === 'academic'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] dark:text-[#a1a1aa] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Academic
            </button>
            <button
              type="button"
              onClick={() => setTrack('general')}
              className={`px-3.5 py-1 rounded-full transition-all duration-150 ${
                track === 'general'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] dark:text-[#a1a1aa] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              General
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-[#1d1d1f] dark:text-[#ededed] hover:border-[#86868b] transition-colors focus:outline-none"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Contextual Action Button */}
          {currentView !== 'home' ? (
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-xs sm:text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed] hover:border-black dark:hover:border-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#e0001a]" />
              <span>Back to Home</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNavClick('home', 'practice-modules')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-98 transition-all shadow-subtle"
            >
              <span>Start Practice</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e0001a]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
