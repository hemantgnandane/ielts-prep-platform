import React from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { DisciplinesGrid } from './components/disciplines/DisciplinesGrid';
import { SimulationViewer } from './components/simulation/SimulationViewer';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0c] text-[#1d1d1f] dark:text-[#ededed] font-sans antialiased transition-colors duration-200">
      <Header />
      <main>
        {/* Page 1: Centered Apple-Style Hero */}
        <Hero />

        {/* Page 2: 2x2 Practice Modules Grid */}
        <DisciplinesGrid />

        {/* Page 3: The CD-IELTS Practice Workspace */}
        <SimulationViewer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
