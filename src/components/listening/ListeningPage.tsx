import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, RotateCcw, Volume2, Pause } from 'lucide-react';

export interface ListeningPageProps {
  onBackToHome: () => void;
}

export type ActiveTestType =
  | { kind: 'full'; id: number; title: string }
  | { kind: 'part'; partNumber: number; title: string }
  | null;

export const ListeningPage: React.FC<ListeningPageProps> = ({ onBackToHome }) => {
  const [tab, setTab] = useState<'all' | 'full' | 'parts'>('all');
  const [activeTest, setActiveTest] = useState<ActiveTestType>(null);

  // Simple audio player state for active test
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15);

  // 20 Full Tests
  const fullTests = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Test ${i + 1}`,
    questions: '40 Questions',
    duration: '30 Min'
  }));

  // 4 Part-wise Tests
  const partTests = [
    { part: 1, title: 'Part 1', questions: 'Questions 1–10', duration: '7 Min' },
    { part: 2, title: 'Part 2', questions: 'Questions 11–20', duration: '7 Min' },
    { part: 3, title: 'Part 3', questions: 'Questions 21–30', duration: '7 Min' },
    { part: 4, title: 'Part 4', questions: 'Questions 31–40', duration: '8 Min' }
  ];

  // Active test runner screen (waiting for user exam interface)
  if (activeTest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] py-8 px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <button
            type="button"
            onClick={() => {
              setActiveTest(null);
              setIsPlaying(false);
            }}
            className="inline-flex items-center gap-2 text-base font-bold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#e0001a]" />
            <span>Back to All Tests</span>
          </button>

          <span className="text-sm font-mono font-bold px-4 py-1.5 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase tracking-wider">
            {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
          </span>
        </div>

        {/* Minimal Audio Player */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPlaying(prev => !prev)}
              className="w-14 h-14 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform shadow-subtle"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <div>
              <div className="text-xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
                {activeTest.kind === 'full' ? `Full Test ${activeTest.id}` : activeTest.title} Audio
              </div>
              <div className="text-sm text-[#86868b] font-mono mt-0.5">
                {isPlaying ? 'Playing • Single stream' : 'Ready'} · Track #01
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-lg space-y-2">
            <div className="w-full bg-[#e5e5e7] dark:bg-[#27272a] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#e0001a] h-full transition-all duration-300"
                style={{ width: `${isPlaying ? progress + 12 : progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm font-mono text-[#86868b]">
              <span>01:15</span>
              <span>{activeTest.kind === 'full' ? '30:00' : '07:00'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setProgress(0)}
              className="p-3 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] hover:text-[#1d1d1f]"
              title="Restart"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#27272a] border border-[#e5e5e7] dark:border-[#27272a] text-sm font-mono text-[#86868b]">
              <Volume2 className="w-4 h-4" />
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Minimal Exam Placeholder */}
        <div className="p-16 rounded-3xl border-2 border-dashed border-[#e5e5e7] dark:border-[#27272a] text-center space-y-4">
          <div className="text-2xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
            Ready for your Exam Interface
          </div>
          <p className="text-base text-[#86868b] dark:text-[#a1a1aa] max-w-lg mx-auto leading-relaxed">
            Tell me or upload a screenshot of how you want this exam screen to look, and I will build it exactly like that!
          </p>
          <button
            type="button"
            onClick={() => setActiveTest(null)}
            className="px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Change Test
          </button>
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
              Listening
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
              Part-wise (1–4)
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
                Test 1 to Test 20 · 40 Questions Each
              </span>
            </div>

            {/* Clean Grid of 20 Tests with standard readable text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
              {fullTests.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveTest({ kind: 'full', id: t.id, title: t.title })}
                  className="group cursor-pointer p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121215] border-2 border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between min-h-[160px]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#86868b] font-semibold">
                      <span>{t.questions}</span>
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

        {/* 2. Part-Wise Tests: Part 1, Part 2, Part 3, Part 4 */}
        {(tab === 'all' || tab === 'parts') && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Part-Wise Tests
              </h2>
              <span className="text-sm sm:text-base font-mono text-[#86868b] font-medium">
                Part 1 to Part 4 · 10 Questions Each
              </span>
            </div>

            {/* 4 Large Cards for Part 1 to Part 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {partTests.map((p) => (
                <div
                  key={p.part}
                  onClick={() => setActiveTest({ kind: 'part', partNumber: p.part, title: p.title })}
                  className="group cursor-pointer p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#121215] border-2 border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a] text-sm">PART 0{p.part}</span>
                      <span className="font-semibold">{p.duration}</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                      {p.title}
                    </div>

                    <div className="text-base sm:text-lg text-[#86868b] dark:text-[#a1a1aa] font-medium">
                      {p.questions}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start Part {p.part}</span>
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
