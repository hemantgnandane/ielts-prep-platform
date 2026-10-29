import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, PenTool } from 'lucide-react';
import { WritingWorkspace } from '../simulation/WritingWorkspace';

export interface WritingPageProps {
  onBackToHome: () => void;
  onLaunchFullExam?: (testId: number) => void;
}

export type ActiveWritingTestType =
  | { kind: 'full'; id: number; title: string }
  | { kind: 'task'; taskNumber: 1 | 2; title: string }
  | null;

export const WritingPage: React.FC<WritingPageProps> = ({ onBackToHome }) => {
  const [tab, setTab] = useState<'all' | 'full' | 'tasks'>('all');
  const [activeTest, setActiveTest] = useState<ActiveWritingTestType>(null);

  // 20 Full Writing Tests (Task 1 + Task 2)
  const fullTests = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Test ${i + 1}`,
    tasks: '2 Tasks (T1 & T2)',
    duration: '60 Min'
  }));

  // 2 Task-wise Tests
  const taskTests = [
    {
      task: 1,
      title: 'Task 1',
      subtitle: 'Visual Data Report / Formal Letter',
      length: 'Min 150 Words',
      duration: '20 Min'
    },
    {
      task: 2,
      title: 'Task 2',
      subtitle: 'Discursive & Argumentative Essay',
      length: 'Min 250 Words',
      duration: '40 Min'
    }
  ];

  // If a test is active, render the authentic writing interface with a clean back button
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
            <span>Back to All Writing Tests</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-mono font-bold px-4 py-1.5 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase tracking-wider">
              {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
            </span>
            <span className="text-sm font-mono text-[#86868b] font-semibold">
              {activeTest.kind === 'full' ? '60 Min · 2 Tasks' : activeTest.taskNumber === 1 ? '20 Min · 150w' : '40 Min · 250w'}
            </span>
          </div>
        </div>

        {/* Official CD Writing Interface */}
        <div className="flex-1 min-h-[750px]">
          <WritingWorkspace />
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
              Writing
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
              onClick={() => setTab('tasks')}
              className={`px-5 py-2.5 rounded-xl transition-all ${
                tab === 'tasks'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-bold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Task-wise (1–2)
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
                Test 1 to Test 20 · Task 1 & Task 2
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
                      <span>{t.tasks}</span>
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

        {/* 2. Task-Wise Tests: Task 1 and Task 2 */}
        {(tab === 'all' || tab === 'tasks') && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Task-Wise Tests
              </h2>
              <span className="text-sm sm:text-base font-mono text-[#86868b] font-medium">
                Task 1 & Task 2 Practice
              </span>
            </div>

            {/* 2 Large Cards for Task 1 and Task 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
              {taskTests.map((task) => (
                <div
                  key={task.task}
                  onClick={() => setActiveTest({ kind: 'task', taskNumber: task.task as 1 | 2, title: task.title })}
                  className="group cursor-pointer p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#121215] border-2 border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between min-h-[240px]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a]">TASK 0{task.task}</span>
                      <span className="font-semibold">{task.duration}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a]">
                        <PenTool className="w-6 h-6 text-[#e0001a]" />
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                          {task.title}
                        </div>
                        <div className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                          {task.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm sm:text-base font-mono text-[#86868b] pt-1">
                      Target length: <span className="font-bold text-[#1d1d1f] dark:text-[#ededed]">{task.length}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start {task.title}</span>
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
