import { Store } from '@geajs/core'
import study from './study-store'
import { speak, stopAudio } from './audio'

export const SPEEDS = [3, 5, 8]
const HINT_KEY = 'ehliyetcik.swipeHintSeen'

const hintSeen = () => {
  try {
    return localStorage.getItem(HINT_KEY) === '1'
  } catch {
    return false
  }
}

// Learn player: goes through items in order, reads each answer aloud, auto-advances in a loop.
class LearnStore extends Store {
  playing = false
  auto = true
  seconds = 5
  index = 0
  dx = 0 // card offset in px (drag or slide animation)
  animating = false // true = CSS transition on, false = card follows the finger
  hint = false // one-time swipe onboarding
  timer = 0

  get current() {
    return study.items[this.index]
  }

  start() {
    this.index = 0
    this.playing = true
    this.hint = !hintSeen()
    this.show()
  }

  stop() {
    this.playing = false
    clearTimeout(this.timer)
    stopAudio()
  }

  closeHint() {
    this.hint = false
    try {
      localStorage.setItem(HINT_KEY, '1')
    } catch {}
    this.schedule()
  }

  // Card flies out to one side, next one slides in from the other.
  slide(step: number) {
    clearTimeout(this.timer)
    this.animating = true
    this.dx = step > 0 ? -window.innerWidth : window.innerWidth
    setTimeout(() => {
      const n = study.items.length
      this.index = (this.index + step + n) % n
      this.animating = false
      this.dx = -this.dx / 2
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          this.animating = true
          this.dx = 0
        }),
      )
      this.show()
    }, 200)
  }

  next() {
    this.slide(1)
  }

  prev() {
    this.slide(-1)
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
    speak(parts, this.auto ? this.seconds : undefined)
    this.schedule()
  }
}

export default new LearnStore()
