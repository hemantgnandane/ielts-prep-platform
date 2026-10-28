import React, { createContext, useContext, useEffect, useState } from 'react';
import { TestTrack } from '../types';

interface TrackContextType {
  track: TestTrack;
  setTrack: (track: TestTrack) => void;
  toggleTrack: () => void;
  trackLabel: string;
}

const TRACK_STORAGE_KEY = 'ielts_prep_track_selection';

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [track, setTrackState] = useState<TestTrack>(() => {
    if (typeof window === 'undefined') return 'academic';
    const saved = localStorage.getItem(TRACK_STORAGE_KEY) as TestTrack | null;
    return saved === 'general' ? 'general' : 'academic';
  });

  useEffect(() => {
    localStorage.setItem(TRACK_STORAGE_KEY, track);
  }, [track]);

  const toggleTrack = () => {
    setTrackState(prev => (prev === 'academic' ? 'general' : 'academic'));
  };

  const setTrack = (newTrack: TestTrack) => {
    setTrackState(newTrack);
  };

  const trackLabel = track === 'academic' ? 'IELTS Academic' : 'IELTS General Training';

  return (
    <TrackContext.Provider value={{ track, setTrack, toggleTrack, trackLabel }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = (): TrackContextType => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return context;
};

