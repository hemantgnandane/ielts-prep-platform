import React, { useState, useEffect } from 'react';
import { useTrack } from '../../context/TrackContext';
import { Wifi, Bell, Menu, ArrowLeft, ArrowRight, Check } from 'lucide-react';

export const WritingWorkspace: React.FC = () => {
  const { track } = useTrack();
  const [activePart, setActivePart] = useState<'part1' | 'part2'>('part1');

  // Persistence via localStorage
  const [part1Text, setPart1Text] = useState<string>(() => {
    return localStorage.getItem('ielts_writing_part1') || '';
  });
  const [part2Text, setPart2Text] = useState<string>(() => {
    return localStorage.getItem('ielts_writing_part2') || '';
  });

  const [splitRatio, setSplitRatio] = useState<number>(50); // percentage for left pane
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('ielts_writing_part1', part1Text);
  }, [part1Text]);

  useEffect(() => {
    localStorage.setItem('ielts_writing_part2', part2Text);
  }, [part2Text]);

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  };

  const currentText = activePart === 'part1' ? part1Text : part2Text;
  const setCurrentText = (val: string) => {
    if (activePart === 'part1') {
      setPart1Text(val);
    } else {
      setPart2Text(val);
    }
  };
  const wordCount = countWords(currentText);

  // Handle split pane dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    const newRatio = ((e.clientX - container.left) / container.width) * 100;
    if (newRatio >= 28 && newRatio <= 72) {
      setSplitRatio(newRatio);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      className="h-full flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] font-sans select-none overflow-hidden"
    >
      {/* 1. Official CD-IELTS Top Bar */}
      <div className="px-6 py-2.5 border-b-2 border-[#d3112c] bg-white dark:bg-[#0a0a0c] flex items-center justify-between">
        {/* Left: Official IELTS Logo & Test Taker ID */}
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <span className="text-3xl font-black tracking-tight text-[#d3112c] font-sans">
              IELTS
            </span>
            <span className="text-[11px] font-sans text-[#d3112c] align-top ml-0.5 font-bold">®</span>
          </div>

          <div className="text-base font-bold text-black dark:text-white tracking-tight">
            Test taker ID
          </div>
        </div>

        {/* Right: Network, Notification, Menu Icons */}
        <div className="flex items-center gap-5 text-black dark:text-white">
          <Wifi className="w-5 h-5 stroke-[2.2]" />
          <Bell className="w-5 h-5 stroke-[2.2]" />
          <Menu className="w-6 h-6 stroke-[2.2] cursor-pointer" />
        </div>
      </div>

      {/* 2. Official Instruction Banner */}
      <div className="mx-6 mt-4 p-3.5 rounded bg-[#f0f0f2] dark:bg-[#18181c] border border-[#d8d8d8] dark:border-[#27272a] space-y-0.5">
        <div className="text-sm font-bold text-black dark:text-white">
          {activePart === 'part1' ? 'Part 1' : 'Part 2'}
        </div>
        <div className="text-sm text-[#262626] dark:text-[#d1d1d6]">
          {activePart === 'part1'
            ? 'You should spend about 20 minutes on this task. Write at least 150 words.'
            : 'You should spend about 40 minutes on this task. Write at least 250 words.'}
        </div>
      </div>

      {/* 3. Main Split-Pane Workspace */}
      <div className="flex-1 flex overflow-hidden px-6 py-4 gap-0">
        {/* Left Pane: Task Prompt & Chart */}
        <div
          style={{ width: `${splitRatio}%` }}
          className="h-full overflow-y-auto pr-6 space-y-5 select-text"
        >
          {activePart === 'part1' ? (
            track === 'academic' ? (
              <div className="space-y-4">
                {/* Academic Task 1 Prompts matching reference image */}
                <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug">
                  The chart below shows the number of trips made by children in one country in 1990 and 2010 to travel to and from school using different modes of transport.
                </p>
                <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug">
                  Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                </p>

                {/* Exact Bar Chart Replicated in SVG */}
                <div className="p-4 bg-white dark:bg-[#121215] border border-neutral-400 dark:border-neutral-700 max-w-lg mx-auto">
                  <div className="text-center font-bold text-xs text-black dark:text-white mb-2 font-sans">
                    Travel to and from school: children aged 5-12
                  </div>

                  <svg viewBox="0 0 460 300" className="w-full h-auto text-xs font-sans">
                    <defs>
                      {/* Striped/Hatched Pattern for 2010 Bars */}
                      <pattern id="hatch2010" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="6" stroke="#222222" strokeWidth="2" />
                      </pattern>
                    </defs>

                    {/* Y-Axis Label */}
                    <text
                      transform="rotate(-90)"
                      x="-150"
                      y="16"
                      textAnchor="middle"
                      className="fill-black dark:fill-white text-[11px] font-sans"
                    >
                      Total number of trips per year (in millions)
                    </text>

                    {/* Grid lines & Y-Axis numbers */}
                    {[
                      { val: 14, y: 30 },
                      { val: 12, y: 64 },
                      { val: 10, y: 98 },
                      { val: 8, y: 132 },
                      { val: 6, y: 166 },
                      { val: 4, y: 200 },
                      { val: 2, y: 234 },
                      { val: 0, y: 268 },
                    ].map((g, i) => (
                      <g key={i}>
                        <text x="46" y={g.y + 4} textAnchor="end" className="fill-black dark:fill-white text-[11px] font-sans">
                          {g.val}
                        </text>
                        <line
                          x1="52"
                          y1={g.y}
                          x2="440"
                          y2={g.y}
                          stroke="#9ca3af"
                          strokeWidth="0.8"
                          strokeDasharray={g.val > 0 ? '3 3' : 'none'}
                        />
                      </g>
                    ))}

                    {/* Chart Outer Frame Lines */}
                    <line x1="52" y1="30" x2="52" y2="268" stroke="#000" strokeWidth="1" />
                    <line x1="52" y1="268" x2="440" y2="268" stroke="#000" strokeWidth="1" />
                    <line x1="440" y1="30" x2="440" y2="268" stroke="#000" strokeWidth="1" />
                    <line x1="52" y1="30" x2="440" y2="30" stroke="#000" strokeWidth="1" />

                    {/* Category 1: Car Passenger (1990: ~4.3m, 2010: ~11.2m) */}
                    <g transform="translate(68, 0)">
                      <rect x="0" y="195" width="20" height="73" fill="#000" />
                      <rect x="22" y="78" width="20" height="190" fill="#fff" />
                      <rect x="22" y="78" width="20" height="190" fill="url(#hatch2010)" stroke="#000" strokeWidth="1" />
                      <text x="21" y="284" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">car</text>
                      <text x="21" y="296" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">passenger</text>
                    </g>

                    {/* Category 2: Walking (1990: ~12.4m, 2010: ~6.1m) */}
                    <g transform="translate(145, 0)">
                      <rect x="0" y="58" width="20" height="210" fill="#000" />
                      <rect x="22" y="165" width="20" height="103" fill="#fff" />
                      <rect x="22" y="165" width="20" height="103" fill="url(#hatch2010)" stroke="#000" strokeWidth="1" />
                      <text x="21" y="286" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">walking</text>
                    </g>

                    {/* Category 3: Cycling (1990: ~6.2m, 2010: ~2.0m) */}
                    <g transform="translate(222, 0)">
                      <rect x="0" y="163" width="20" height="105" fill="#000" />
                      <rect x="22" y="234" width="20" height="34" fill="#fff" />
                      <rect x="22" y="234" width="20" height="34" fill="url(#hatch2010)" stroke="#000" strokeWidth="1" />
                      <text x="21" y="286" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">cycling</text>
                    </g>

                    {/* Category 4: Walking and bus (1990: ~5.8m, 2010: ~3.0m) */}
                    <g transform="translate(299, 0)">
                      <rect x="0" y="170" width="20" height="98" fill="#000" />
                      <rect x="22" y="217" width="20" height="51" fill="#fff" />
                      <rect x="22" y="217" width="20" height="51" fill="url(#hatch2010)" stroke="#000" strokeWidth="1" />
                      <text x="21" y="284" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">walking</text>
                      <text x="21" y="296" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">and bus</text>
                    </g>

                    {/* Category 5: Bus (1990: ~7.0m, 2010: ~5.0m) */}
                    <g transform="translate(376, 0)">
                      <rect x="0" y="149" width="20" height="119" fill="#000" />
                      <rect x="22" y="183" width="20" height="85" fill="#fff" />
                      <rect x="22" y="183" width="20" height="85" fill="url(#hatch2010)" stroke="#000" strokeWidth="1" />
                      <text x="21" y="286" textAnchor="middle" className="fill-black dark:fill-white text-[10px]">bus</text>
                    </g>
                  </svg>

                  {/* Chart Legend */}
                  <div className="flex items-center justify-center gap-8 mt-3 pt-2.5 border-t border-neutral-300 dark:border-neutral-700 text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-3 bg-black border border-black" />
                      <span className="text-black dark:text-white font-semibold">1990</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-3 bg-white border border-black"
                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 1.5px, #fff 1.5px, #fff 4px)' }}
                      />
                      <span className="text-black dark:text-white font-semibold">2010</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug">
                  You recently rented a vehicle for business travel, but experienced multiple mechanical failures.
                </p>
                <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug">
                  Write a formal letter to the regional operations manager of the car rental agency. In your letter:
                </p>
                <ul className="space-y-2 text-sm text-[#1d1d1f] dark:text-[#ededed] list-disc list-inside">
                  <li>State the booking details and the vehicle model you were assigned</li>
                  <li>Explain the safety problems you encountered during your journey</li>
                  <li>Request a full refund and compensation for alternative transit expenses</li>
                </ul>
                <div className="text-xs font-mono text-[#86868b] pt-2">
                  Begin your letter as follows: &ldquo;Dear Sir or Madam,&rdquo;
                </div>
              </div>
            )
          ) : (
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug">
                Write about the following topic:
              </p>
              <p className="text-base font-bold text-black dark:text-white leading-snug">
                Some people believe that university education should be free for all students, while others suggest that individuals should contribute to their tuition costs.
              </p>
              <p className="text-sm sm:text-base font-bold text-black dark:text-white leading-snug">
                Discuss both these views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.
              </p>
              <div className="text-xs font-mono text-[#86868b] pt-3">
                Write at least 250 words. Recommended duration: 40 minutes.
              </div>
            </div>
          )}
        </div>

        {/* Draggable Divider matching the screenshot */}
        <div
          onMouseDown={() => setIsDragging(true)}
          className="w-3.5 flex items-center justify-center cursor-col-resize select-none relative bg-[#7f7f7f] hover:bg-[#666666] transition-colors"
          title="Drag to resize panels"
        >
          {/* Centered splitter drag handle box */}
          <div className="absolute w-5 h-8 bg-white border border-[#444444] rounded-[1px] flex items-center justify-center text-[10px] text-black shadow-sm select-none">
            <span className="font-bold tracking-tighter">⇋</span>
          </div>
        </div>

        {/* Right Pane: Official Text Box & Word Count */}
        <div
          style={{ width: `${100 - splitRatio}%` }}
          className="h-full flex flex-col justify-between pl-6 select-text"
        >
          <div className="flex-1 flex flex-col">
            {/* The Official Rectangular Text Area with Dark Border */}
            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              placeholder=""
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              className="w-full flex-1 min-h-[380px] p-4 text-base font-sans leading-relaxed text-black dark:text-[#ededed] bg-white dark:bg-[#121215] border border-black dark:border-neutral-400 rounded-none focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white resize-none"
            />

            {/* Right-Aligned Word Count */}
            <div className="text-right text-sm font-sans text-black dark:text-neutral-200 pt-2 font-normal">
              Words: <span className="font-semibold">{wordCount}</span>
            </div>
          </div>

          {/* Bottom Navigation Buttons matching image */}
          <div className="flex justify-end items-center gap-2 pt-4">
            {/* Previous Button (Light Gray Square) */}
            <button
              type="button"
              onClick={() => setActivePart('part1')}
              disabled={activePart === 'part1'}
              aria-label="Previous task"
              className="w-12 h-12 rounded-[2px] flex items-center justify-center bg-[#d1d1d6] dark:bg-[#27272a] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b0b0b5] transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white stroke-[3]" />
            </button>

            {/* Next Button (Solid Black Square with White Arrow) */}
            <button
              type="button"
              onClick={() => setActivePart('part2')}
              disabled={activePart === 'part2'}
              aria-label="Next task"
              className="w-12 h-12 rounded-[2px] flex items-center justify-center bg-black dark:bg-white text-white dark:text-black hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shadow-sm"
            >
              <ArrowRight className="w-6 h-6 text-white dark:text-black stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Official Bottom Exam Bar */}
      <div className="h-10 border-t border-[#d8d8d8] dark:border-[#27272a] bg-[#efefef] dark:bg-[#141418] px-6 flex items-center justify-between">
        {/* Left: Part 1 / Part 2 active label */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActivePart('part1')}
            className={`text-sm tracking-tight transition-colors ${
              activePart === 'part1'
                ? 'font-bold text-black dark:text-white underline underline-offset-4 decoration-black dark:decoration-white decoration-2'
                : 'text-[#666666] hover:text-black dark:text-[#a1a1aa]'
            }`}
          >
            Part 1
          </button>
          <span className="text-neutral-400">|</span>
          <button
            type="button"
            onClick={() => setActivePart('part2')}
            className={`text-sm tracking-tight transition-colors ${
              activePart === 'part2'
                ? 'font-bold text-black dark:text-white underline underline-offset-4 decoration-black dark:decoration-white decoration-2'
                : 'text-[#666666] hover:text-black dark:text-[#a1a1aa]'
            }`}
          >
            Part 2
          </button>
        </div>

        {/* Right: Checkmark Status Icon */}
        <div className="w-8 h-8 rounded-[2px] flex items-center justify-center bg-transparent border border-transparent">
          <Check className="w-5 h-5 text-black dark:text-white stroke-[3]" />
        </div>
      </div>
    </div>
  );
};
