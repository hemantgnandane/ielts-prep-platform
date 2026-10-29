import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';

export interface ReadingPageProps {
  onBackToHome: () => void;
  onLaunchExam?: (testId: number | string, passageNumber?: number) => void;
}

export type ActiveReadingTestType =
  | { kind: 'full'; id: number; title: string }
  | { kind: 'passage'; passageNumber: number; title: string }
  | null;

export const ReadingPage: React.FC<ReadingPageProps> = ({ onBackToHome, onLaunchExam }) => {
  const [tab, setTab] = useState<'all' | 'full' | 'passages'>('all');
  const [activeTest, setActiveTest] = useState<ActiveReadingTestType>(null);

  // 20 Full Reading Tests
  const fullTests = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Test ${i + 1}`,
    questions: '40 Questions',
    duration: '60 Min'
  }));

  // 3 Passage-wise Tests (Official IELTS Reading standard)
  const passageTests = [
    {
      passage: 1,
      title: 'Passage 1',
      questions: 'Questions 1–13',
      duration: '20 Min',
      difficulty: 'Standard'
    },
    {
      passage: 2,
      title: 'Passage 2',
      questions: 'Questions 14–26',
      duration: '20 Min',
      difficulty: 'Moderate'
    },
    {
      passage: 3,
      title: 'Passage 3',
      questions: 'Questions 27–40',
      duration: '20 Min',
      difficulty: 'Challenging'
    }
  ];

  const handleStartTest = (test: ActiveReadingTestType) => {
    if (onLaunchExam) {
      if (test?.kind === 'full') {
        onLaunchExam(test.id);
      } else if (test?.kind === 'passage') {
        onLaunchExam(`passage-${test.passageNumber}`, test.passageNumber);
      }
    } else {
      setActiveTest(test);
    }
  };

  // Active test runner screen (if opened inline)
  if (activeTest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] py-8 px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <button
            type="button"
            onClick={() => setActiveTest(null)}
            className="inline-flex items-center gap-2 text-base font-bold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#e0001a]" />
            <span>Back to All Reading Tests</span>
          </button>

          <span className="text-sm font-mono font-bold px-4 py-1.5 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase tracking-wider">
            {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
          </span>
        </div>

        {/* Minimal Test Header */}
        <div className="p-8 rounded-3xl bg-[#f5f5f7] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white dark:text-black" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
                {activeTest.kind === 'full' ? `Reading Test ${activeTest.id}` : activeTest.title}
              </div>
              <div className="text-sm text-[#86868b] font-mono mt-0.5">
                {activeTest.kind === 'full' ? '40 Questions · 60 Minutes' : '13–14 Questions · 20 Minutes'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-mono text-[#86868b]">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#27272a] border border-[#e5e5e7] dark:border-[#27272a]">
              <Clock className="w-4 h-4 text-[#e0001a]" />
              <span>{activeTest.kind === 'full' ? '60:00' : '20:00'}</span>
            </span>
          </div>
        </div>

        {/* Exam Launch Placeholder */}
        <div className="p-16 rounded-3xl border-2 border-dashed border-[#e5e5e7] dark:border-[#27272a] text-center space-y-4">
          <FileText className="w-10 h-10 text-[#e0001a] mx-auto" />
          <div className="text-2xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
            Ready for Reading Exam Interface
          </div>
          <p className="text-base text-[#86868b] dark:text-[#a1a1aa] max-w-lg mx-auto leading-relaxed">
            Test initialized. You can take this test in the authentic split-pane CD reading environment.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setActiveTest(null)}
              className="px-6 py-3 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] text-base font-semibold hover:border-black dark:hover:border-white transition-colors"
            >
              Change Test
            </button>
            {onLaunchExam && (
              <button
                type="button"
                onClick={() => {
                  if (activeTest.kind === 'full') onLaunchExam(activeTest.id);
                  else onLaunchExam(`passage-${activeTest.passageNumber}`, activeTest.passageNumber);
                }}
                className="px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-base font-semibold hover:opacity-90"
              >
                Launch Split-Pane Simulator
              </button>
            )}
          </div>
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
              Reading
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
              onClick={() => setTab('passages')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                tab === 'passages'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Passage-wise (1–3)
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

            {/* Clean Grid of 20 Tests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
              {fullTests.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleStartTest({ kind: 'full', id: t.id, title: t.title })}
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

        {/* 2. Passage-Wise Tests: Passage 1, Passage 2, Passage 3 */}
        {(tab === 'all' || tab === 'passages') && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Passage-Wise Tests
              </h2>
              <span className="text-sm sm:text-base font-mono text-[#86868b] font-medium">
                Passage 1 to Passage 3 · 20 Min Each
              </span>
            </div>

            {/* 3 Large Cards for Passage 1, 2, 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {passageTests.map((p) => (
                <div
                  key={p.passage}
                  onClick={() => handleStartTest({ kind: 'passage', passageNumber: p.passage, title: p.title })}
                  className="group cursor-pointer p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#121215] border-2 border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a]">PASSAGE 0{p.passage}</span>
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
                    <span>Start Passage {p.passage}</span>
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
