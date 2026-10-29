import React, { useState } from 'react';
import { useTrack } from '../../context/TrackContext';

const SCORE_MAP: Record<string, { listening: string; readingAcademic: string; readingGeneral: string }> = {
  '5.0': { listening: '16–17', readingAcademic: '15–18', readingGeneral: '23–26' },
  '5.5': { listening: '18–22', readingAcademic: '19–22', readingGeneral: '27–29' },
  '6.0': { listening: '23–25', readingAcademic: '23–26', readingGeneral: '30–31' },
  '6.5': { listening: '26–29', readingAcademic: '27–29', readingGeneral: '32–33' },
  '7.0': { listening: '30–31', readingAcademic: '30–32', readingGeneral: '34–35' },
  '7.5': { listening: '32–34', readingAcademic: '33–34', readingGeneral: '36' },
  '8.0': { listening: '35–36', readingAcademic: '35–36', readingGeneral: '37–38' },
  '8.5': { listening: '37–38', readingAcademic: '37–38', readingGeneral: '39' },
  '9.0': { listening: '39–40', readingAcademic: '39–40', readingGeneral: '40' },
};

export const BandScoreCalculator: React.FC = () => {
  const { track } = useTrack();
  const [band, setBand] = useState<string>('7.5');

  const scores = SCORE_MAP[band] || SCORE_MAP['7.5'];
  const readingScore = track === 'general' ? scores.readingGeneral : scores.readingAcademic;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 px-6 py-4 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] shadow-sm">
      {/* Scroll bar with Band display */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1aa] whitespace-nowrap">
          Target Band
        </span>
        <span className="text-lg font-bold font-mono px-2.5 py-0.5 rounded-lg bg-[#e0001a] text-white">
          {band}
        </span>
        <input
          type="range"
          min="5.0"
          max="9.0"
          step="0.5"
          value={band}
          onChange={(e) => setBand(parseFloat(e.target.value).toFixed(1))}
          className="w-full sm:w-44 h-2 bg-[#e5e5e7] dark:bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#e0001a]"
        />
      </div>

      {/* Marks needed beside it */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono text-[#1d1d1f] dark:text-[#ededed] whitespace-nowrap">
        <span>
          Listening: <strong className="text-[#e0001a] text-sm sm:text-base font-bold">{scores.listening}</strong>
          <span className="text-[#86868b] dark:text-[#71717a]"> / 40</span>
        </span>
        <span className="text-[#86868b] dark:text-[#52525b]">•</span>
        <span>
          Reading: <strong className="text-[#e0001a] text-sm sm:text-base font-bold">{readingScore}</strong>
          <span className="text-[#86868b] dark:text-[#71717a]"> / 40</span>
        </span>
      </div>
    </div>
  );
};
