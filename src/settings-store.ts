import { Store } from '@geajs/core'
import { load, store } from './storage'

export type LearnMode = 'old' | 'new'

class SettingsStore extends Store {
  mode: LearnMode = load<LearnMode>('ehliyetcik.learnMode', 'new')

  get isNew() {
    return this.mode === 'new'
  }

  setMode(m: LearnMode) {
    this.mode = m
    store('ehliyetcik.learnMode', m)
  }
}

export default new SettingsStore()
