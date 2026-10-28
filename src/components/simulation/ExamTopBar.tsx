import React from 'react';
import { Clock, Eye, EyeOff, User, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useTrack } from '../../context/TrackContext';

export const ExamTopBar: React.FC = () => {
  const {
    timeRemainingSeconds,
    showTimer,
    toggleShowTimer,
    fontScale,
    setFontScale,
    submitExam,
    resetExam,
    isSubmitted,
    openResultModal,
    answeredCount
  } = useSimulation();

  const { trackLabel } = useTrack();

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemainingSeconds < 300 && timeRemainingSeconds > 0;

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#121215] border-b border-[#e5e5e7] dark:border-[#27272a] px-4 py-3 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Candidate Details & Active Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1c1c20] border border-[#e5e5e7] dark:border-[#27272a] text-sm">
            <User className="w-4 h-4 text-[#86868b] dark:text-[#a1a1aa]" />
            <span className="font-mono font-bold text-[#1d1d1f] dark:text-[#ededed]">
              CD-IELTS #2026-8942
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#86868b]" />
            <span className="hidden sm:inline-block text-[#86868b] dark:text-[#a1a1aa] font-medium">
              {trackLabel}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
            <span className="px-2.5 py-1 rounded bg-white dark:bg-[#1c1c20] border border-[#e5e5e7] dark:border-[#27272a]">
              Reading · Section 1 of 3
            </span>
            <span className="text-[#1d1d1f] dark:text-[#ededed] font-semibold">
              Passage 1 (Q1 – Q13)
            </span>
          </div>
        </div>

        {/* Center: Live Countdown Clock with Hide/Show */}
        <div className="flex items-center gap-2.5">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border transition-colors ${
              isTimeCritical
                ? 'bg-[#e0001a]/10 border-[#e0001a] text-[#e0001a] animate-pulse'
                : 'bg-white dark:bg-[#1c1c20] border-[#e5e5e7] dark:border-[#27272a] text-[#1d1d1f] dark:text-[#ededed]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#e0001a]" />
            <span className="font-mono text-base font-bold tracking-wider">
              {showTimer ? formatTime(timeRemainingSeconds) : '••:••'}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleShowTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] hover:bg-[#f5f5f7] dark:hover:bg-[#27272a] text-sm text-[#86868b] dark:text-[#a1a1aa] hover:text-[#1d1d1f] dark:hover:text-[#ededed] transition-colors"
            title={showTimer ? 'Hide remaining time' : 'Show remaining time'}
          >
            {showTimer ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span className="hidden sm:inline">Hide Time</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Show Time</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Accessibility Font Scale, Reset, Submit Button */}
        <div className="flex items-center gap-2.5">
          {/* Font Size Adjuster */}
          <div className="hidden md:flex items-center border border-[#e5e5e7] dark:border-[#27272a] rounded-lg overflow-hidden bg-white dark:bg-[#1c1c20] text-sm">
            <button
              type="button"
              onClick={() => setFontScale('standard')}
              className={`px-2.5 py-1.5 font-mono transition-colors ${
                fontScale === 'standard'
                  ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#ededed]'
              }`}
              title="Standard text scale"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontScale('large')}
              className={`px-2.5 py-1.5 font-mono font-bold transition-colors ${
                fontScale === 'large'
                  ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#ededed]'
              }`}
              title="Large text scale"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontScale('extralarge')}
              className={`px-2.5 py-1.5 font-mono font-black transition-colors ${
                fontScale === 'extralarge'
                  ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]'
                  : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#ededed]'
              }`}
              title="Extra large text scale"
            >
              A++
            </button>
          </div>

          {/* Reset Test */}
          <button
            type="button"
            onClick={resetExam}
            className="p-2 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] hover:bg-[#f5f5f7] dark:hover:bg-[#27272a] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#ededed] transition-colors"
            title="Reset test session"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Submit or View Results */}
          {isSubmitted ? (
            <button
              type="button"
              onClick={openResultModal}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#e0001a] hover:bg-[#c40017] text-white text-sm font-semibold tracking-tight transition-colors shadow-subtle"
            >
              <CheckCircle className="w-4 h-4" />
              <span>View Scorecard</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={submitExam}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#1d1d1f] hover:bg-black dark:bg-[#ededed] dark:text-[#0a0a0c] dark:hover:bg-white text-white text-sm font-semibold tracking-tight transition-colors shadow-subtle"
            >
              <Send className="w-4 h-4" />
              <span>Finish Test ({answeredCount}/13)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
