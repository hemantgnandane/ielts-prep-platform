import React, { useState } from 'react';
import { Highlighter, Info, FileText } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const ReadingPassagePane: React.FC = () => {
  const { currentPassage, fontScale } = useSimulation();
  const [highlightMode, setHighlightMode] = useState<boolean>(false);

  const getFontSizeClass = () => {
    switch (fontScale) {
      case 'extralarge':
        return 'text-xl sm:text-2xl leading-relaxed';
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'standard':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0a0a0c] overflow-hidden select-text">
      {/* Pane Sticky Header */}
      <div className="px-6 py-3.5 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#e0001a]" />
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-[#ededed]">
            Reading Passage 1
          </span>
          <span className="text-sm text-[#86868b] dark:text-[#a1a1aa] font-mono">
            ({currentPassage.wordCount} words)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHighlightMode(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors border ${
              highlightMode
                ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-700 dark:text-yellow-400 font-semibold'
                : 'bg-white dark:bg-[#1c1c20] border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] dark:text-[#a1a1aa] hover:text-[#1d1d1f] dark:hover:text-[#ededed]'
            }`}
            title="Toggle selection highlight helper"
          >
            <Highlighter className="w-4 h-4" />
            <span className="hidden sm:inline">
              {highlightMode ? 'Highlighter On' : 'Highlighter'}
            </span>
          </button>
        </div>
      </div>

      {/* Passage Scrollable Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        {/* Title & Subtitle */}
        <div className="space-y-2 pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
            {currentPassage.title}
          </h2>
          <p className="text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
            {currentPassage.subtitle}
          </p>
        </div>

        {/* Instructions Note */}
        <div className="p-4 rounded-xl bg-[#f5f5f7] dark:bg-[#141418] border border-[#e5e5e7] dark:border-[#27272a] text-sm sm:text-base text-[#1d1d1f] dark:text-[#ededed] flex items-start gap-3">
          <Info className="w-5 h-5 text-[#e0001a] flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below. Read the text carefully and answer the True / False / Not Given questions in the right-hand panel.
          </span>
        </div>

        {/* Paragraphs with letter indicators */}
        <div className={`space-y-7 text-[#1d1d1f] dark:text-[#ededed] font-sans ${getFontSizeClass()}`}>
          {currentPassage.paragraphs.map((para) => (
            <div key={para.id} className="relative group flex items-start gap-3.5">
              {para.letter && (
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c20] border border-[#e5e5e7] dark:border-[#27272a] flex items-center justify-center font-mono font-bold text-sm text-[#1d1d1f] dark:text-[#ededed] mt-1 shadow-subtle group-hover:border-[#e0001a]/50 transition-colors">
                  {para.letter}
                </div>
              )}
              <div className="flex-1 space-y-3.5">
                {para.title && (
                  <h3 className="font-bold text-lg sm:text-xl text-[#1d1d1f] dark:text-[#ededed] tracking-tight">
                    {para.title}
                  </h3>
                )}
                {para.content.map((paragraphText, pIndex) => (
                  <p
                    key={pIndex}
                    className="leading-relaxed text-[#27272a] dark:text-[#d4d4d8]"
                  >
                    {paragraphText}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Attribution Footnote */}
        <div className="pt-6 border-t border-[#e5e5e7] dark:border-[#27272a] text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#71717a]">
          Source: {currentPassage.sourceAttribution}
        </div>
      </div>
    </div>
  );
};
