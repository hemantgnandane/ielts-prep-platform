import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { TrackProvider } from './context/TrackContext';
import { SimulationProvider } from './context/SimulationContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <TrackProvider>
        <SimulationProvider>
          <App />
        </SimulationProvider>
      </TrackProvider>
    </ThemeProvider>
  </React.StrictMode>
);

