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
    tasks: '2 Tasks',
    duration: '60 Min'
  }));

  // 2 Task-wise Tests
  const taskTests = [
    {
      task: 1,
      title: 'Task 1',
      subtitle: 'Visual Report / Formal Letter',
      length: 'Min 150 Words',
      duration: '20 Min'
    },
    {
      task: 2,
      title: 'Task 2',
      subtitle: 'Discursive Essay',
      length: 'Min 250 Words',
      duration: '40 Min'
    }
  ];

  // If a test is active, render the authentic writing interface with a clean back button
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
            <span>Back to All Writing Tests</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#e0001a]/10 text-[#e0001a] uppercase">
              {activeTest.kind === 'full' ? `Full ${activeTest.title}` : activeTest.title}
            </span>
            <span className="text-xs font-mono text-[#86868b]">
              {activeTest.kind === 'full' ? '60 Min · 2 Tasks' : activeTest.taskNumber === 1 ? '20 Min · 150w' : '40 Min · 250w'}
            </span>
          </div>
        </div>

        {/* Official CD-IELTS Writing Interface */}
        <div className="flex-1 min-h-[750px]">
          <WritingWorkspace />
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
              Writing
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
              onClick={() => setTab('tasks')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tab === 'tasks'
                  ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
              }`}
            >
              Task-wise (1–2)
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
                Test 1 to Test 20 · Task 1 & Task 2
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
                      <span>2 TASKS</span>
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

        {/* 2. Task-Wise Tests: Task 1 and Task 2 */}
        {(tab === 'all' || tab === 'tasks') && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Task-Wise Tests
              </h2>
              <span className="text-xs sm:text-sm font-mono text-[#86868b]">
                Task 1 & Task 2 Practice
              </span>
            </div>

            {/* 2 Clean Cards for Task 1 and Task 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {taskTests.map((task) => (
                <div
                  key={task.task}
                  onClick={() => setActiveTest({ kind: 'task', taskNumber: task.task as 1 | 2, title: task.title })}
                  className="group cursor-pointer p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-black dark:hover:border-white transition-all shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#86868b]">
                      <span className="font-bold text-[#e0001a]">TASK 0{task.task}</span>
                      <span>{task.duration}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a]">
                        <PenTool className="w-5 h-5 text-[#e0001a]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                          {task.title}
                        </div>
                        <div className="text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                          {task.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm font-mono text-[#86868b] pt-1">
                      Target requirement: <span className="font-semibold text-[#1d1d1f] dark:text-[#ededed]">{task.length}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#f0f0f2] dark:border-[#27272a] flex items-center justify-between text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                    <span>Start {task.title}</span>
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

