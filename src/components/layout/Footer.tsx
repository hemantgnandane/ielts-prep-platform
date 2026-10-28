import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0c] border-t border-[#e5e5e7] dark:border-[#27272a] text-[#86868b] dark:text-[#a1a1aa] py-8 text-sm font-mono">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-base font-bold text-[#1d1d1f] dark:text-[#ededed]">IELTS</span>
          <span className="w-2 h-2 rounded-full bg-[#e0001a]" />
          <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded border border-[#e5e5e7] dark:border-[#27272a] bg-[#f5f5f7] dark:bg-[#121215] font-bold">
            PREP
          </span>
          <span className="ml-2 text-xs sm:text-sm">© 2026. Minimalist CD-IELTS Practice Platform.</span>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm font-medium">
          <span>Band 9.0 Descriptors</span>
          <span>•</span>
          <span>2026 Format Aligned</span>
          <span>•</span>
          <span>Frictionless Environment</span>
        </div>
      </div>
    </footer>
  );
};
