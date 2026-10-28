import React, { useState, useEffect } from 'react';
import { Mic, RotateCcw } from 'lucide-react';

export const SpeakingWorkspace: React.FC = () => {
  const [activePart, setActivePart] = useState<'part1' | 'part2' | 'part3'>('part2');
  const [prepTimeRemaining, setPrepTimeRemaining] = useState<number>(60);
  const [isPrepRunning, setIsPrepRunning] = useState<boolean>(false);
  const [speechTimeRemaining, setSpeechTimeRemaining] = useState<number>(120);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Preparation 60s timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPrepRunning && prepTimeRemaining > 0) {
      interval = setInterval(() => {
        setPrepTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (prepTimeRemaining === 0) {
      setIsPrepRunning(false);
    }
    return () => clearInterval(interval);
  }, [isPrepRunning, prepTimeRemaining]);

  // Speech 120s timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording && speechTimeRemaining > 0) {
      interval = setInterval(() => {
        setSpeechTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (speechTimeRemaining === 0) {
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [isRecording, speechTimeRemaining]);

  const resetPrep = () => {
    setIsPrepRunning(false);
    setPrepTimeRemaining(60);
  };

  const resetSpeech = () => {
    setIsRecording(false);
    setSpeechTimeRemaining(120);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#e5e5e7] dark:divide-[#27272a] bg-white dark:bg-[#0a0a0c]">
      {/* Left Pane: Cue Card & Prompts */}
      <div className="md:w-1/2 h-full flex flex-col overflow-y-auto p-6 md:p-8 bg-[#fbfbfd] dark:bg-[#121215] space-y-6">
        {/* Part Tabs */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActivePart('part1')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all border ${
              activePart === 'part1'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] border-transparent shadow-subtle'
                : 'bg-white dark:bg-[#1c1c20] text-[#86868b] dark:text-[#a1a1aa] border-[#e5e5e7] dark:border-[#27272a]'
            }`}
          >
            Part 1 · Introduction
          </button>
          <button
            type="button"
            onClick={() => setActivePart('part2')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all border ${
              activePart === 'part2'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] border-transparent shadow-subtle'
                : 'bg-white dark:bg-[#1c1c20] text-[#86868b] dark:text-[#a1a1aa] border-[#e5e5e7] dark:border-[#27272a]'
            }`}
          >
            Part 2 · Cue Card (Long Turn)
          </button>
          <button
            type="button"
            onClick={() => setActivePart('part3')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all border ${
              activePart === 'part3'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] border-transparent shadow-subtle'
                : 'bg-white dark:bg-[#1c1c20] text-[#86868b] dark:text-[#a1a1aa] border-[#e5e5e7] dark:border-[#27272a]'
            }`}
          >
            Part 3 · Discussion
          </button>
        </div>

        {/* Content according to active part */}
        {activePart === 'part2' ? (
          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-mono text-[#e0001a] font-bold uppercase tracking-wider">
              Candidate Task Card
            </div>

            {/* Official Cue Card Presentation */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] shadow-subtle space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] dark:text-[#ededed] leading-snug">
                Describe a notable piece of technology or software that significantly improved your daily productivity.
              </h3>

              <div className="text-sm font-mono text-[#86868b]">You should say:</div>

              <ul className="space-y-2.5 text-sm sm:text-base text-[#1d1d1f] dark:text-[#ededed]">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>What the tool is and when you first began using it</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>How you learned to use its primary features</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>What specific tasks or workflows it helps you accomplish</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#e0001a] mt-2 flex-shrink-0" />
                  <span>And explain why you consider it particularly valuable or effective</span>
                </li>
              </ul>

              <div className="pt-3 text-xs sm:text-sm font-mono text-[#86868b] border-t border-[#e5e5e7] dark:border-[#27272a]">
                You have 1 minute to prepare your notes. Then speak for 1 to 2 minutes.
              </div>
            </div>
          </div>
        ) : activePart === 'part1' ? (
          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-mono text-[#e0001a] font-bold uppercase tracking-wider">
              Part 1 · Everyday Conversational Queries (4–5m)
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-3.5 text-sm sm:text-base">
              <div className="font-bold text-[#1d1d1f] dark:text-[#ededed]">Examiner Questions:</div>
              <p>1. Do you prefer working or studying in the morning or late at night?</p>
              <p>2. What kind of transportation do you use most frequently in your hometown?</p>
              <p>3. Has the way you communicate with friends changed in recent years?</p>
              <p>4. Do you enjoy spending your free time outdoors or indoors?</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-mono text-[#e0001a] font-bold uppercase tracking-wider">
              Part 3 · Abstract Thematic Analysis (4–5m)
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-3.5 text-sm sm:text-base">
              <div className="font-bold text-[#1d1d1f] dark:text-[#ededed]">Analytical Debate Questions:</div>
              <p>1. To what extent has automated software diminished human interpersonal collaboration?</p>
              <p>2. Should educational institutions restrict artificial intelligence tools in student assessments?</p>
              <p>3. How will technological disparity impact economic mobility between generations?</p>
            </div>
          </div>
        )}

        {/* Band 8+ Criteria */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-2 text-sm font-mono text-[#86868b]">
          <div className="font-bold text-[#1d1d1f] dark:text-[#ededed]">Scoring Rubrics:</div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>• Fluency &amp; Coherence</div>
            <div>• Lexical Flexibility</div>
            <div>• Grammatical Range</div>
            <div>• Pronunciation &amp; Stress</div>
          </div>
        </div>
      </div>

      {/* Right Pane: Timed Audio Recorder Simulation */}
      <div className="md:w-1/2 h-full flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-[#0a0a0c]">
        {/* Top Title */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <div className="flex items-center gap-2.5">
            <Mic className="w-5 h-5 text-[#e0001a]" />
            <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-[#ededed]">
              Speaking Session Controller
            </span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#86868b]">Digital Recorder Active</span>
        </div>

        {/* Center: Preparation and Speech Clocks */}
        <div className="my-auto py-8 space-y-8 max-w-md mx-auto w-full text-center">
          {/* 1-Minute Prep Countdown */}
          <div className="p-6 rounded-2xl bg-[#fbfbfd] dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] space-y-3.5">
            <div className="text-xs sm:text-sm font-mono uppercase text-[#86868b] font-medium">
              Preparation Clock (1:00 Minute)
            </div>
            <div className="text-5xl font-extrabold font-mono text-[#1d1d1f] dark:text-[#ededed]">
              {formatTimer(prepTimeRemaining)}
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsPrepRunning(prev => !prev)}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]"
              >
                {isPrepRunning ? 'Pause Prep' : 'Start 1m Prep'}
              </button>
              <button
                type="button"
                onClick={resetPrep}
                className="p-2 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] hover:text-[#1d1d1f]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Minute Speech Recording Simulator */}
          <div className="p-6 rounded-2xl bg-[#fbfbfd] dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] space-y-3.5">
            <div className="text-xs sm:text-sm font-mono uppercase text-[#86868b] font-medium">
              Speech Response Timer (2:00 Minutes)
            </div>
            <div className={`text-5xl font-extrabold font-mono ${isRecording ? 'text-[#e0001a] animate-pulse' : 'text-[#1d1d1f] dark:text-[#ededed]'}`}>
              {formatTimer(speechTimeRemaining)}
            </div>

            {/* Audio Waveform simulation bars when recording */}
            {isRecording && (
              <div className="flex items-center justify-center gap-1.5 h-7">
                <span className="w-1.5 bg-[#e0001a] rounded animate-bounce h-3" />
                <span className="w-1.5 bg-[#e0001a] rounded animate-bounce h-5" />
                <span className="w-1.5 bg-[#e0001a] rounded animate-bounce h-7" />
                <span className="w-1.5 bg-[#e0001a] rounded animate-bounce h-4" />
                <span className="w-1.5 bg-[#e0001a] rounded animate-bounce h-2" />
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsRecording(prev => !prev)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isRecording
                    ? 'bg-[#e0001a] text-white shadow-subtle'
                    : 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c]'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Speech (2m)'}
              </button>
              <button
                type="button"
                onClick={resetSpeech}
                className="p-2.5 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] hover:text-[#1d1d1f]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-xs sm:text-sm font-mono text-[#86868b]">
          Tip: Speak continuously without self-correction to maximize Fluency &amp; Coherence marks.
        </div>
      </div>
    </div>
  );
};
