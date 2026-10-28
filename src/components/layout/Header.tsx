import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTrack } from '../../context/TrackContext';

export const Header: React.FC = () => {
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="flex items-center gap-2.5 group tracking-apple focus:outline-none"
            aria-label="IELTS PREP Home"
          >
            <div className="flex items-baseline">
              <span className="text-2xl font-bold tracking-tighter text-[#1d1d1f] dark:text-[#ededed]">
                IELTS
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e0001a] inline-block ml-0.5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-[#86868b] dark:text-[#a1a1aa] font-bold">
              PREP
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-tight">
            <button
              onClick={() => scrollTo('practice-modules')}
              className="text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed] transition-colors"
            >
              2×2 Modules
            </button>
            <button
              onClick={() => scrollTo('simulation-engine')}
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

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-9 h-9 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] flex items-center justify-center text-[#1d1d1f] dark:text-[#ededed] hover:border-[#86868b] dark:hover:border-[#a1a1aa] transition-colors focus:outline-none"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={() => scrollTo('simulation-engine')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-[#ededed] dark:text-[#0a0a0c] dark:hover:bg-white text-sm font-semibold tracking-tight transition-all active:scale-[0.98]"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-4 h-4 text-[#e0001a]" />
          </button>
        </div>
      </div>
    </header>
  );
};
