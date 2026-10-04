import { Store } from '@geajs/core'
import { speak, stopAudio } from './audio'
import { speech, type Clip } from './speech-text'
import type { Question } from './study-store'
import { load, store } from './storage'

export const THINK = 4

// "Yeni" Öğren mode: SORU (read) -> DÜŞÜN (countdown, answer hidden) -> CEVAP (line by line) -> hint.
class CoachStore extends Store {
  stage: 'q' | 'think' | 'a' = 'q'
  count = THINK
  line = -1 // answer line being read
  hintOn = false
  hard: number[] = load('ehliyetcik.hard', [])
  tok = 0
  jump = false // "Cevabı söyle" pressed

  isHard(id: number) {
    return this.hard.includes(id)
  }

  toggleHard(id: number) {
    this.hard = this.isHard(id) ? this.hard.filter((i) => i !== id) : [...this.hard, id]
    store('ehliyetcik.hard', this.hard)
  }

  cancel() {
    this.tok++
  }

  skip() {
    if (this.stage === 'a') return
    this.jump = true
    stopAudio()
  }

  // Resolves true when the whole card was played, false when cut off by another card/stop.
  async play(q: Question, muted: () => boolean): Promise<boolean> {
    const my = ++this.tok
    const live = () => my === this.tok
    const sleep = (ms: number) => new Promise((ok) => setTimeout(ok, ms))
    const say = async (c: Clip | undefined) => {
      if (!c || !live()) return
      const ok = muted() ? false : await speak([{ src: c.file.startsWith('/') ? c.file : `/audio/${c.file}`, text: c.text }])
      if (!ok && live() && !this.jump) await sleep((c.text.length / 14) * 1000) // muted: ~14 chars/sec
    }
    const image = q.type === 'image'
    const s = image ? { q: undefined, answer: [{ file: `${q.id}.mp3`, text: q.name ?? '' }], hint: undefined } : speech(q)
    this.stage = 'q'
    this.line = -1
    this.hintOn = false
    this.jump = false
    this.count = THINK
    await say(s.q)
    if (!live()) return false
    this.stage = 'think'
    for (; this.count > 0 && !this.jump && live(); this.count--) await sleep(1000)
    if (!live()) return false
    this.jump = false
    this.stage = 'a'
    for (let i = 0; i < s.answer.length && live(); i++) {
      this.line = i
      await say(s.answer[i])
      if (live() && i < s.answer.length - 1) await sleep(500)
    }
    this.hintOn = true
    await say(s.hint)
    return live()
  }
}

export default new CoachStore()
