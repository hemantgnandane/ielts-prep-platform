import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mic } from 'lucide-react';
import { SpeakingWorkspace } from '../simulation/SpeakingWorkspace';

export interface SpeakingPageProps {
  onBackToHome: () => void;
}

export type ActiveSpeakingTestType =
  | { kind: 'full'; id: number; title: string }
  | { kind: 'part'; partNumber: 1 | 2 | 3; title: string }
  | null;

export const SpeakingPage: React.FC<SpeakingPageProps> = ({ onBackToHome }) => {
  const [tab, setTab] = useState<'all' | 'full' | 'parts'>('all');
  const [activeTest, setActiveTest] = useState<ActiveSpeakingTestType>(null);

  // 20 Full Speaking Tests (Part 1 + Part 2 + Part 3)
  const fullTests = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Test ${i + 1}`,
    parts: '3 Parts',
    duration: '11–14 Min'
  }));

  // 3 Part-wise Tests
  const partTests = [
    {
      part: 1,
      title: 'Part 1',
      subtitle: 'Introduction & Interview',
      duration: '4–5 Min',
      topics: 'Hometown, work/study, daily routine, hobbies'
    },
    {
      part: 2,
      title: 'Part 2',
      subtitle: 'Individual Long Turn (Cue Card)',
      duration: '3–4 Min',
      topics: '1 Min preparation + 2 Min uninterrupted speech'
    },
    {
      part: 3,
      title: 'Part 3',
      subtitle: 'Two-Way In-Depth Discussion',
      duration: '4–5 Min',
      topics: 'Abstract concepts, societal trends & analysis'
    }
  ];

  // If a test is active, render the speaking cue-card / recorder workspace
  if (activeTest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed]">
        {/* Top Header inside active test */}
        <div className="px-6 py-3 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveTest(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#e0001a]" />
            <span>Back to All Speaking Tests</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase">
              {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
            </span>
            <span className="text-xs font-mono text-[#86868b]">
              {activeTest.kind === 'full' ? '3 Parts · 11–14 Min' : activeTest.partNumber === 2 ? 'Cue Card · 1m Prep + 2m Speech' : 'Interview Q&A'}
            </span>
          </div>
        </div>

        {/* Official Speaking Workspace with Cue Card & Prep Timer */}
        <div className="flex-1 min-h-[700px]">
          <SpeakingWorkspace />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] py-8 md:py-12">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        {/* Top Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <div>
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 text-[#e0001a]" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
              Speaking
            </h1>
          </div>

          {/* Simple Tab Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-xs sm:text-sm font-medium self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTab('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tab === 'all'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              All Tests
            </button>
            <button
              type="button"
              onClick={() => setTab('full')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tab === 'full'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Full Tests (1–20)
            </button>
            <button
              type="button"
              onClick={() => setTab('parts')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tab === 'parts'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Part-wise (1–3)
            </button>
          </div>
        </div>

        {/* 1. Full Tests Grid: Test 1 to Test 20 */}
        {(tab === 'all' || tab === 'full') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Full Tests
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#86868b]">
                Test 1 to Test 20 · 3 Parts Each
              </span>
            </div>

            {/* Clean Grid of 20 Tests */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full">
              {fullTests.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveTest({ kind: 'full', id: t.id, title: t.title })}
                  className="group cursor-pointer p-4 sm:p-5 rounded-xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] mb-1.5">
                      <span>3 PARTS</span>
                      <span>14 MIN</span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                      {t.title}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-xs font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#e0001a] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Part-Wise Tests: Part 1, Part 2, Part 3 */}
        {(tab === 'all' || tab === 'parts') && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Part-Wise Tests
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#86868b]">
                Part 1 to Part 3 Practice
              </span>
            </div>

            {/* 3 Clean Cards for Part 1, Part 2, Part 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
              {partTests.map((p) => (
                <div
                  key={p.part}
                  onClick={() => setActiveTest({ kind: 'part', partNumber: p.part as 1 | 2 | 3, title: p.title })}
                  className="group cursor-pointer p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a]">PART 0{p.part}</span>
                      <span>{p.duration}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a]">
                        <Mic className="w-5 h-5 text-[#e0001a]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                          {p.title}
                        </div>
                        <div className="text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                          {p.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm text-[#86868b] dark:text-[#a1a1aa] leading-relaxed pt-1">
                      {p.topics}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start {p.title}</span>
                    <ArrowRight className="w-4 h-4 text-[#e0001a] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
