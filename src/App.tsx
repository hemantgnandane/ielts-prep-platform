import React, { useState, useEffect } from 'react';
import { Header, PageView } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { DisciplinesGrid } from './components/disciplines/DisciplinesGrid';
import { ListeningPage } from './components/listening/ListeningPage';
import { ReadingPage } from './components/reading/ReadingPage';
import { SimulationViewer, ActivePracticeModule } from './components/simulation/SimulationViewer';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(() => {
    if (window.location.hash === '#listening') return 'listening';
    if (window.location.hash === '#reading') return 'reading';
    return 'home';
  });
  const [activeModule, setActiveModule] = useState<ActivePracticeModule>('writing');

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#listening') {
        setCurrentView('listening');
      } else if (window.location.hash === '#reading') {
        setCurrentView('reading');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: PageView, targetSectionId?: string) => {
    setCurrentView(view);
    if (view === 'listening') {
      window.location.hash = '#listening';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'reading') {
      window.location.hash = '#reading';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '#home';
      if (targetSectionId) {
        setTimeout(() => {
          const el = document.getElementById(targetSectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSelectModule = (mod: ActivePracticeModule) => {
    if (mod === 'listening') {
      handleNavigate('listening');
      return;
    }
    if (mod === 'reading') {
      handleNavigate('reading');
      return;
    }
    setActiveModule(mod);
    const el = document.getElementById('simulation-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchExamFromReading = (_testId: number | string, _passageNumber?: number) => {
    setActiveModule('reading');
    setCurrentView('home');
    window.location.hash = '#home';
    setTimeout(() => {
      const el = document.getElementById('simulation-engine');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] font-sans antialiased transition-colors duration-200">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main>
        {currentView === 'home' && (
          <>
            {/* Page 1: Centered Apple-Style Hero */}
            <Hero />

            {/* Page 2: 2x2 Practice Modules Grid */}
            <DisciplinesGrid
              onSelectModule={handleSelectModule}
              onNavigateToListening={() => handleNavigate('listening')}
              onNavigateToReading={() => handleNavigate('reading')}
            />

            {/* Page 3: The CD Practice Workspace */}
            <SimulationViewer
              activeModule={activeModule}
              onModuleChange={setActiveModule}
            />
          </>
        )}

        {currentView === 'listening' && (
          /* Dedicated Standalone Page for Listening */
          <ListeningPage
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'reading' && (
          /* Dedicated Standalone Page for Reading */
          <ReadingPage
            onBackToHome={() => handleNavigate('home')}
            onLaunchExam={handleLaunchExamFromReading}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
