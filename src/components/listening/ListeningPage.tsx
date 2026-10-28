import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sliders,
  CheckCircle2,
  BookOpen,
  Users,
  Building,
  GraduationCap,
  Volume2,
  RotateCcw,
  Pause
} from 'lucide-react';

export interface ListeningPageProps {
  onBackToHome: () => void;
}

export type ListeningTestSelection =
  | { type: 'full'; id: string; title: string; questions: number; duration: string }
  | { type: 'part'; partNumber: number; title: string; questions: number; duration: string }
  | null;

export const ListeningPage: React.FC<ListeningPageProps> = ({ onBackToHome }) => {
  const [filter, setFilter] = useState<'all' | 'full' | 'parts'>('all');
  const [testMode, setTestMode] = useState<'exam' | 'practice'>('exam');
  const [activeTest, setActiveTest] = useState<ListeningTestSelection>(null);

  // Audio player state for active test runner
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(18);

  const partWiseTests = [
    {
      part: 1,
      title: 'Part 1: Social Dialogue',
      subtitle: 'Everyday Two-Person Conversation',
      description: 'Conversation between two speakers in an everyday social context (e.g., reserving holiday lodging, joining a sports club, local transit inquiry).',
      questions: 10,
      questionRange: 'Questions 1–10',
      duration: '6–7 Minutes',
      questionTypes: 'Form Completion · Note Taking · Table Filling',
      accents: 'British & Australian Accents',
      icon: <Users className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Social Context',
      difficulty: 'Standard'
    },
    {
      part: 2,
      title: 'Part 2: Social Monologue',
      subtitle: 'Local Facility & Community Speech',
      description: 'One speaker presenting information about local community facilities, campus buildings, park amenities, or tourist services.',
      questions: 10,
      questionRange: 'Questions 11–20',
      duration: '6–7 Minutes',
      questionTypes: 'Map & Plan Labelling · Multiple Choice · Matching',
      accents: 'British & New Zealand Accents',
      icon: <Building className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Public Monologue',
      difficulty: 'Moderate'
    },
    {
      part: 3,
      title: 'Part 3: Academic Discussion',
      subtitle: 'Educational Tutorial & Study Group',
      description: 'A conversation between up to four people in an educational or training setting (e.g., university tutor and two students discussing an assignment).',
      questions: 10,
      questionRange: 'Questions 21–30',
      duration: '6–7 Minutes',
      questionTypes: 'Multiple Choice · Flow-chart Completion · Classification',
      accents: 'British & North American Accents',
      icon: <BookOpen className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Academic Dialogue',
      difficulty: 'Challenging'
    },
    {
      part: 4,
      title: 'Part 4: University Lecture',
      subtitle: 'Continuous Academic Monologue',
      description: 'A monologue on an academic subject delivered by a university lecturer (e.g., evolutionary marine biology, ancient architectural history).',
      questions: 10,
      questionRange: 'Questions 31–40',
      duration: '7–8 Minutes',
      questionTypes: 'Summary Completion · Sentence Notes · No mid-section break',
      accents: 'British Academic Accent',
      icon: <GraduationCap className="w-5 h-5 text-[#e0001a]" />,
      badge: 'Academic Monologue',
      difficulty: 'Advanced'
    }
  ];

  const fullTests = [
    {
      id: 'full-1',
      title: 'Full Listening Mock Test 01',
      description: 'Standard 4-part recording spanning social dialogues, community announcements, university project consultations, and an academic lecture. Played continuously under strict test timing.',
      questions: 40,
      duration: '30 Minutes (+ 2 Min Review)',
      partsIncluded: 'Parts 1, 2, 3 & 4 (All 40 Questions)',
      accents: 'UK, Australian, North American & Canadian',
      status: 'Ready'
    },
    {
      id: 'full-2',
      title: 'Full Listening Mock Test 02',
      description: 'Authentic 4-part simulation featuring public event volunteer coordination, library archives guide, environmental science case study, and archaeology lecture.',
      questions: 40,
      duration: '30 Minutes (+ 2 Min Review)',
      partsIncluded: 'Parts 1, 2, 3 & 4 (All 40 Questions)',
      accents: 'UK, Scottish, Australian & American',
      status: 'Ready'
    }
  ];

  // If a test is actively opened
  if (activeTest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] py-8 px-4 sm:px-8 lg:px-12 xl:px-16 space-y-6">
        {/* Active Test Top Bar with Back Button */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <button
            type="button"
            onClick={() => {
              setActiveTest(null);
              setIsPlaying(false);
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed] hover:text-[#e0001a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#e0001a]" />
            <span>Back to Listening Tests</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#e0001a]/10 text-[#e0001a] uppercase tracking-wider">
              {activeTest.type === 'full' ? 'FULL MOCK TEST' : `PART ${activeTest.partNumber} TEST`}
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
              {activeTest.duration} · {activeTest.questions} Questions
            </span>
          </div>
        </div>

        {/* Test Header */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
            {activeTest.title}
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa]">
            {activeTest.type === 'full'
              ? 'Complete the 40 questions as the audio plays. You will hear each section once only.'
              : `Focus practice on ${activeTest.title}. Answer the 10 questions under official format.`}
          </p>
        </div>

        {/* Audio Controller Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#f5f5f7] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPlaying(prev => !prev)}
              className="w-12 h-12 rounded-full bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-[#1d1d1f] dark:text-[#ededed]">
                Official Audio Stream (Track #01)
              </div>
              <div className="text-xs font-mono text-[#86868b] dark:text-[#a1a1aa]">
                {isPlaying ? 'Playing • Single stream' : 'Ready to play'}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex-1 max-w-md space-y-1.5">
            <div className="w-full bg-[#e5e5e7] dark:bg-[#27272a] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#e0001a] h-full transition-all duration-300"
                style={{ width: `${isPlaying ? audioProgress + 10 : audioProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-[#86868b]">
              <span>01:14</span>
              <span>{activeTest.type === 'full' ? '30:00' : '06:45'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAudioProgress(0)}
              className="p-2.5 rounded-lg border border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              title="Restart Audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#27272a] border border-[#e5e5e7] dark:border-[#27272a] text-xs font-mono text-[#86868b]">
              <Volume2 className="w-3.5 h-3.5" />
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Notice for candidate */}
        <div className="p-8 rounded-2xl border-2 border-dashed border-[#e5e5e7] dark:border-[#27272a] text-center space-y-3">
          <Headphones className="w-8 h-8 text-[#e0001a] mx-auto" />
          <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-[#ededed]">
            Ready for Listening Exam Interface Customization
          </h3>
          <p className="text-sm text-[#86868b] dark:text-[#a1a1aa] max-w-xl mx-auto leading-relaxed">
            This test session is initialized. Whenever you provide the layout and screenshot specifications for the listening exam screen (split-view, question cards, audio controls), it will be rendered right here!
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTest(null);
              setIsPlaying(false);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Return to Test Selection</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] py-10 md:py-14">
      {/* Full-width container spanning screen */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-9">
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex items-center justify-between gap-4 pb-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#e0001a] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home / Practice Modules</span>
          </button>

          <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
            Page: Listening Hub
          </span>
        </div>

        {/* Page Title & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-[#e5e5e7] dark:border-[#27272a]">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#e0001a] font-bold">
              <Headphones className="w-4 h-4" />
              <span>OFFICIAL LISTENING MODULE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
              Listening Practice Tests
            </h1>
            <p className="text-base sm:text-lg text-[#86868b] dark:text-[#a1a1aa] max-w-3xl leading-relaxed">
              Take complete 40-question mock tests under authentic test conditions, or drill individual parts (Part 1, Part 2, Part 3, and Part 4) to master specific question types.
            </p>
          </div>

          {/* Filter Pills & Exam Mode Toggle */}
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
                Full Tests (40Q)
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
                Part-wise Tests (10Q)
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] text-xs sm:text-sm font-medium">
              <button
                type="button"
                onClick={() => setTestMode('exam')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
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

        {/* 1. Full Listening Tests Section */}
        {(filter === 'all' || filter === 'full') && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                  Full Listening Mock Tests
                </h2>
                <p className="text-sm text-[#86868b] dark:text-[#a1a1aa] mt-0.5">
                  Complete 40-question exam covering all 4 parts in a single session
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                {fullTests.length} Full Tests Available
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 w-full">
              {fullTests.map((t) => (
                <div
                  key={t.id}
                  className="p-7 sm:p-9 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#fbfbfd] to-[#f5f5f7] dark:from-[#121215] dark:to-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] shadow-subtle hover:border-[#1d1d1f] dark:hover:border-[#ededed] transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-4 max-w-3xl">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#e0001a]/10 text-[#e0001a]">
                          {t.title.includes('01') ? 'RECOMMENDED MOCK' : 'OFFICIAL MOCK'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#e5e5e7] dark:bg-[#27272a] text-[#1d1d1f] dark:text-[#ededed]">
                          {t.questions} Questions
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#e5e5e7] dark:bg-[#27272a] text-[#1d1d1f] dark:text-[#ededed]">
                          {t.duration}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Official Band Scale (1.0–9.0)
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                        {t.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                        {t.description}
                      </p>

                      {/* Specs */}
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

                    {/* Action Column */}
                    <div className="flex lg:flex-col items-center sm:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#e5e5e7] dark:border-[#27272a]">
                      <div className="text-left lg:text-right">
                        <div className="text-xs font-mono text-[#86868b] uppercase">Mode</div>
                        <div className="text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                          {testMode === 'exam' ? 'Strict Timed CD Exam' : 'Practice with Pause & Review'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveTest({
                            type: 'full',
                            id: t.id,
                            title: t.title,
                            questions: t.questions,
                            duration: t.duration
                          })
                        }
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold text-sm sm:text-base hover:opacity-90 active:scale-98 transition-all shadow-subtle group"
                      >
                        <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        <span>Start Full 40Q Test</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Part-Wise Tests Section (Exact 2x2 Format) */}
        {(filter === 'all' || filter === 'parts') && (
          <div className="space-y-5 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
                  Part-Wise Practice Tests
                </h2>
                <p className="text-sm text-[#86868b] dark:text-[#a1a1aa] mt-0.5">
                  Targeted section drills: 10 questions each with specific audio environments
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                4 Targeted Parts
              </span>
            </div>

            {/* 2x2 Grid of Part-Wise Tests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 w-full">
              {partWiseTests.map((p) => (
                <div
                  key={p.part}
                  className="group flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-[#1d1d1f] dark:hover:border-[#ededed] shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark transition-all duration-200"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge + Duration */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a] group-hover:scale-105 transition-transform">
                          {p.icon}
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#e0001a]/10 text-[#e0001a]">
                            PART {p.part}
                          </span>
                          <span className="ml-2 text-xs font-mono text-[#86868b]">
                            {p.badge}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                          {p.duration}
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-semibold px-2.5 py-1 rounded bg-[#f5f5f7] dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] border border-[#e5e5e7] dark:border-[#27272a]">
                          {p.questionRange}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                        {p.title}
                      </h3>
                      <div className="text-sm font-semibold text-[#1d1d1f] dark:text-[#ededed]">
                        {p.subtitle}
                      </div>
                      <p className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Specifications Box */}
                    <div className="p-4 rounded-xl bg-[#f5f5f7] dark:bg-[#18181c] border border-[#e5e5e7] dark:border-[#27272a] space-y-2 text-xs sm:text-sm">
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
                      onClick={() =>
                        setActiveTest({
                          type: 'part',
                          partNumber: p.part,
                          title: p.title,
                          questions: p.questions,
                          duration: p.duration
                        })
                      }
                      className="text-sm sm:text-base font-semibold text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors flex items-center gap-2"
                    >
                      <span>Take Part {p.part} Test</span>
                      <ArrowRight className="w-4 h-4 text-[#e0001a] group-hover:translate-x-1.5 transition-transform" />
                    </button>

                    <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
                      10 Questions · Single Audio
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
