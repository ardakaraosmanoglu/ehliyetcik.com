import { Store } from '@geajs/core'
import { load, store } from './storage'
import { scheduleReminder, cancelReminder } from './reminder'

export type LearnMode = 'old' | 'new'

class SettingsStore extends Store {
  mode: LearnMode = load<LearnMode>('ehliyetcik.learnMode', 'new')

  reminder = load('ehliyetcik.reminder', { on: false, time: '19:00' })
  denied = false

  get isNew() {
    return this.mode === 'new'
  }

  setMode(m: LearnMode) {
    this.mode = m
    store('ehliyetcik.learnMode', m)
  }

  async setReminder(on: boolean, time = this.reminder.time) {
    this.denied = false
    if (on && !(await scheduleReminder(time))) {
      on = false
      this.denied = true
    }
    if (!on) await cancelReminder()
    this.reminder = { on, time }
    store('ehliyetcik.reminder', this.reminder)
  }
}

export default new SettingsStore()
