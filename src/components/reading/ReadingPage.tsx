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
    questions: 40,
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#e0001a]" />
            <span>Back to All Reading Tests</span>
          </button>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase">
            {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
          </span>
        </div>

        {/* Minimal Test Header */}
        <div className="p-6 rounded-2xl bg-[#f5f5f7] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white dark:text-black" />
            </div>
            <div>
              <div className="text-base font-bold text-[#1d1d1f] dark:text-[#ededed]">
                {activeTest.kind === 'full' ? `Reading Test ${activeTest.id}` : activeTest.title}
              </div>
              <div className="text-xs text-[#86868b] font-mono">
                {activeTest.kind === 'full' ? '40 Questions · 60 Minutes' : '13–14 Questions · 20 Minutes'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#86868b]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#27272a] border border-[#e5e5e7] dark:border-[#27272a]">
              <Clock className="w-3.5 h-3.5 text-[#e0001a]" />
              <span>{activeTest.kind === 'full' ? '60:00' : '20:00'}</span>
            </span>
          </div>
        </div>

        {/* Exam Launch Placeholder */}
        <div className="p-12 rounded-2xl border-2 border-dashed border-[#e5e5e7] dark:border-[#27272a] text-center space-y-3">
          <FileText className="w-8 h-8 text-[#e0001a] mx-auto" />
          <div className="text-lg font-bold text-[#1d1d1f] dark:text-[#ededed]">
            Ready for Reading Exam Interface
          </div>
          <p className="text-sm text-[#86868b] dark:text-[#a1a1aa] max-w-md mx-auto">
            Test initialized. You can take this test in the authentic split-pane CD reading environment.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTest(null)}
              className="px-5 py-2 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] text-sm font-semibold hover:border-black dark:hover:border-white transition-colors"
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
                className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90"
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
              Reading
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
              onClick={() => setTab('passages')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tab === 'passages'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Passage-wise (1–3)
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
                Test 1 to Test 20 · 40 Questions
              </span>
            </div>

            {/* Clean Grid of 20 Tests */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full">
              {fullTests.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleStartTest({ kind: 'full', id: t.id, title: t.title })}
                  className="group cursor-pointer p-4 sm:p-5 rounded-xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] mb-1.5">
                      <span>40 Q</span>
                      <span>60 MIN</span>
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

        {/* 2. Passage-Wise Tests: Passage 1, Passage 2, Passage 3 */}
        {(tab === 'all' || tab === 'passages') && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Passage-Wise Tests
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#86868b]">
                Passage 1 to Passage 3 · 20 Min Each
              </span>
            </div>

            {/* 3 Clean Cards for Passage 1, 2, 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {passageTests.map((p) => (
                <div
                  key={p.passage}
                  onClick={() => handleStartTest({ kind: 'passage', passageNumber: p.passage, title: p.title })}
                  className="group cursor-pointer p-6 rounded-xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a]">PASSAGE 0{p.passage}</span>
                      <span>{p.duration}</span>
                    </div>

                    <div className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                      {p.title}
                    </div>

                    <div className="text-sm text-[#86868b] dark:text-[#a1a1aa]">
                      {p.questions}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start Passage {p.passage}</span>
                    <ArrowRight className="w-4 h-4 text-[#e0001a] group-hover:translate-x-1 transition-transform" />
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
