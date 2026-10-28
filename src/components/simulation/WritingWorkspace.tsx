import React, { useState } from 'react';
import { useTrack } from '../../context/TrackContext';
import { PenTool, RotateCcw, Copy, Sparkles } from 'lucide-react';

export const WritingWorkspace: React.FC = () => {
  const { track } = useTrack();
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');
  const [task1Text, setTask1Text] = useState<string>('');
  const [task2Text, setTask2Text] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const currentText = activeTask === 'task1' ? task1Text : task2Text;
  const setCurrentText = activeTask === 'task1' ? setTask1Text : setTask2Text;

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const wordCount = countWords(currentText);
  const minWords = activeTask === 'task1' ? 150 : 250;
  const isTargetMet = wordCount >= minWords;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#e5e5e7] dark:divide-[#27272a] bg-white dark:bg-[#0a0a0c]">
      {/* Left Pane: Task Prompt & Criteria */}
      <div className="md:w-1/2 h-full flex flex-col overflow-y-auto p-6 md:p-8 bg-[#fbfbfd] dark:bg-[#121215] space-y-6">
        {/* Task Tabs */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTask('task1')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all border ${
              activeTask === 'task1'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] border-transparent shadow-subtle'
                : 'bg-white dark:bg-[#1c1c20] text-[#86868b] dark:text-[#a1a1aa] border-[#e5e5e7] dark:border-[#27272a]'
            }`}
          >
            {track === 'academic' ? 'Task 1 · Report (150w)' : 'Task 1 · Letter (150w)'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTask('task2')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all border ${
              activeTask === 'task2'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] border-transparent shadow-subtle'
                : 'bg-white dark:bg-[#1c1c20] text-[#86868b] dark:text-[#a1a1aa] border-[#e5e5e7] dark:border-[#27272a]'
            }`}
          >
            Task 2 · Essay (250w)
          </button>
        </div>

        {/* Prompt Content */}
        {activeTask === 'task1' ? (
          track === 'academic' ? (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm font-mono text-[#e0001a] font-bold uppercase tracking-wider">
                Writing Task 1 — Visual Data Report
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
                The chart below shows public investment in renewable energy across four European regions between 2018 and 2024.
              </h3>
              <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words. Recommended time: 20 minutes.
              </p>

              {/* Data Representation Box */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-2.5 font-mono text-xs sm:text-sm">
                <div className="flex justify-between text-[#86868b] pb-1 border-b border-[#e5e5e7] dark:border-[#27272a]">
                  <span>Region</span>
                  <span>2018 (€B)</span>
                  <span>2024 (€B)</span>
                  <span>Trend</span>
                </div>
                <div className="flex justify-between text-[#1d1d1f] dark:text-[#ededed]">
                  <span>Nordic Council</span>
                  <span>14.2</span>
                  <span>38.6</span>
                  <span className="text-emerald-500 font-semibold">+171%</span>
                </div>
                <div className="flex justify-between text-[#1d1d1f] dark:text-[#ededed]">
                  <span>Western Europe</span>
                  <span>42.0</span>
                  <span>67.4</span>
                  <span className="text-emerald-500 font-semibold">+60%</span>
                </div>
                <div className="flex justify-between text-[#1d1d1f] dark:text-[#ededed]">
                  <span>Southern Europe</span>
                  <span>18.5</span>
                  <span>29.1</span>
                  <span className="text-emerald-500 font-semibold">+57%</span>
                </div>
                <div className="flex justify-between text-[#1d1d1f] dark:text-[#ededed]">
                  <span>Eastern Europe</span>
                  <span>8.1</span>
                  <span>19.5</span>
                  <span className="text-emerald-500 font-semibold">+140%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm font-mono text-[#e0001a] font-bold uppercase tracking-wider">
                Writing Task 1 — Formal Letter
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
                You recently rented a vehicle for business travel, but experienced multiple mechanical failures.
              </h3>
              <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                Write a formal letter to the regional operations manager of the car rental agency. In your letter:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-[#1d1d1f] dark:text-[#ededed]">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>State the booking details and the vehicle model you were assigned</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>Explain the safety problems you encountered during your journey</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>Request a full refund and compensation for alternative transit expenses</span>
                </li>
              </ul>
              <div className="text-xs sm:text-sm font-mono text-[#86868b]">
                Write at least 150 words. Begin with: &ldquo;Dear Sir or Madam,&rdquo;
              </div>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-mono text-[#e0001a] font-bold uppercase tracking-wider">
              Writing Task 2 — Discursive Essay
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
              Some people believe artificial intelligence should replace human examiners in standardized language testing, while others argue that human evaluation remains essential.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
              Discuss both views and give your own reasoned opinion. Give reasons for your answer and include relevant examples from your knowledge or experience.
            </p>
            <div className="text-xs sm:text-sm font-mono text-[#86868b]">
              Write at least 250 words. Recommended duration: 40 minutes.
            </div>
          </div>
        )}

        {/* Band 8.0 Rubrics Checklist */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-2.5 text-sm">
          <div className="font-semibold text-[#1d1d1f] dark:text-[#ededed] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e0001a]" />
            <span>Band 8.0 Diagnostic Criteria</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-[#86868b]">
            <div>• Clear overview / thesis</div>
            <div>• Varied linking phrases</div>
            <div>• Sophisticated collocations</div>
            <div>• Error-free sentence clauses</div>
          </div>
        </div>
      </div>

      {/* Right Pane: Timed Writing Canvas */}
      <div className="md:w-1/2 h-full flex flex-col bg-white dark:bg-[#0a0a0c]">
        {/* Top Word Counter & Tool Bar */}
        <div className="px-6 py-3.5 border-b border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PenTool className="w-4 h-4 text-[#e0001a]" />
            <span className="text-sm font-mono font-bold text-[#1d1d1f] dark:text-[#ededed]">
              Drafting Canvas
            </span>
            <span
              className={`text-xs sm:text-sm font-mono px-2.5 py-1 rounded-md font-bold transition-colors ${
                isTargetMet
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}
            >
              {wordCount} / {minWords} words {isTargetMet && '✓'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-xs sm:text-sm font-mono text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              title="Copy response"
            >
              {copied ? 'Copied' : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setCurrentText('')}
              className="p-2 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-xs sm:text-sm font-mono text-[#86868b] hover:text-[#e0001a] transition-colors"
              title="Clear draft"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Type your response here under test conditions. Your live word count is calculated above in real time..."
          className="flex-1 w-full p-6 text-base sm:text-lg font-sans leading-relaxed text-[#1d1d1f] dark:text-[#ededed] bg-white dark:bg-[#0a0a0c] border-none resize-none focus:outline-none placeholder:text-[#86868b]/60"
        />

        {/* Bottom Bar */}
        <div className="px-6 py-3 border-t border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] flex items-center justify-between text-xs sm:text-sm font-mono text-[#86868b]">
          <span>Auto-saved locally</span>
          <span>{isTargetMet ? 'Length requirement satisfied' : `Need ${minWords - wordCount} more words`}</span>
        </div>
      </div>
    </div>
  );
};
