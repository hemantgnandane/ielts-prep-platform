import React, { useState } from 'react';
import { Headphones, BookOpen, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTrack } from '../../context/TrackContext';

interface BandRequirement {
  band: number;
  level: string;
  listening: { min: number; max: number; text: string; maxMistakes: number };
  readingAcademic: { min: number; max: number; text: string; maxMistakes: number };
  readingGeneral: { min: number; max: number; text: string; maxMistakes: number };
  description: string;
}

const BAND_DATA: Record<string, BandRequirement> = {
  '9.0': {
    band: 9.0,
    level: 'Expert User',
    listening: { min: 39, max: 40, text: '39 – 40', maxMistakes: 1 },
    readingAcademic: { min: 39, max: 40, text: '39 – 40', maxMistakes: 1 },
    readingGeneral: { min: 40, max: 40, text: '40', maxMistakes: 0 },
    description: 'Fully operational command: accurate, fluent with complete understanding.',
  },
  '8.5': {
    band: 8.5,
    level: 'Very Good User +',
    listening: { min: 37, max: 38, text: '37 – 38', maxMistakes: 3 },
    readingAcademic: { min: 37, max: 38, text: '37 – 38', maxMistakes: 3 },
    readingGeneral: { min: 39, max: 39, text: '39', maxMistakes: 1 },
    description: 'High mastery: occasional unsystematic inaccuracies and misunderstandings.',
  },
  '8.0': {
    band: 8.0,
    level: 'Very Good User',
    listening: { min: 35, max: 36, text: '35 – 36', maxMistakes: 5 },
    readingAcademic: { min: 35, max: 36, text: '35 – 36', maxMistakes: 5 },
    readingGeneral: { min: 37, max: 38, text: '37 – 38', maxMistakes: 3 },
    description: 'Operational command with only rare unsystematic inaccuracies.',
  },
  '7.5': {
    band: 7.5,
    level: 'Good User + (Most Requested)',
    listening: { min: 32, max: 34, text: '32 – 34', maxMistakes: 8 },
    readingAcademic: { min: 33, max: 34, text: '33 – 34', maxMistakes: 7 },
    readingGeneral: { min: 36, max: 36, text: '36', maxMistakes: 4 },
    description: 'Top target for university admissions and skilled immigration visas.',
  },
  '7.0': {
    band: 7.0,
    level: 'Good User (Standard Visa & Uni)',
    listening: { min: 30, max: 31, text: '30 – 31', maxMistakes: 10 },
    readingAcademic: { min: 30, max: 32, text: '30 – 32', maxMistakes: 10 },
    readingGeneral: { min: 34, max: 35, text: '34 – 35', maxMistakes: 6 },
    description: 'Operational command: handles complex language and detailed reasoning.',
  },
  '6.5': {
    band: 6.5,
    level: 'Competent User +',
    listening: { min: 26, max: 29, text: '26 – 29', maxMistakes: 14 },
    readingAcademic: { min: 27, max: 29, text: '27 – 29', maxMistakes: 13 },
    readingGeneral: { min: 32, max: 33, text: '32 – 33', maxMistakes: 8 },
    description: 'Generally effective command: understands complex language in familiar contexts.',
  },
  '6.0': {
    band: 6.0,
    level: 'Competent User',
    listening: { min: 23, max: 25, text: '23 – 25', maxMistakes: 17 },
    readingAcademic: { min: 23, max: 26, text: '23 – 26', maxMistakes: 17 },
    readingGeneral: { min: 30, max: 31, text: '30 – 31', maxMistakes: 10 },
    description: 'Undergraduate baseline: can use and understand fairly complex language.',
  },
  '5.5': {
    band: 5.5,
    level: 'Modest User +',
    listening: { min: 18, max: 22, text: '18 – 22', maxMistakes: 22 },
    readingAcademic: { min: 19, max: 22, text: '19 – 22', maxMistakes: 21 },
    readingGeneral: { min: 27, max: 29, text: '27 – 29', maxMistakes: 13 },
    description: 'Partial command: copes with overall meaning in most common situations.',
  },
  '5.0': {
    band: 5.0,
    level: 'Modest User',
    listening: { min: 16, max: 17, text: '16 – 17', maxMistakes: 24 },
    readingAcademic: { min: 15, max: 18, text: '15 – 18', maxMistakes: 25 },
    readingGeneral: { min: 23, max: 26, text: '23 – 26', maxMistakes: 17 },
    description: 'Basic command: prone to mistakes, but handles basic everyday communication.',
  },
  '4.5': {
    band: 4.5,
    level: 'Limited User +',
    listening: { min: 13, max: 15, text: '13 – 15', maxMistakes: 27 },
    readingAcademic: { min: 13, max: 14, text: '13 – 14', maxMistakes: 27 },
    readingGeneral: { min: 19, max: 22, text: '19 – 22', maxMistakes: 21 },
    description: 'Basic competence is limited to familiar situations with frequent problems.',
  },
};

const BANDS = ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'];

