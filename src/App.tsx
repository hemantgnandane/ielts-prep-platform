import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { DisciplinesGrid } from './components/disciplines/DisciplinesGrid';
import { ListeningPage } from './components/listening/ListeningPage';
import { SimulationViewer, ActivePracticeModule } from './components/simulation/SimulationViewer';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'listening'>(() => {
    return window.location.hash === '#listening' ? 'listening' : 'home';
  });
  const [activeModule, setActiveModule] = useState<ActivePracticeModule>('writing');

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#listening') {
        setCurrentView('listening');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: 'home' | 'listening', targetSectionId?: string) => {
    setCurrentView(view);
    window.location.hash = view === 'listening' ? '#listening' : '#home';

    if (view === 'home') {
      if (targetSectionId) {
        setTimeout(() => {
          const el = document.getElementById(targetSectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectModule = (mod: ActivePracticeModule) => {
    if (mod === 'listening') {
      handleNavigate('listening');
      return;
    }
    setActiveModule(mod);
    const el = document.getElementById('simulation-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] font-sans antialiased transition-colors duration-200">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main>
        {currentView === 'home' ? (
          <>
            {/* Page 1: Centered Apple-Style Hero */}
            <Hero />

            {/* Page 2: 2x2 Practice Modules Grid */}
            <DisciplinesGrid
              onSelectModule={handleSelectModule}
              onNavigateToListening={() => handleNavigate('listening')}
            />

            {/* Page 3: The CD Practice Workspace */}
            <SimulationViewer
              activeModule={activeModule}
              onModuleChange={setActiveModule}
            />
          </>
        ) : (
          /* Dedicated Standalone Page for Listening */
          <ListeningPage
            onBackToHome={() => handleNavigate('home')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
