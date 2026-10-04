import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'

const ID = 1

export const canRemind = Capacitor.isNativePlatform()

// Schedules one repeating daily notification on the device (no network). Returns false if permission is denied.
export async function scheduleReminder(time: string): Promise<boolean> {
  if (!canRemind) return false
  const perm = await LocalNotifications.requestPermissions()
  if (perm.display !== 'granted') return false
  const [hour, minute] = time.split(':').map(Number)
  await LocalNotifications.cancel({ notifications: [{ id: ID }] })
  await LocalNotifications.schedule({
    notifications: [{ id: ID, title: 'Ehliyetçik', body: 'Bugün birkaç kart çalışalım mı?', schedule: { on: { hour, minute }, allowWhileIdle: true } }],
  })
  return true
}

export async function cancelReminder() {
  if (canRemind) await LocalNotifications.cancel({ notifications: [{ id: ID }] })
}
