import React from 'react';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, ArrowRight, X } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { useTrack } from '../../context/TrackContext';

export const ScoreModal: React.FC = () => {
  const {
    isResultModalOpen,
    closeResultModal,
    simulationResult,
    resetExam,
    setActiveQuestionNumber
  } = useSimulation();

  const { trackLabel } = useTrack();

  if (!isResultModalOpen || !simulationResult) return null;

  const { score, totalQuestions, rawBandScore, timeSpentSeconds, breakdown } = simulationResult;
  const accuracyPercentage = Math.round((score / totalQuestions) * 100);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}m ${remainder}s`;
  };

  const getCEFRLevel = (band: number) => {
    if (band >= 8.5) return 'C2 — Expert User';
    if (band >= 7.0) return 'C1 — Effective Operational Proficiency';
    if (band >= 5.5) return 'B2 — Vantage';
    return 'B1 — Threshold';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] rounded-3xl p-6 sm:p-8 shadow-apple-dark max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeResultModal}
          aria-label="Close scorecard"
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#e5e5e7] dark:border-[#27272a] flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0001a]/10 text-[#e0001a] text-xs font-mono font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>CD-IELTS Official Assessment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
            Session Performance Scorecard
          </h2>
          <p className="mt-1 text-xs font-mono text-[#86868b] dark:text-[#a1a1aa]">
            {trackLabel} · Reading Section 1
          </p>
        </div>

        {/* Score & Band Highlights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Official Band Score */}
          <div className="p-4 rounded-2xl bg-[#fbfbfd] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] text-center">
            <div className="text-[11px] font-mono uppercase text-[#86868b] dark:text-[#a1a1aa]">
              Scaled Band Score
            </div>
            <div className="mt-1 text-4xl font-extrabold text-[#e0001a] tracking-tight">
              {rawBandScore.toFixed(1)}
            </div>
            <div className="mt-1 text-[11px] font-medium text-[#1d1d1f] dark:text-[#ededed]">
              {getCEFRLevel(rawBandScore)}
            </div>
          </div>

          {/* Raw Accuracy */}
          <div className="p-4 rounded-2xl bg-[#fbfbfd] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] text-center">
            <div className="text-[11px] font-mono uppercase text-[#86868b] dark:text-[#a1a1aa]">
              Section 1 Score
            </div>
            <div className="mt-1 text-4xl font-extrabold text-[#1d1d1f] dark:text-[#ededed] tracking-tight">
              {score} <span className="text-lg font-normal text-[#86868b]">/ {totalQuestions}</span>
            </div>
            <div className="mt-1 text-[11px] font-mono text-[#86868b] dark:text-[#a1a1aa]">
              {accuracyPercentage}% Correct Answers
            </div>
          </div>

          {/* Time Expended */}
          <div className="p-4 rounded-2xl bg-[#fbfbfd] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] text-center">
            <div className="text-[11px] font-mono uppercase text-[#86868b] dark:text-[#a1a1aa]">
              Time Expended
            </div>
            <div className="mt-1 text-4xl font-extrabold text-[#1d1d1f] dark:text-[#ededed] tracking-tight">
              {formatDuration(timeSpentSeconds)}
            </div>
            <div className="mt-1 text-[11px] font-mono text-[#86868b] dark:text-[#a1a1aa] flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-[#e0001a]" />
              <span>Target: 20 min</span>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown List */}
        <div className="mt-8 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#86868b] dark:text-[#a1a1aa] flex items-center justify-between">
            <span>Item Analysis &amp; Diagnostic Rationale</span>
            <span>{score} of {totalQuestions} Correct</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {breakdown.map((item, index) => {
              const qNum = index + 1;
              return (
                <div
                  key={item.questionId}
                  onClick={() => {
                    setActiveQuestionNumber(qNum);
                    closeResultModal();
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    item.isCorrect
                      ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/50'
                      : 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )}
                      <span className="font-bold text-[#1d1d1f] dark:text-[#ededed]">
                        Question {qNum}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>
                        Your answer:{' '}
                        <strong className="text-[#1d1d1f] dark:text-white">
                          {item.userAnswer || 'None'}
                        </strong>
                      </span>
                      <span>
                        Key:{' '}
                        <strong className="text-[#e0001a]">{item.correctAnswer}</strong>
                      </span>
                    </div>
                  </div>

                  <p className="mt-1.5 text-[11px] text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-6 border-t border-[#e5e5e7] dark:border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetExam}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] hover:bg-[#f5f5f7] dark:hover:bg-[#27272a] text-xs font-semibold text-[#1d1d1f] dark:text-[#ededed] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Simulation</span>
          </button>

          <button
            type="button"
            onClick={closeResultModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1d1d1f] hover:bg-black text-white dark:bg-[#ededed] dark:text-[#0a0a0c] dark:hover:bg-white text-xs font-semibold tracking-tight transition-all"
          >
            <span>Review Marked Answers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

