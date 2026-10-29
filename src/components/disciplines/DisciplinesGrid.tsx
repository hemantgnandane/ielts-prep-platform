import React from 'react';
import { BookOpen, PenTool, Headphones, Mic, ArrowRight } from 'lucide-react';
import { useTrack } from '../../context/TrackContext';
import { ActivePracticeModule } from '../simulation/SimulationViewer';

export interface DisciplinesGridProps {
  onSelectModule?: (mod: ActivePracticeModule) => void;
  onNavigateToListening?: () => void;
  onNavigateToReading?: () => void;
  onNavigateToWriting?: () => void;
  onNavigateToSpeaking?: () => void;
}

export const DisciplinesGrid: React.FC<DisciplinesGridProps> = ({
  onSelectModule,
  onNavigateToListening,
  onNavigateToReading,
  onNavigateToWriting,
  onNavigateToSpeaking
}) => {
  const { track } = useTrack();

  const handleModuleClick = (modId: ActivePracticeModule) => {
    if (modId === 'reading' && onNavigateToReading) {
      onNavigateToReading();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (modId === 'listening' && onNavigateToListening) {
      onNavigateToListening();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (modId === 'writing' && onNavigateToWriting) {
      onNavigateToWriting();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (modId === 'speaking' && onNavigateToSpeaking) {
      onNavigateToSpeaking();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onSelectModule) {
      onSelectModule(modId);
    }
    const el = document.getElementById('simulation-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const modules: Array<{
    id: ActivePracticeModule;
    icon: React.ReactNode;
    title: string;
    duration: string;
    format: string;
    highlight: string;
    actionText: string;
  }> = [
    {
      id: 'reading',
      icon: <BookOpen className="w-6 h-6 text-[#1d1d1f] dark:text-[#ededed]" />,
      title: 'Reading',
      duration: '60 Min',
      format: '40 Questions · 3 Passages',
      highlight: track === 'academic' ? 'Academic Research Passages' : 'Workplace & General Survival Texts',
      actionText: 'Open Reading Page'
    },
    {
      id: 'writing',
      icon: <PenTool className="w-6 h-6 text-[#1d1d1f] dark:text-[#ededed]" />,
      title: 'Writing',
      duration: '60 Min',
      format: 'Task 1 (150w) & Task 2 (250w)',
      highlight: track === 'academic' ? 'Task 1 Visual Data Report' : 'Task 1 Functional Letter',
      actionText: 'Open Writing Page'
    },
    {
      id: 'listening',
      icon: <Headphones className="w-6 h-6 text-[#1d1d1f] dark:text-[#ededed]" />,
      title: 'Listening',
      duration: '30 Min',
      format: '40 Questions · 4 Sections',
      highlight: 'Full Test + Part 1, 2, 3 & 4 Practice',
      actionText: 'Open Listening Page'
    },
    {
      id: 'speaking',
      icon: <Mic className="w-6 h-6 text-[#1d1d1f] dark:text-[#ededed]" />,
      title: 'Speaking',
      duration: '11–14 Min',
      format: '3 Parts · 1-on-1 Interview',
      highlight: 'Full Test + Part 1, 2 & 3 Practice',
      actionText: 'Open Speaking Page'
    }
  ];

  return (
    <section
      id="practice-modules"
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 md:py-16 border-b border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c]"
    >
      {/* Full-width container across the screen */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-7">
        {/* Header spanning edge to edge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
          <div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#e0001a] font-bold mb-1.5">
              PRACTICE MODULES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed]">
              Select a discipline to begin.
            </h2>
          </div>

          <div className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] font-medium pb-1">
            4 Official Test Sections Aligned
          </div>
        </div>

        {/* 2 X 2 Grid with standard readable text sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 w-full">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => handleModuleClick(m.id)}
              className="group cursor-pointer flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-[#27272a] hover:border-[#1d1d1f] dark:hover:border-[#ededed] transition-all duration-200 shadow-subtle hover:shadow-apple dark:hover:shadow-apple-dark"
            >
              <div className="space-y-5">
                {/* Top Row: Icon in squircle + Duration Pill */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 p-3 rounded-2xl bg-[#f5f5f7] dark:bg-[#1c1c20] flex items-center justify-center border border-[#e5e5e7] dark:border-[#27272a] group-hover:scale-105 transition-transform">
                    {m.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-semibold px-3.5 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c20] text-[#1d1d1f] dark:text-[#ededed] border border-[#e5e5e7] dark:border-[#27272a]">
                    {m.duration}
                  </span>
                </div>

                {/* Title & Format & Highlight */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] group-hover:text-[#e0001a] transition-colors">
                    {m.title}
                  </h3>
                  <div className="text-sm sm:text-base font-medium text-[#1d1d1f] dark:text-[#ededed]">
                    {m.format}
                  </div>
                  <div className="text-sm sm:text-base text-[#86868b] dark:text-[#a1a1aa] leading-relaxed">
                    {m.highlight}
                  </div>
                </div>
              </div>

              {/* Bottom Action Row with Divider */}
              <div className="pt-5 mt-6 border-t border-[#e5e5e7] dark:border-[#27272a] flex items-center justify-between">
                <span className="text-sm sm:text-base font-semibold text-[#1d1d1f] dark:text-[#ededed] group-hover:translate-x-0.5 transition-transform">
                  {m.actionText}
                </span>
                <ArrowRight className="w-5 h-5 text-[#e0001a] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
