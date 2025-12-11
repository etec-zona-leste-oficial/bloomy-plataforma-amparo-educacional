import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export type ScheduleId = string;

export type PomodoroConfig = {
  focusMinutes: number; // ex: 25
  restMinutes: number;  // ex: 5
};

// Define como as notificações se comportam quando entregues com o app em foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }) as Notifications.NotificationBehavior,
});

async function requestPermissionsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: askedStatus } = await Notifications.requestPermissionsAsync();
    return askedStatus === 'granted';
  }
  return true;
}

export async function ensureNotificationPermissions(): Promise<boolean> {
  const ok = await requestPermissionsAsync();
  if (ok && Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  return ok;
}

// 1) Lembretes periódicos (ex: a cada X horas)
export async function schedulePeriodicReminder(hoursInterval = 6): Promise<ScheduleId> {
  const seconds = Math.max(1, Math.round(hoursInterval * 3600));
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bloomy',
      body: randomReminderBody(),
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds, repeats: true },
  });
  return id;
}

export function randomReminderBody() {
  const msgs = [
    'Não esqueça das suas atividades!',
    'A Bloomy está esperando você!',
    'Hora de continuar suas metas!',
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export async function cancelNotification(id: ScheduleId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {}
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// 2) Pomodoro: agenda alternância entre foco e descanso
export async function schedulePomodoroCycle(config: PomodoroConfig): Promise<{ focusId: ScheduleId; restId: ScheduleId; }> {
  const focusSeconds = Math.max(60, Math.round(config.focusMinutes * 60));
  const restSeconds = Math.max(60, Math.round(config.restMinutes * 60));

  const focusId = await Notifications.scheduleNotificationAsync({
    content: { title: 'Bloomy', body: 'Comece seu foco agora!' },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 1, repeats: false },
  });

  const restId = await Notifications.scheduleNotificationAsync({
    content: { title: 'Bloomy', body: 'Hora de descansar!' },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: focusSeconds, repeats: false },
  });

  // Poderíamos encadear múltiplos ciclos programando próximos schedulings após cada evento
  // Para simplicidade: um ciclo por vez; a UI pode reagendar conforme necessário.
  return { focusId, restId };
}

// 3) Lembrete de tempo de uso > 2h
export async function scheduleUsageBreakReminder(hours = 2): Promise<ScheduleId> {
  const seconds = Math.max(60, Math.round(hours * 3600));
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bloomy',
      body: randomUsageBody(),
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds, repeats: true },
  });
  return id;
}

function randomUsageBody() {
  const msgs = [
    'Que tal uma pausa?',
    'Você já está há muito tempo no app, que tal uma pausa?',
    'Respire fundo e descanse um pouco :)',
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}
