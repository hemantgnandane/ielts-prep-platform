import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Clock,
  ArrowRight,
  Sliders,
  CheckCircle2,
  BookOpen,
  Users,
  Building,
  GraduationCap
} from 'lucide-react';

export interface ListeningHubProps {
  onStartTest?: (type: 'full' | 'part', partNumber?: number) => void;
}

export const ListeningHub: React.FC<ListeningHubProps> = ({ onStartTest }) => {
  const [filter, setFilter] = useState<'all' | 'full' | 'parts'>('all');
  const [testMode, setTestMode] = useState<'exam' | 'practice'>('exam');

  const handleStart = (type: 'full' | 'part', partNumber?: number) => {
    if (onStartTest) {
      onStartTest(type, partNumber);
    } else {
      const el = document.getElementById('simulation-engine');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const partWiseTests = [
    {
      part: 1,
      title: 'Part 1: Everyday Social Dialogue',
      description: 'Conversation between two speakers in an everyday social context (e.g., booking travel accommodation, inquiring about a local fitness club).',
      questions: 'Questions 1–10',
      duration: '6–7 Minutes',
      questionTypes: 'Form Completion · Note Taking · Table Filling',
      accents: 'British & Australian Accents',
      icon: <Users className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Social Context',
      difficulty: 'Standard'
    },
    {
      part: 2,
      title: 'Part 2: Everyday Social Monologue',
      description: 'One speaker presenting information about local community facilities, campus buildings, or public amenities.',
      questions: 'Questions 11–20',
      duration: '6–7 Minutes',
      questionTypes: 'Map & Plan Labelling · Multiple Choice · Matching',
      accents: 'British & New Zealand Accents',
      icon: <Building className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Public Monologue',
      difficulty: 'Moderate'
    },
    {
      part: 3,
      title: 'Part 3: Academic & Training Discussion',
      description: 'A conversation between up to four people in an educational or training setting (e.g., university tutor and two students discussing an assignment).',
      questions: 'Questions 21–30',
      duration: '6–7 Minutes',
      questionTypes: 'Multiple Choice · Flow-chart Completion · Classification',
      accents: 'British & North American Accents',
      icon: <BookOpen className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Academic Dialogue',
      difficulty: 'Challenging'
    },
    {
      part: 4,
      title: 'Part 4: University Academic Lecture',
      description: 'A monologue on an academic subject delivered by a university lecturer (e.g., evolutionary biology, urban architectural history).',
      questions: 'Questions 31–40',
      duration: '7–8 Minutes',
      questionTypes: 'Summary Completion · Sentence Notes · No mid-section break',
      accents: 'British Academic Accent',
      icon: <GraduationCap className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Academic Monologue',
      difficulty: 'Advanced'
    }
  ];

  return (
    <section
      id="listening-page"
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16 border-b border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c]"
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#e0001a] font-bold">
              <Headphones className="w-4 h-4" />
              <span>LISTENING MODULE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
              Listening Practice Tests
            </h2>
            <p className="text-base sm:text-lg text-[#86868b] dark:text-[#a1a1aa] max-w-3xl leading-relaxed">
              Complete standard 40-question mock tests under authentic exam timing, or drill specific sections with targeted part-wise practice.
            </p>
          </div>

          {/* Controls: Filter Pills & Exam Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="inline-flex items-center p-1 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-xs sm:text-sm font-medium">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  filter === 'all'
                    ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                All Tests
              </button>
              <button
                type="button"
                onClick={() => setFilter('full')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  filter === 'full'
                    ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                Full Test (40Q)
              </button>
              <button
                type="button"
                onClick={() => setFilter('parts')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  filter === 'parts'
                    ? 'bg-white dark:bg-[#27272a] text-[#1d1d1f] dark:text-white shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                Part-wise (10Q)
              </button>
            </div>

            {/* Mode Toggle Pill */}
            <div className="inline-flex items-center p-1 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-xs sm:text-sm font-medium">
              <button
                type="button"
                onClick={() => setTestMode('exam')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  testMode === 'exam'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#e0001a]" />
                <span>Exam Mode</span>
              </button>
              <button
                type="button"
                onClick={() => setTestMode('practice')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  testMode === 'practice'
                    ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Practice Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Full Listening Test Section */}
        {(filter === 'all' || filter === 'full') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                Full Mock Tests
              </h3>
              <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                Complete 40-Question Tests
              </span>
            </div>

            {/* Featured Full Mock Test Card */}
            <div className="p-6 sm:p-9 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#fbfbfd] to-[#f5f5f7] dark:from-[#121215] dark:to-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] shadow-subtle hover:border-[#1d1d1f] dark:hover:border-[#ededed] transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4 max-w-3xl">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#e0001a]/10 text-[#e0001a]">
                      FULL TEST 01
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#e5e5e7] dark:bg-[#27272a] text-[#1d1d1f] dark:text-[#ededed]">
                      40 Questions
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#e5e5e7] dark:bg-[#27272a] text-[#1d1d1f] dark:text-[#ededed]">
                      30 Mins Audio + 2 Mins Review
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Standard Band Calibration
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                    Official Listening Practice Test 1
                  </h4>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                    Standard 4-part recording spanning everyday social dialogues, community announcements, university project consultations, and an academic lecture. Played once under strict test timing.
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs sm:text-sm font-medium text-[#1d1d1f] dark:text-[#ededed]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e0001a]" />
                      <span>Part 1 (Q1–10)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e0001a]" />
                      <span>Part 2 (Q11–20)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e0001a]" />
                      <span>Part 3 (Q21–30)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#e0001a]" />
                      <span>Part 4 (Q31–40)</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="flex lg:flex-col items-center sm:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#e5e5e7] dark:border-[#27272a]">
                  <div className="text-left lg:text-right">
                    <div className="text-xs font-mono text-[#86868b] uppercase">Mode</div>
                    <div className="text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                      {testMode === 'exam' ? 'Strict Timed CD Exam' : 'Practice with Pause & Review'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStart('full')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm sm:text-base hover:opacity-90 active:scale-98 transition-all shadow-subtle group"
                  >
                    <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    <span>Start Full Mock Test</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Part-Wise Tests Section */}
        {(filter === 'all' || filter === 'parts') && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                  Part-Wise Practice Tests
                </h3>
                <p className="text-sm text-[#86868b] dark:text-[#a1a1aa] mt-0.5">
                  Focus on specific question types and audio formats (10 questions per part)
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                4 Targeted Sections
              </span>
            </div>

            {/* 2x2 Grid of Part-Wise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {partWiseTests.map((p) => (
                <div
                  key={p.part}
                  className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-[#1d1d1f] dark:hover:border-[#ededed] shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark transition-all duration-200"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge + Duration */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a]">
                          {p.icon}
                        </div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#e0001a]/10 text-[#e0001a]">
                          PART {p.part}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#86868b] dark:text-[#a1a1aa]">
                          {p.duration}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f5f5f7] dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] border border-[#e5e5e7] dark:border-[#27272a]">
                          {p.questions}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Details Box */}
                    <div className="p-3.5 rounded-xl bg-[#f5f5f7] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-1.5 text-xs sm:text-sm">
                      <div className="flex items-center justify-between text-[#1d1d1f] dark:text-[#ededed]">
                        <span className="text-[#86868b] dark:text-[#a1a1aa]">Question Types:</span>
                        <span className="font-medium text-right">{p.questionTypes}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#1d1d1f] dark:text-[#ededed]">
                        <span className="text-[#86868b] dark:text-[#a1a1aa]">Voice Accents:</span>
                        <span className="font-medium text-right">{p.accents}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-5 mt-6 border-t border-[#e5e5e7] dark:border-[#27272a] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleStart('part', p.part)}
                      className="text-sm sm:text-base font-semibold text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors flex items-center gap-2"
                    >
                      <span>Start Part {p.part} Practice</span>
                      <ArrowRight className="w-4 h-4 text-[#e0001a] group-hover:translate-x-1.5 transition-transform" />
                    </button>

                    <span className="text-xs font-mono text-[#86868b] dark:text-[#a1a1aa]">
                      10 Questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
