import React, { useState } from 'react';
import { ExamTopBar } from './ExamTopBar';
import { ReadingPassagePane } from './ReadingPassagePane';
import { QuestionPane } from './QuestionPane';
import { QuestionPalette } from './QuestionPalette';
import { ScoreModal } from './ScoreModal';
import { WritingWorkspace } from './WritingWorkspace';
import { SpeakingWorkspace } from './SpeakingWorkspace';
import { ListeningWorkspace } from './ListeningWorkspace';
import { Maximize2, Minimize2, BookOpen, HelpCircle, PenTool, Mic, Headphones } from 'lucide-react';

export type ActivePracticeModule = 'reading' | 'writing' | 'speaking' | 'listening';

export const SimulationViewer: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ActivePracticeModule>('reading');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage');

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <section
      id="simulation-engine"
      className={`relative py-12 border-b border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c] ${
        isFullscreen ? 'fixed inset-0 z-50 py-0 bg-white dark:bg-[#0a0a0c]' : ''
      }`}
    >
      <div className={`${isFullscreen ? 'h-screen flex flex-col' : 'w-full px-4 sm:px-8 lg:px-12 xl:px-16'}`}>
        {/* Workspace Mode Switcher & Fullscreen Action */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            {/* Apple Minimalist Module Switcher Pills */}
            <div className="inline-flex items-center p-1 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveModule('reading')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeModule === 'reading'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reading Simulation</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModule('writing')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeModule === 'writing'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Writing Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModule('listening')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeModule === 'listening'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listening Lab</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModule('speaking')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeModule === 'speaking'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Speaking Cue Card</span>
              </button>
            </div>

            {/* Right: Fullscreen Trigger */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] text-xs font-semibold text-[#1d1d1f] dark:text-[#ededed] hover:border-[#86868b] transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#e0001a]" />
                <span>Fullscreen Exam Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* The CD-IELTS Main Application Window */}
        <div
          className={`relative flex flex-col rounded-2xl md:rounded-3xl border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c] shadow-apple dark:shadow-apple-dark overflow-hidden ${
            isFullscreen ? 'flex-1 rounded-none border-none' : 'h-[800px]'
          }`}
        >
          {/* Top Exam Status Bar */}
          <ExamTopBar />

          {/* Module 1: Reading Simulator */}
          {activeModule === 'reading' && (
            <>
              {/* Mobile Tab Switcher */}
              <div className="md:hidden flex border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215]">
                <button
                  type="button"
                  onClick={() => setMobileTab('passage')}
                  className={`flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                    mobileTab === 'passage'
                      ? 'border-[#e0001a] text-[#1d1d1f] dark:text-white font-semibold'
                      : 'border-transparent text-[#86868b]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Passage 1</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('questions')}
                  className={`flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                    mobileTab === 'questions'
                      ? 'border-[#e0001a] text-[#1d1d1f] dark:text-white font-semibold'
                      : 'border-transparent text-[#86868b]'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Questions</span>
                </button>
              </div>

              {/* Split-Pane Core Container */}
              <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#e5e5e7] dark:divide-[#27272a]">
                <div
                  className={`md:w-1/2 h-full overflow-hidden ${
                    mobileTab === 'passage' ? 'block flex-1' : 'hidden md:block'
                  }`}
                >
                  <ReadingPassagePane />
                </div>
                <div
                  className={`md:w-1/2 h-full overflow-hidden ${
                    mobileTab === 'questions' ? 'block flex-1' : 'hidden md:block'
                  }`}
                >
                  <QuestionPane />
                </div>
              </div>

              {/* Bottom 40-item Palette */}
              <QuestionPalette />
            </>
          )}

          {/* Module 2: Writing Studio */}
          {activeModule === 'writing' && (
            <div className="flex-1 min-h-0 overflow-hidden">
              <WritingWorkspace />
            </div>
          )}

          {/* Module 3: Listening Lab */}
          {activeModule === 'listening' && (
            <div className="flex-1 min-h-0 overflow-hidden">
              <ListeningWorkspace />
            </div>
          )}

          {/* Module 4: Speaking Lab */}
          {activeModule === 'speaking' && (
            <div className="flex-1 min-h-0 overflow-hidden">
              <SpeakingWorkspace />
            </div>
          )}

          {/* Fullscreen Exit button */}
          {isFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="absolute top-2.5 right-2.5 z-40 p-1.5 rounded-lg bg-black/70 text-white hover:bg-black transition-colors"
              title="Exit fullscreen"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Score Result Modal */}
      <ScoreModal />
    </section>
  );
};
