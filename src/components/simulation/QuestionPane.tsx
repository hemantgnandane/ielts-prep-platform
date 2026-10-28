import React, { useRef, useEffect } from 'react';
import { HelpCircle, Bookmark, CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const QuestionPane: React.FC = () => {
  const {
    currentPassage,
    paletteQuestions,
    activeQuestionNumber,
    setActiveQuestionNumber,
    answers,
    setAnswer,
    reviewFlags,
    toggleReviewFlag,
    nextQuestion,
    prevQuestion,
    isSubmitted
  } = useSimulation();

  const activeQuestionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeQuestionRef.current) {
      activeQuestionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeQuestionNumber]);

  const activeQuestion = paletteQuestions.find(q => q.number === activeQuestionNumber);
  const isPassageQuestion = activeQuestionNumber <= currentPassage.questions.length;

  const options: { label: string; value: 'TRUE' | 'FALSE' | 'NOT GIVEN' }[] = [
    { label: 'TRUE', value: 'TRUE' },
    { label: 'FALSE', value: 'FALSE' },
    { label: 'NOT GIVEN', value: 'NOT GIVEN' }
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0a0a0c] overflow-hidden">
      {/* Pane Top Header */}
      <div className="px-6 py-3.5 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-4 h-4 text-[#e0001a]" />
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-[#ededed]">
            Questions 1–13
          </span>
          <span className="text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
            · True / False / Not Given
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleReviewFlag(activeQuestionNumber)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors border ${
              reviewFlags[activeQuestionNumber]
                ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-400 font-semibold'
                : 'bg-white dark:bg-[#1c1c20] border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1aa] dark:hover:text-[#ededed]'
            }`}
            title="Flag question for review"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">
              {reviewFlags[activeQuestionNumber] ? 'Marked for Review' : 'Review'}
            </span>
          </button>
        </div>
      </div>

      {/* Scrollable Questions Body */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        {/* Instructions Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#f5f5f7] dark:bg-[#141418] border border-[#e5e5e7] dark:border-[#27272a] space-y-3">
          <div className="text-sm sm:text-base font-semibold text-[#1d1d1f] dark:text-[#ededed]">
            Do the following statements agree with the information given in Reading Passage 1?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#1c1c20] border border-[#e5e5e7]/80 dark:border-[#27272a]">
              <strong className="text-[#1d1d1f] dark:text-white">TRUE</strong>: statement agrees
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#1c1c20] border border-[#e5e5e7]/80 dark:border-[#27272a]">
              <strong className="text-[#1d1d1f] dark:text-white">FALSE</strong>: statement contradicts
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#1c1c20] border border-[#e5e5e7]/80 dark:border-[#27272a]">
              <strong className="text-[#1d1d1f] dark:text-white">NOT GIVEN</strong>: no information
            </div>
          </div>
        </div>

        {/* Section 1 Questions List (1 to 13) */}
        {isPassageQuestion && (
          <div className="space-y-5">
            {currentPassage.questions.map((question) => {
              const isCurrent = question.number === activeQuestionNumber;
              const currentAnswer = answers[question.number];
              const isFlagged = reviewFlags[question.number];
              const isCorrect = currentAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  ref={isCurrent ? activeQuestionRef : null}
                  onClick={() => setActiveQuestionNumber(question.number)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-150 ${
                    isCurrent
                      ? 'bg-white dark:bg-[#18181c] border-[#1d1d1f] dark:border-[#ededed] shadow-apple dark:shadow-apple-dark ring-2 ring-[#1d1d1f]/15 dark:ring-white/15'
                      : 'bg-[#fbfbfd] dark:bg-[#121215] border-[#e5e5e7] dark:border-[#27272a] hover:border-[#86868b] dark:hover:border-[#52525b]'
                  }`}
                >
                  {/* Question Header & Statement */}
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${
                        isCurrent
                          ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]'
                          : currentAnswer
                          ? 'bg-[#e5e5e7] text-[#1d1d1f] dark:bg-[#27272a] dark:text-[#ededed]'
                          : 'bg-[#f5f5f7] text-[#86868b] dark:bg-[#18181c] dark:text-[#71717a]'
                      }`}
                    >
                      {question.number}
                    </span>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        {question.paragraphReference && (
                          <span className="text-xs font-mono text-[#86868b] dark:text-[#a1a1aa] bg-[#f5f5f7] dark:bg-[#1c1c20] px-2.5 py-1 rounded-md border border-[#e5e5e7] dark:border-[#27272a]">
                            Ref: {question.paragraphReference}
                          </span>
                        )}
                        {isFlagged && (
                          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                            <Bookmark className="w-3.5 h-3.5" /> Flagged
                          </span>
                        )}
                      </div>

                      <p className="text-base sm:text-lg font-medium text-[#1d1d1f] dark:text-[#ededed] leading-relaxed">
                        {question.statement}
                      </p>

                      {/* Radio Options */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {options.map((opt) => {
                          const isSelected = currentAnswer === opt.value;

                          return (
                            <label
                              key={opt.value}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-mono cursor-pointer transition-all select-none ${
                                isSelected
                                  ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] border-transparent font-bold shadow-subtle'
                                  : 'bg-white dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] border-[#e5e5e7] dark:border-[#27272a] hover:border-[#86868b]'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setAnswer(question.number, opt.value);
                              }}
                            >
                              <input
                                type="radio"
                                name={`question-${question.number}`}
                                value={opt.value}
                                checked={isSelected}
                                onChange={() => setAnswer(question.number, opt.value)}
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? 'border-white dark:border-[#0a0a0c] bg-white dark:bg-[#0a0a0c]'
                                    : 'border-[#86868b] dark:border-[#71717a]'
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-[#1d1d1f] dark:bg-white" />
                                )}
                              </div>
                              <span>{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Clear Answer Button */}
                      {currentAnswer && !isSubmitted && isCurrent && (
                        <div className="pt-1 flex justify-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAnswer(question.number, null);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#86868b] hover:text-[#e0001a] transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Clear answer</span>
                          </button>
                        </div>
                      )}

                      {/* Post-Submission Feedback */}
                      {isSubmitted && (
                        <div
                          className={`mt-3 p-4 rounded-xl border text-sm space-y-2 ${
                            isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-300'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-2">
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                              )}
                              <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                            </span>
                            <span className="font-mono text-xs font-bold">
                              Key: {question.correctAnswer}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#1d1d1f] dark:text-[#ededed] opacity-90">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mock Section 2 & 3 Questions */}
        {!isPassageQuestion && activeQuestion && (
          <div className="p-6 rounded-2xl bg-[#fbfbfd] dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold text-[#e0001a]">
                Section {activeQuestionNumber <= 27 ? '2' : '3'} Mock Question
              </span>
              <span className="text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                Q{activeQuestionNumber} of 40
              </span>
            </div>

            <p className="text-base sm:text-lg font-medium text-[#1d1d1f] dark:text-[#ededed] leading-relaxed">
              {activeQuestion.statement}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {options.map((opt) => {
                const isSelected = answers[activeQuestionNumber] === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-mono cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]'
                        : 'bg-white dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] border-[#e5e5e7] dark:border-[#27272a]'
                    }`}
                    onClick={() => setAnswer(activeQuestionNumber, opt.value)}
                  >
                    <input
                      type="radio"
                      name={`q-${activeQuestionNumber}`}
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => setAnswer(activeQuestionNumber, opt.value)}
                      className="sr-only"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Pane Bottom Prev/Next Quick Controls */}
      <div className="px-6 py-3.5 border-t border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between">
        <button
          type="button"
          onClick={prevQuestion}
          disabled={activeQuestionNumber === 1}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-medium text-[#1d1d1f] dark:text-[#ededed] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#86868b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous (Q{Math.max(1, activeQuestionNumber - 1)})</span>
        </button>

        <span className="text-sm font-mono text-[#86868b] dark:text-[#a1a1aa] font-medium">
          {activeQuestionNumber} of {paletteQuestions.length}
        </span>

        <button
          type="button"
          onClick={nextQuestion}
          disabled={activeQuestionNumber === paletteQuestions.length}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-medium text-[#1d1d1f] dark:text-[#ededed] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#86868b] transition-colors"
        >
          <span>Next (Q{Math.min(paletteQuestions.length, activeQuestionNumber + 1)})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
