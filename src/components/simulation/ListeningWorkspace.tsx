import React, { useState } from 'react';
import { Headphones, Play, Pause, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export const ListeningWorkspace: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(32);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const answerKeys: Record<string, string> = {
    q1: 'florence',
    q2: 'mountain',
    q3: '75',
    q4: 'breakfast',
    q5: '07700900142'
  };

  const handleInputChange = (key: string, val: string) => {
    setUserInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleCheck = () => {
    setIsChecked(true);
  };

  const resetAll = () => {
    setUserInputs({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    setIsChecked(false);
    setIsPlaying(false);
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#e5e5e7] dark:divide-[#27272a] bg-white dark:bg-[#0a0a0c]">
      {/* Left Pane: Audio Console */}
      <div className="md:w-1/2 h-full flex flex-col justify-between p-6 md:p-8 bg-[#fbfbfd] dark:bg-[#121215]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Headphones className="w-5 h-5 text-[#e0001a]" />
              <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-[#ededed]">
                Listening Section 1
              </span>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 font-bold">
              AUDIO READY
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] dark:text-[#ededed]">
            Accommodation Booking Inquiry
          </h3>
          <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
            Listen to a telephone conversation between a customer and a travel lodging coordinator. You will hear the recording once only. Complete the notes on the right using NO MORE THAN TWO WORDS AND/OR A NUMBER.
          </p>
        </div>

        {/* Audio Player Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] shadow-subtle space-y-5 my-auto max-w-md mx-auto w-full">
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#86868b]">
            <span>CD-IELTS Audio Track #101</span>
            <span>Single Playback</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-[#f5f5f7] dark:bg-[#27272a] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#e0001a] h-full transition-all"
                style={{ width: `${isPlaying ? audioProgress + 15 : audioProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-[#86868b]">
              <span>01:12</span>
              <span>04:30</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => setIsPlaying(prev => !prev)}
              className="w-13 h-13 p-3.5 rounded-full bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] flex items-center justify-center shadow-subtle hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={() => setAudioProgress(0)}
              className="p-3 rounded-full border border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] hover:text-[#1d1d1f]"
              title="Restart audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-xs sm:text-sm font-mono text-[#86868b] text-center">
          In the actual test, audio playback begins automatically and cannot be replayed.
        </div>
      </div>

      {/* Right Pane: Interactive Form Completion */}
      <div className="md:w-1/2 h-full flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-[#0a0a0c] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#e5e5e7] dark:border-[#27272a]">
            <span className="text-sm font-mono font-bold uppercase text-[#1d1d1f] dark:text-[#ededed]">
              Questions 1–5 · Form Completion
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#86868b]">Exact Spelling Required</span>
          </div>

          {/* Form Notes */}
          <div className="p-6 rounded-2xl bg-[#fbfbfd] dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] space-y-5 text-sm sm:text-base">
            <div className="font-bold text-base sm:text-lg text-[#1d1d1f] dark:text-[#ededed]">
              Hillside Country Retreat Reservation Form
            </div>

            <div className="space-y-4">
              {/* Q1 */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#86868b]">Customer Surname:</span>
                <input
                  type="text"
                  value={userInputs.q1}
                  onChange={(e) => handleInputChange('q1', e.target.value)}
                  placeholder="(Q1) e.g. Florence"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-mono w-48 focus:outline-none focus:border-[#e0001a]"
                />
                {isChecked && (
                  userInputs.q1.toLowerCase().trim() === answerKeys.q1 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              {/* Q2 */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#86868b]">Preferred Lodge View:</span>
                <input
                  type="text"
                  value={userInputs.q2}
                  onChange={(e) => handleInputChange('q2', e.target.value)}
                  placeholder="(Q2) e.g. Mountain"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-mono w-48 focus:outline-none focus:border-[#e0001a]"
                />
                {isChecked && (
                  userInputs.q2.toLowerCase().trim() === answerKeys.q2 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              {/* Q3 */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#86868b]">Deposit Paid: £</span>
                <input
                  type="text"
                  value={userInputs.q3}
                  onChange={(e) => handleInputChange('q3', e.target.value)}
                  placeholder="(Q3) e.g. 75"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-mono w-36 focus:outline-none focus:border-[#e0001a]"
                />
                {isChecked && (
                  userInputs.q3.toLowerCase().trim() === answerKeys.q3 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              {/* Q4 */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#86868b]">Inclusive Service: Continental</span>
                <input
                  type="text"
                  value={userInputs.q4}
                  onChange={(e) => handleInputChange('q4', e.target.value)}
                  placeholder="(Q4) e.g. Breakfast"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-mono w-44 focus:outline-none focus:border-[#e0001a]"
                />
                {isChecked && (
                  userInputs.q4.toLowerCase().trim() === answerKeys.q4 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              {/* Q5 */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#86868b]">Primary Phone:</span>
                <input
                  type="text"
                  value={userInputs.q5}
                  onChange={(e) => handleInputChange('q5', e.target.value)}
                  placeholder="(Q5) e.g. 07700900142"
                  className="px-3 py-1.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#1c1c20] text-sm font-mono w-52 focus:outline-none focus:border-[#e0001a]"
                />
                {isChecked && (
                  userInputs.q5.toLowerCase().trim() === answerKeys.q5 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="pt-6 border-t border-[#e5e5e7] dark:border-[#27272a] flex items-center justify-between">
          <button
            type="button"
            onClick={resetAll}
            className="px-4 py-2 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] text-xs sm:text-sm font-mono text-[#86868b] hover:text-[#1d1d1f]"
          >
            Reset Form
          </button>
          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-2.5 rounded-xl bg-[#1d1d1f] hover:bg-black text-white dark:bg-[#ededed] dark:text-[#0a0a0c] text-sm font-semibold"
          >
            Verify Answers
          </button>
        </div>
      </div>
    </div>
  );
};
