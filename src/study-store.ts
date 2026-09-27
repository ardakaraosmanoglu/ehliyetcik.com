import { Store } from '@geajs/core'
import all from './data/questions.json'
import learn from './learn-store'

export type Mode = 'learn' | 'exam'
export type Kind = 'image' | 'text'

class StudyStore extends Store {
  mode: Mode = 'learn'
  kind: Kind = 'image'
  started = false // exam in progress
  index = 0
  revealed = false
  known = 0
  missed = 0

  get items() {
    return all.filter((q) => q.type === this.kind)
  }

  get current() {
    return this.items[this.index]
  }

  get done() {
    return this.index >= this.items.length
  }

  count(kind: Kind) {
    return all.filter((q) => q.type === kind).length
  }

  setMode(mode: Mode) {
    this.mode = mode
    this.started = false
    this.restart()
  }

  setKind(kind: Kind) {
    this.kind = kind
  }

  start() {
    this.restart()
    this.started = true
  }

  restart() {
    learn.stop()
    this.index = this.known = this.missed = 0
    this.revealed = false
  }

  reveal() {
    this.revealed = true
  }

  answer(knew: boolean) {
    knew ? this.known++ : this.missed++
    this.index++
    this.revealed = false
  }
}

export default new StudyStore()
