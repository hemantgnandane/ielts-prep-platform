import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { useTrack } from '../../context/TrackContext';

export const Hero: React.FC = () => {
  const { track, setTrack, trackLabel } = useTrack();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center border-b border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c] overflow-hidden px-4 sm:px-6 py-16">
      {/* Background subtle radial ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(224,0,26,0.03),transparent)] pointer-events-none" />

      {/* Centered Minimalist Content — ONLY in the center on one page */}
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center relative z-10 space-y-8">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215] text-xs sm:text-sm font-mono font-medium text-[#1d1d1f] dark:text-[#ededed] shadow-subtle animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-[#e0001a]" />
          <span>British Council &amp; IDP Aligned Standards</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#86868b] dark:bg-[#a1a1aa]" />
          <span className="text-[#86868b] dark:text-[#a1a1aa] font-semibold">2026 Ready</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#ededed] leading-[1.05]">
            Master the IELTS. <br />
            <span className="text-[#86868b] dark:text-[#a1a1aa] font-normal">
              With absolute clarity.
            </span>
          </h1>

          {/* Philosophy */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base font-mono tracking-widest uppercase text-[#e0001a] font-bold pt-1">
            <span>Focused</span>
            <span className="text-[#86868b] dark:text-[#52525b]">•</span>
            <span>Fluent</span>
            <span className="text-[#86868b] dark:text-[#52525b]">•</span>
            <span>Calm</span>
          </div>
        </div>

        {/* Subtitle with active track context */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#86868b] dark:text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed">
          An uncompromised, zero-distraction CD-IELTS workspace. Precision True/False/Not Given logic engines, authentic split-pane reading, and official band calibration for{' '}
          <span className="text-[#1d1d1f] dark:text-[#ededed] font-medium underline decoration-[#e0001a]/40 decoration-1 underline-offset-4">
            {trackLabel}
          </span>
          .
        </p>

        {/* Target Track Switcher Pill */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl border border-[#e5e5e7] dark:border-[#27272a] bg-[#fbfbfd] dark:bg-[#121215]">
          <span className="text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa] px-3 font-medium">
            Target Track:
          </span>
          <button
            type="button"
            onClick={() => setTrack('academic')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              track === 'academic'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#ededed]'
            }`}
          >
            Academic (Higher Education)
          </button>
          <button
            type="button"
            onClick={() => setTrack('general')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              track === 'general'
                ? 'bg-[#1d1d1f] text-white dark:bg-[#ededed] dark:text-[#0a0a0c] shadow-subtle font-semibold'
                : 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#ededed]'
            }`}
          >
            General Training (Migration &amp; Work)
          </button>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => scrollTo('practice-modules')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-[#ededed] dark:text-[#0a0a0c] dark:hover:bg-white text-base font-semibold tracking-tight transition-all active:scale-[0.98] shadow-apple dark:shadow-apple-dark"
          >
            <span>Explore 4 Modules</span>
            <ArrowRight className="w-5 h-5 text-[#e0001a]" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('simulation-engine')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-[#e5e5e7] dark:border-[#27272a] bg-white dark:bg-[#0a0a0c] hover:bg-[#f5f5f7] dark:hover:bg-[#121215] text-[#1d1d1f] dark:text-[#ededed] text-base font-medium tracking-tight transition-all active:scale-[0.98]"
          >
            <BookOpen className="w-5 h-5 text-[#86868b]" />
            <span>Begin Full Mock Test</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono text-[#86868b] dark:text-[#a1a1aa]">
          <span className="font-semibold text-[#1d1d1f] dark:text-[#ededed]">
            Official 9-Band Descriptors
          </span>
          <span className="text-[#e0001a]">•</span>
          <span className="font-semibold text-[#1d1d1f] dark:text-[#ededed]">
            Instant Diagnostic Analysis
          </span>
        </div>
      </div>
    </section>
  );
};
