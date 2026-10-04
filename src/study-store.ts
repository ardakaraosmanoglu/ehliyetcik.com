import { Store } from '@geajs/core'
import all from './data/questions.json'
import learn from './learn-store'
import favs from './favorites-store'

export type Mode = 'learn' | 'exam'
export type Kind = 'image' | 'text'
export type Question = (typeof all)[number] & { name?: string; image?: string; images?: string[]; top?: boolean | number; hint?: string }

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
    return this.pool ?? this.deck(this.kind, false)
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

  // Questions of a kind, narrowed to starred / most-asked ones when the filters are on.
  deck(kind: Kind, onlyFavs = favs.only, onlyTop = favs.onlyTop): Question[] {
    const list = (all as unknown as Question[]).filter((q) => q.type === kind && (!onlyFavs || favs.has(q.id)) && (!onlyTop || q.top))
    return onlyTop ? list.sort((a, b) => Number(a.top) - Number(b.top)) : list
  }

  get starred() {
    return this.deck(this.kind, true, false).length
  }

  get topCount() {
    return this.deck(this.kind, false, true).length
  }

  get empty() {
    return (favs.only || favs.onlyTop) && this.deck(this.kind).length === 0
  }

  // Snapshot so starring/unstarring mid-session does not reshuffle the deck.
  get favPool() {
    return favs.only || favs.onlyTop ? this.deck(this.kind) : null
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
    this.pool = pool ?? this.favPool
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
