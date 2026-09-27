import { Store } from '@geajs/core'
import all from './data/questions.json'

export type Mode = 'learn' | 'exam'
export type Kind = 'image' | 'text'

class StudyStore extends Store {
  mode: Mode = 'learn'
  kind: Kind = 'image'
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

  setMode(mode: Mode) {
    this.mode = mode
    this.restart()
  }

  setKind(kind: Kind) {
    this.kind = kind
    this.restart()
  }

  restart() {
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
