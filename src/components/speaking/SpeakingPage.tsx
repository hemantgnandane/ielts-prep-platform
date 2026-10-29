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
      topics: 'Abstract concepts, societal trends & thematic analysis'
    }
  ];

  // If a test is active, render the speaking cue-card / recorder workspace
  if (activeTest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed]">
        {/* Top Header inside active test */}
        <div className="px-6 py-4 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveTest(null)}
            className="inline-flex items-center gap-2 text-base font-bold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#e0001a]" />
            <span>Back to All Speaking Tests</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-mono font-bold px-4 py-1.5 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase tracking-wider">
              {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
            </span>
            <span className="text-sm font-mono text-[#86868b] font-semibold">
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] py-8 sm:py-12">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
        {/* Top Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <div>
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors mb-2 group"
            >
              <ArrowLeft className="w-5 h-5 text-[#e0001a] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
              Speaking
            </h1>
          </div>

          {/* Simple Tab Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-sm sm:text-base font-medium self-start sm:self-auto shadow-subtle">
            <button
              type="button"
              onClick={() => setTab('all')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                tab === 'all'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              All Tests
            </button>
            <button
              type="button"
              onClick={() => setTab('full')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                tab === 'full'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Full Tests (1–20)
            </button>
            <button
              type="button"
              onClick={() => setTab('parts')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                tab === 'parts'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Part-wise (1–3)
            </button>
          </div>
        </div>

        {/* 1. Full Tests Grid: Test 1 to Test 20 */}
        {(tab === 'all' || tab === 'full') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Full Tests
              </h2>
              <span className="text-sm sm:text-base font-mono text-[#86868b] font-medium">
                Test 1 to Test 20 · 3 Parts Each
              </span>
            </div>

            {/* Clean Grid of 20 Tests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
              {fullTests.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveTest({ kind: 'full', id: t.id, title: t.title })}
                  className="group cursor-pointer p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121215] border-2 border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between min-h-[160px]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#86868b] font-semibold">
                      <span>{t.parts}</span>
                      <span className="text-[#e0001a]">{t.duration}</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                      {t.title}
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-base font-bold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start Test</span>
                    <ArrowRight className="w-5 h-5 text-[#e0001a] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Part-Wise Tests: Part 1, Part 2, Part 3 */}
        {(tab === 'all' || tab === 'parts') && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Part-Wise Tests
              </h2>
              <span className="text-sm sm:text-base font-mono text-[#86868b] font-medium">
                Part 1 to Part 3 Practice
              </span>
            </div>

            {/* 3 Large Cards for Part 1, Part 2, Part 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {partTests.map((p) => (
                <div
                  key={p.part}
                  onClick={() => setActiveTest({ kind: 'part', partNumber: p.part as 1 | 2 | 3, title: p.title })}
                  className="group cursor-pointer p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#121215] border-2 border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between min-h-[240px]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a]">PART 0{p.part}</span>
                      <span className="font-semibold">{p.duration}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a]">
                        <Mic className="w-6 h-6 text-[#e0001a]" />
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                          {p.title}
                        </div>
                        <div className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                          {p.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed pt-1">
                      {p.topics}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start {p.title}</span>
                    <ArrowRight className="w-5 h-5 text-[#e0001a] group-hover:translate-x-1.5 transition-transform" />
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
