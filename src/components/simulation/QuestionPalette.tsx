import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const QuestionPalette: React.FC = () => {
  const {
    paletteQuestions,
    activeQuestionNumber,
    setActiveQuestionNumber,
    answers,
    reviewFlags,
    toggleReviewFlag,
    prevQuestion,
    nextQuestion,
    answeredCount,
    totalQuestions
  } = useSimulation();

  const isCurrentFlagged = Boolean(reviewFlags[activeQuestionNumber]);

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#121215] border-t border-[#e5e5e7] dark:border-[#27272a] px-4 py-3 sm:px-6 select-none">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Left: Active Question Quick Toggle Review + Navigation */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
          {/* Review Checkbox for Active Question */}
          <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer text-[#1d1d1f] dark:text-[#ededed]">
            <input
              type="checkbox"
              checked={isCurrentFlagged}
              onChange={() => toggleReviewFlag(activeQuestionNumber)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                isCurrentFlagged
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white dark:bg-[#1c1c20] border-[#86868b] dark:border-[#52525b]'
              }`}
            >
              {isCurrentFlagged && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="font-mono text-xs sm:text-sm">Review (Q{activeQuestionNumber})</span>
          </label>

          {/* Quick Prev / Next arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevQuestion}
              disabled={activeQuestionNumber === 1}
              aria-label="Previous question"
              className="p-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#86868b]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextQuestion}
              disabled={activeQuestionNumber === totalQuestions}
              aria-label="Next question"
              className="p-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#86868b]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Scrollable / Grid Question Palette (1 to 40) */}
        <div className="flex-1 w-full overflow-x-auto py-1">
          <div className="flex items-center gap-2 min-w-max">
            {paletteQuestions.map((q) => {
              const num = q.number;
              const isActive = num === activeQuestionNumber;
              const isAnswered = answers[num] !== null && answers[num] !== undefined;
              const isFlagged = Boolean(reviewFlags[num]);

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActiveQuestionNumber(num)}
                  aria-label={`Go to question ${num}`}
                  className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] ring-2 ring-[#e0001a] shadow-subtle scale-105 z-10'
                      : isAnswered
                      ? 'bg-[#e5e5e7] dark:bg-[#27272a] text-[#1d1d1f] dark:text-[#ededed] border border-[#d1d1d6] dark:border-[#3f3f46]'
                      : 'bg-white dark:bg-[#1c1c20] text-[#86868b] dark:text-[#71717a] border border-[#e5e5e7] dark:border-[#27272a] hover:border-[#86868b]'
                  }`}
                >
                  <span>{num}</span>

                  {/* Flagged Review Dot */}
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white dark:border-[#121215]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Palette Status Legend */}
        <div className="hidden xl:flex items-center gap-4 text-xs font-mono text-[#86868b] dark:text-[#a1a1aa] flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-[#e5e5e7] dark:bg-[#27272a] border border-[#d1d1d6] dark:border-[#3f3f46]" />
            <span>Answered ({answeredCount})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-white dark:bg-[#1c1c20] border border-[#e5e5e7] dark:border-[#27272a]" />
            <span>Unanswered ({totalQuestions - answeredCount})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative w-3.5 h-3.5 rounded bg-white dark:bg-[#1c1c20] border border-[#e5e5e7] dark:border-[#27272a]">
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <span>Review Flagged</span>
          </div>
        </div>
      </div>
    </div>
  );
};
