import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { DisciplinesGrid } from './components/disciplines/DisciplinesGrid';
import { ListeningHub } from './components/listening/ListeningHub';
import { SimulationViewer, ActivePracticeModule } from './components/simulation/SimulationViewer';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ActivePracticeModule>('writing');

  const handleSelectModule = (mod: ActivePracticeModule) => {
    setActiveModule(mod);
    if (mod === 'listening') {
      const el = document.getElementById('listening-page');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    const el = document.getElementById('simulation-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartListeningTest = (_type: 'full' | 'part', _partNumber?: number) => {
    setActiveModule('listening');
    const el = document.getElementById('simulation-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] font-sans antialiased transition-colors duration-200">
      <Header />
      <main>
        {/* Page 1: Centered Apple-Style Hero */}
        <Hero />

        {/* Page 2: 2x2 Practice Modules Grid */}
        <DisciplinesGrid onSelectModule={handleSelectModule} />

        {/* Page 3: The Dedicated Listening Hub (Full Mock Test & Part-Wise Tests) */}
        <ListeningHub onStartTest={handleStartListeningTest} />

        {/* Page 4: The CD Practice Workspace */}
        <SimulationViewer
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
