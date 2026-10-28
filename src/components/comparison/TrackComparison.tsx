import React from 'react';
import { comparisonMatrix } from '../../data/comparison';
import { useTrack } from '../../context/TrackContext';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export const TrackComparison: React.FC = () => {
  const { track, setTrack } = useTrack();

  const scrollToSimulation = () => {
    const el = document.getElementById('simulation-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="track-comparison" className="py-20 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#0a0a0c]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#e0001a] font-semibold mb-2">
            Architectural Differences
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
            Academic vs. General Training.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
            While both tracks share the exact same Listening and Speaking modules, their Reading texts and Writing Task 1 requirements diverge fundamentally.
          </p>

          {/* Quick Track Switcher inside comparison */}
          <div className="mt-6 inline-flex items-center p-1 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#121215]">
            <button
              type="button"
              onClick={() => setTrack('academic')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                track === 'academic'
                  ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Highlight Academic</span>
            </button>
            <button
              type="button"
              onClick={() => setTrack('general')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                track === 'general'
                  ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Highlight General</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#121215] overflow-hidden shadow-apple dark:shadow-apple-dark">
          {/* Header row */}
          <div className="grid grid-cols-12 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#18181c] text-xs font-mono font-semibold uppercase tracking-wider text-[#1d1d1f] dark:text-[#ededed]">
            <div className="col-span-3 p-4 sm:px-6">Criterion</div>
            <div
              className={`col-span-4 sm:col-span-4 p-4 sm:px-6 transition-colors ${
                track === 'academic'
                  ? 'bg-[#e0001a]/5 text-[#e0001a] font-bold border-x border-[#e0001a]/20'
                  : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>IELTS Academic</span>
              </div>
            </div>
            <div
              className={`col-span-5 sm:col-span-5 p-4 sm:px-6 transition-colors ${
                track === 'general'
                  ? 'bg-[#e0001a]/5 text-[#e0001a] font-bold border-l border-[#e0001a]/20'
                  : ''
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span>IELTS General Training</span>
              </div>
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-[#e5e5e7] dark:divide-[#27272a]">
            {comparisonMatrix.map((row, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-12 text-xs sm:text-sm hover:bg-[#fbfbfd] dark:hover:bg-[#15151a] transition-colors"
                >
                  {/* Dimension */}
                  <div className="col-span-3 p-4 sm:px-6 bg-[#fbfbfd]/50 dark:bg-[#141418]/50 flex flex-col justify-center">
                    <span className="font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                      {row.dimension}
                    </span>
                    <span className="text-[10px] font-mono text-[#86868b] dark:text-[#a1a1aa] mt-0.5">
                      {row.relevanceTag}
                    </span>
                  </div>

                  {/* Academic Content */}
                  <div
                    className={`col-span-4 p-4 sm:px-6 flex items-center leading-relaxed whitespace-pre-line text-[#27272a] dark:text-[#d4d4d8] ${
                      track === 'academic'
                        ? 'bg-[#e0001a]/[0.02] border-x border-[#e0001a]/15 font-medium'
                        : ''
                    }`}
                  >
                    {row.academic}
                  </div>

                  {/* General Content */}
                  <div
                    className={`col-span-5 p-4 sm:px-6 flex items-center leading-relaxed whitespace-pre-line text-[#27272a] dark:text-[#d4d4d8] ${
                      track === 'general'
                        ? 'bg-[#e0001a]/[0.02] border-l border-[#e0001a]/15 font-medium'
                        : ''
                    }`}
                  >
                    {row.general}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-[#1d1d1f] dark:text-[#ededed]">
              Ready to test yourself on {track === 'academic' ? 'Academic' : 'General Training'}?
            </h3>
            <p className="text-xs text-[#86868b] dark:text-[#a1a1aa]">
              Launch the official interactive reading simulation with live timed calibration.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToSimulation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-[#ededed] dark:text-[#0a0a0c] dark:hover:bg-white text-xs font-semibold tracking-tight transition-all"
          >
            <span>Jump to Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
