import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cancelAllNotifications, ensureNotificationPermissions, schedulePomodoroCycle, scheduleUsageBreakReminder } from './notificationsService';

export type NotificationsSettings = {
  allEnabled: boolean;
  pomodoroEnabled: boolean;
  usageEnabled: boolean;
};

type Ctx = NotificationsSettings & {
  setAllEnabled: (v: boolean) => Promise<void>;
  setPomodoroEnabled: (v: boolean) => Promise<void>;
  setUsageEnabled: (v: boolean) => Promise<void>;
};

const DEFAULT: NotificationsSettings = {
  allEnabled: true,
  pomodoroEnabled: false,
  usageEnabled: true,
};

const KEY = 'bloomy.notifications.settings';

const NotificationsSettingsContext = createContext<Ctx | undefined>(undefined);

export function NotificationsSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<NotificationsSettings>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setSettings(JSON.parse(raw));
      } catch {}
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(KEY, JSON.stringify(settings)).catch(() => {});
  }, [hydrated, settings]);

  const setAllEnabled = async (v: boolean) => {
    if (!v) {
      await cancelAllNotifications();
      setSettings({ allEnabled: false, pomodoroEnabled: false, usageEnabled: false });
      return;
    }
    const granted = await ensureNotificationPermissions();
    if (!granted) return;
    // Ao ligar o master, não liga automaticamente os outros; usuário escolhe.
    setSettings(s => ({ ...s, allEnabled: true }));
  };

  const setPomodoroEnabled = async (v: boolean) => {
    if (!settings.allEnabled && v) {
      const granted = await ensureNotificationPermissions();
      if (!granted) return;
      setSettings(s => ({ ...s, allEnabled: true }));
    }
    if (!v) {
      // Para simplificar, cancelamos todas — emissões pomodoro são pontuais.
      await cancelAllNotifications();
      setSettings(s => ({ ...s, pomodoroEnabled: false }));
      return;
    }

    // Agendar ciclo pomodoro
    await schedulePomodoroCycle({ focusMinutes: 25, restMinutes: 5 });


    setSettings(s => ({ ...s, pomodoroEnabled: true }));
  };

  const setUsageEnabled = async (v: boolean) => {
    if (!settings.allEnabled && v) {
      const granted = await ensureNotificationPermissions();
      if (!granted) return;
      setSettings(s => ({ ...s, allEnabled: true }));
    }
    if (!v) {
      await cancelAllNotifications();
      setSettings(s => ({ ...s, usageEnabled: false }));
      return;
    }


    // Agendar lembrete de uso a cada 2 horas
    await scheduleUsageBreakReminder(2);


    setSettings(s => ({ ...s, usageEnabled: true }));
  };

  const value = useMemo<Ctx>(() => ({
    ...settings,
    setAllEnabled,
    setPomodoroEnabled,
    setUsageEnabled,
  }), [settings]);

  return (
    <NotificationsSettingsContext.Provider value={value}>
      {children}
    </NotificationsSettingsContext.Provider>
  );
}

export function useNotificationsSettings() {
  const ctx = useContext(NotificationsSettingsContext);
  if (!ctx) throw new Error('useNotificationsSettings must be used within NotificationsSettingsProvider');
  return ctx;
}
