import { Store } from '@geajs/core'
import study from './study-store'
import { speak, stopAudio } from './audio'

export const SPEEDS = [3, 5, 8]
const HINT_KEY = 'ehliyetcik.swipeHintSeen'

const MUTE_KEY = 'ehliyetcik.muted'

const saved = (key: string) => {
  try {
    return localStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

const save = (key: string, on: boolean) => {
  try {
    localStorage.setItem(key, on ? '1' : '0')
  } catch {}
}

// Learn player: goes through items in order, reads each answer aloud, auto-advances in a loop.
class LearnStore extends Store {
  playing = false
  auto = true
  seconds = 5
  index = 0
  hint = false // one-time swipe onboarding
  muted = saved(MUTE_KEY)
  timer = 0

  get current() {
    return study.items[this.index]
  }

  start() {
    this.index = 0
    this.playing = true
    this.hint = !saved(HINT_KEY)
    this.show()
  }

  stop() {
    this.playing = false
    clearTimeout(this.timer)
    stopAudio()
  }

  closeHint() {
    this.hint = false
    save(HINT_KEY, true)
    this.schedule()
  }

  // Card flies out to one side, next one slides in from the other (Web Animations API — Gea doesn't bind reactive `style`).
  async slide(step: number) {
    clearTimeout(this.timer)
    const el = document.querySelector<HTMLElement>('[data-card]')
    const w = (step > 0 ? -1 : 1) * window.innerWidth
    if (el)
      await el.animate([{ transform: el.style.transform || 'none' }, { transform: `translateX(${w}px) rotate(${w / 20}deg)`, opacity: 0 }], {
        duration: 220,
        easing: 'cubic-bezier(.4,0,1,1)',
      }).finished
    const n = study.items.length
    this.index = (this.index + step + n) % n
    this.show()
    if (!el) return
    el.style.transform = ''
    el.animate([{ transform: `translateX(${-w / 3}px) scale(.9)`, opacity: 0 }, { transform: 'none', opacity: 1 }], {
      duration: 320,
      easing: 'cubic-bezier(.2,.9,.3,1.2)',
    })
  }

  next() {
    this.slide(1)
  }

  prev() {
    this.slide(-1)
  }

  toggleMute() {
    this.muted = !this.muted
    save(MUTE_KEY, this.muted)
    if (this.muted) stopAudio()
  }

  // Changing auto/speed only resets the timer; it doesn't replay the current card.
  toggleAuto() {
    this.auto = !this.auto
    this.schedule()
  }

  setSeconds(s: number) {
    this.seconds = s
    this.schedule()
  }

  schedule() {
    clearTimeout(this.timer)
    if (this.auto && !this.hint) this.timer = window.setTimeout(() => this.next(), this.seconds * 1000)
  }

  show() {
    const q = this.current
    const parts = [{ src: `/audio/${q.id}.mp3`, text: q.a }]
    if (q.type === 'text') parts.unshift({ src: `/audio/${q.id}-q.mp3`, text: q.q }) // question first, then answer
    if (!this.muted) speak(parts, this.auto ? this.seconds : undefined)
    this.schedule()
  }
}

export default new LearnStore()
