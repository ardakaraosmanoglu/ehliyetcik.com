import { Store } from '@geajs/core'
import all from './data/questions.json'
import learn from './learn-store'

export type Mode = 'learn' | 'exam'
export type Kind = 'image' | 'text'
export type Question = (typeof all)[number] & { name?: string; image?: string; images?: string[] }

// App mode + exam state. Learn player state lives in learn-store.
class StudyStore extends Store {
  mode: Mode = 'learn'
  kind: Kind = 'image'
  started = false // exam in progress
  pool: Question[] | null = null // exam subset (retry wrong answers)
  index = 0
  revealed = false
  results: { ok: boolean; q: Question }[] = []
  lastScore = ''

  get items(): Question[] {
    return this.pool ?? this.deck(this.kind)
  }

  get current() {
    return this.items[this.index]
  }

  get done() {
    return this.index >= this.items.length
  }

  get correct() {
    return this.results.filter((r) => r.ok).length
  }

  get missed() {
    return this.results.filter((r) => !r.ok).map((r) => r.q)
  }

  get resultTitle() {
    const ratio = this.correct / (this.results.length || 1)
    return ratio === 1 ? 'Kusursuz! Hepsini bildin.' : ratio >= 0.6 ? 'Güzel gidiyor.' : 'Biraz daha çalışalım.'
  }

  deck(kind: Kind): Question[] {
    return all.filter((q) => q.type === kind)
  }

  setMode(mode: Mode) {
    learn.stop()
    this.mode = mode
    this.started = false
  }

  setKind(kind: Kind) {
    this.kind = kind
  }

  start(pool: Question[] | null = null) {
    this.pool = pool
    this.index = 0
    this.revealed = false
    document.querySelectorAll('[data-scroll]').forEach((e) => (e.scrollTop = 0))
    this.results = []
    this.started = true
  }

  retryMissed() {
    this.start(this.missed)
  }

  restart() {
    this.start()
  }

  quit() {
    this.started = false
  }

  reveal() {
    this.revealed = true
  }

  answer(ok: boolean) {
    this.results = [...this.results, { ok, q: this.current }]
    this.index++
    this.revealed = false
    document.querySelectorAll('[data-scroll]').forEach((e) => (e.scrollTop = 0))
    if (this.done) this.lastScore = `${this.correct} / ${this.results.length}`
  }
}

export default new StudyStore()
