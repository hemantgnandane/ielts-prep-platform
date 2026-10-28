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

export interface SimulationViewerProps {
  activeModule?: ActivePracticeModule;
  onModuleChange?: (module: ActivePracticeModule) => void;
  onBackToModules?: () => void;
}

export const SimulationViewer: React.FC<SimulationViewerProps> = ({
  activeModule: externalModule,
  onModuleChange,
}) => {
  const [internalModule, setInternalModule] = useState<ActivePracticeModule>('writing'); // defaults to writing or external
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage');

  const currentModule = externalModule || internalModule;

  const handleModuleSelect = (mod: ActivePracticeModule) => {
    if (onModuleChange) {
      onModuleChange(mod);
    } else {
      setInternalModule(mod);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <section
      id="simulation-engine"
      className={`relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 md:py-10 bg-white dark:bg-[#0a0a0c] ${
        isFullscreen ? 'fixed inset-0 z-50 py-0 bg-white dark:bg-[#0a0a0c]' : ''
      }`}
    >
      <div className={`${isFullscreen ? 'h-screen flex flex-col' : 'w-full px-4 sm:px-8 lg:px-12 xl:px-16'}`}>
        {/* Workspace Mode Switcher & Fullscreen Trigger */}
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            {/* Module Switcher Pills */}
            <div className="inline-flex items-center p-1 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] text-xs sm:text-sm font-medium">
              <button
                type="button"
                onClick={() => handleModuleSelect('writing')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  currentModule === 'writing'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <PenTool className="w-4 h-4 text-[#e0001a]" />
                <span>Writing CD-Interface</span>
              </button>

              <button
                type="button"
                onClick={() => handleModuleSelect('reading')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  currentModule === 'reading'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Reading (40Q)</span>
              </button>

              <button
                type="button"
                onClick={() => handleModuleSelect('listening')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  currentModule === 'listening'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>Listening Lab</span>
              </button>

              <button
                type="button"
                onClick={() => handleModuleSelect('speaking')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  currentModule === 'speaking'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Speaking Cue Card</span>
              </button>
            </div>

            {/* Right: Fullscreen Action */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] text-xs sm:text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed] hover:border-[#86868b] transition-colors"
              >
                <Maximize2 className="w-4 h-4 text-[#e0001a]" />
                <span>Fullscreen Exam Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* The CD-IELTS Main Application Window */}
        <div
          className={`relative flex flex-col rounded-2xl md:rounded-3xl border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c] shadow-apple dark:shadow-apple-dark overflow-hidden ${
            isFullscreen ? 'flex-1 rounded-none border-none' : 'h-[860px]'
          }`}
        >
          {/* Module 1: Official CD-IELTS Writing Interface (matches uploaded screenshot exactly) */}
          {currentModule === 'writing' && (
            <div className="flex-1 min-h-0 overflow-hidden">
              <WritingWorkspace />
            </div>
          )}

          {/* Module 2: Reading Simulator */}
          {currentModule === 'reading' && (
            <>
              <ExamTopBar />

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

          {/* Module 3: Listening Lab */}
          {currentModule === 'listening' && (
            <>
              <ExamTopBar />
              <div className="flex-1 min-h-0 overflow-hidden">
                <ListeningWorkspace />
              </div>
            </>
          )}

          {/* Module 4: Speaking Lab */}
          {currentModule === 'speaking' && (
            <>
              <ExamTopBar />
              <div className="flex-1 min-h-0 overflow-hidden">
                <SpeakingWorkspace />
              </div>
            </>
          )}

          {/* Fullscreen Exit button */}
          {isFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="absolute top-2.5 right-2.5 z-40 p-2 rounded-lg bg-black/70 text-white hover:bg-black transition-colors"
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
