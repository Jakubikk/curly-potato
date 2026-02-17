import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProgress {
  xp: number;
  streak: number;
  lastCompletedDate: string | null;
  completedLessons: string[];
}

interface AppSettings {
  fontSize: 'normal' | 'large' | 'extraLarge';
  highContrast: boolean;
  accessibilitySetupDone: boolean;
}

interface AppContextType {
  progress: UserProgress;
  settings: AppSettings;
  updateProgress: (newProgress: Partial<UserProgress>) => Promise<void>;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  loading: boolean;
}

const defaultProgress: UserProgress = {
  xp: 0,
  streak: 0,
  lastCompletedDate: null,
  completedLessons: [],
};

const defaultSettings: AppSettings = {
  fontSize: 'large',
  highContrast: false,
  accessibilitySetupDone: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      const savedSettings = await AsyncStorage.getItem('appSettings');

      if (savedProgress) setProgress(JSON.parse(savedProgress));
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      // Update streak if needed
      if (savedProgress) {
        checkStreak(JSON.parse(savedProgress));
      }
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setLoading(false);
    }
  };

  const checkStreak = (currentProgress: UserProgress) => {
    if (!currentProgress.lastCompletedDate) return;

    const lastDate = new Date(currentProgress.lastCompletedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);

    const diffInDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffInDays > 1) {
      // Streak broken
      updateProgress({ streak: 0 });
    }
  };

  const updateProgress = async (newProgress: Partial<UserProgress>) => {
    const updated = { ...progress, ...newProgress };
    setProgress(updated);
    await AsyncStorage.setItem('userProgress', JSON.stringify(updated));
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await AsyncStorage.setItem('appSettings', JSON.stringify(updated));
  };

  const addXp = async (amount: number) => {
    await updateProgress({ xp: progress.xp + amount });
  };

  const completeLesson = async (lessonId: string) => {
    const today = new Date().toISOString();
    const newCompletedLessons = progress.completedLessons.includes(lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, lessonId];

    let newStreak = progress.streak;
    const lastDate = progress.lastCompletedDate ? new Date(progress.lastCompletedDate) : null;
    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);

    if (!lastDate || (todayDate.getTime() - lastDate.setHours(0,0,0,0)) === 1000 * 3600 * 24) {
        newStreak += 1;
    } else if (todayDate.getTime() === (lastDate?.setHours(0,0,0,0))) {
        // already completed today, streak remains same
    } else {
        newStreak = 1;
    }

    await updateProgress({
      completedLessons: newCompletedLessons,
      lastCompletedDate: today,
      streak: newStreak
    });
  };

  return (
    <AppContext.Provider value={{ progress, settings, updateProgress, updateSettings, addXp, completeLesson, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