export const BandScoreCalculator: React.FC = () => {
  const { track } = useTrack();
  const [selectedBand, setSelectedBand] = useState<string>('7.5');

  const current = BAND_DATA[selectedBand] || BAND_DATA['7.5'];
  const readingData = track === 'general' ? current.readingGeneral : current.readingAcademic;

  const listeningPercentage = Math.round((current.listening.min / 40) * 100);
  const readingPercentage = Math.round((readingData.min / 40) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-[#e5e5e7] dark:border-[#27272a] bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md p-6 sm:p-8 shadow-apple dark:shadow-apple-dark transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#f0f0f2] dark:border-[#1e1e24]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#e0001a] mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>Target Band Score Estimator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
            Scroll to your desired Band Score
          </h3>
          <p className="text-xs sm:text-sm text-[#86868b] dark:text-[#a1a1aa] mt-0.5">
            Instantly see the exact marks needed out of 40 and max allowable mistakes.
          </p>
        </div>

        {/* Selected Band Callout */}
        <div className="flex items-center gap-3 bg-[#f5f5f7] dark:bg-[#1a1a1e] px-4 py-2.5 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1aa]">
              Selected Target
            </div>
            <div className="text-xs font-semibold text-[#1d1d1f] dark:text-[#ededed]">
              {current.level}
            </div>
          </div>
          <div className="px-3 py-1 rounded-xl bg-[#e0001a] text-white font-mono text-xl sm:text-2xl font-bold shadow-sm">
            {selectedBand}
          </div>
        </div>
      </div>

      {/* Interactive Band Scroller / Slider Bar */}
      <div className="py-6 space-y-4">
        {/* Quick-Select Snap Pills */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BANDS.map((band) => {
            const isSelected = selectedBand === band;
            return (
              <button
                key={band}
                type="button"
                onClick={() => setSelectedBand(band)}
                className={`flex-1 min-w-[50px] py-2 px-1 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all text-center ${
                  isSelected
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle scale-105'
                    : 'bg-[#f5f5f7] dark:bg-[#18181b] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white border border-transparent hover:border-[#e5e5e7] dark:hover:border-[#27272a]'
                }`}
              >
                {band}
              </button>
            );
          })}
        </div>

        {/* Continuous Range Slider */}
        <div className="relative px-2">
          <input
            type="range"
            min="5.0"
            max="9.0"
            step="0.5"
            value={selectedBand}
            onChange={(e) => setSelectedBand(parseFloat(e.target.value).toFixed(1))}
            className="w-full h-2.5 bg-[#e5e5e7] dark:bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#e0001a]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#86868b] dark:text-[#a1a1aa] mt-1.5 px-1">
            <span>Band 5.0 (Foundation)</span>
            <span>Band 7.0 (Baseline)</span>
            <span>Band 9.0 (Perfect)</span>
          </div>
        </div>
      </div>

      {/* Score Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Listening Card */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#18181c] relative overflow-hidden transition-all hover:border-[#86868b]/30">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#e0001a]/10 dark:bg-[#e0001a]/20 flex items-center justify-center text-[#e0001a]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1d1d1f] dark:text-[#ededed]">
                  Listening Module
                </h4>
                <span className="text-xs text-[#86868b] dark:text-[#a1a1aa] font-mono">
                  40 Questions · 30 Mins
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#1d1d1f]/5 dark:bg-white/10 text-[#1d1d1f] dark:text-[#ededed]">
              Standard
            </span>
          </div>

          <div className="pt-2 flex items-baseline justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1aa]">
                Required Marks
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] dark:text-[#ededed] font-mono tracking-tight">
                {current.listening.text}{' '}
                <span className="text-base font-normal text-[#86868b] dark:text-[#a1a1aa]">/ 40</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Max {current.listening.maxMistakes} mistakes
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-[#e5e5e7] dark:bg-[#27272a] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#e0001a] h-full rounded-full transition-all duration-300"
              style={{ width: `${listeningPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-[#86868b] dark:text-[#a1a1aa] mt-1.5">
            <span>Accuracy: {listeningPercentage}%</span>
            <span>Target: Band {selectedBand}</span>
          </div>
        </div>

        {/* Reading Card */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#18181c] relative overflow-hidden transition-all hover:border-[#86868b]/30">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#e0001a]/10 dark:bg-[#e0001a]/20 flex items-center justify-center text-[#e0001a]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1d1d1f] dark:text-[#ededed]">
                  Reading Module
                </h4>
                <span className="text-xs text-[#86868b] dark:text-[#a1a1aa] font-mono capitalize">
                  {track === 'general' ? 'General Training' : 'Academic'} · 60 Mins
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#e0001a]/10 text-[#e0001a]">
              {track === 'general' ? 'GT Scale' : 'Academic Scale'}
            </span>
          </div>

          <div className="pt-2 flex items-baseline justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1aa]">
                Required Marks
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] dark:text-[#ededed] font-mono tracking-tight">
                {readingData.text}{' '}
                <span className="text-base font-normal text-[#86868b] dark:text-[#a1a1aa]">/ 40</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Max {readingData.maxMistakes} mistakes
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-[#e5e5e7] dark:bg-[#27272a] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#1d1d1f] dark:bg-[#ededed] h-full rounded-full transition-all duration-300"
              style={{ width: `${readingPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-[#86868b] dark:text-[#a1a1aa] mt-1.5">
            <span>Accuracy: {readingPercentage}%</span>
            <span>Target: Band {selectedBand}</span>
          </div>
        </div>
      </div>

      {/* Bottom Key Takeaway Callout */}
      <div className="mt-4 p-3.5 rounded-xl bg-[#f5f5f7] dark:bg-[#1a1a1e] border border-[#e5e5e7]/60 dark:border-[#27272a] flex items-center justify-between text-xs text-[#86868b] dark:text-[#a1a1aa]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e0001a] shrink-0" />
          <span>{current.description}</span>
        </div>
        <span className="font-mono text-[11px] text-[#1d1d1f] dark:text-[#ededed] shrink-0 font-medium hidden sm:inline">
          Official 40-Score Standards
        </span>
      </div>
    </div>
  );
};
