import { Store } from '@geajs/core'
import study from './study-store'
import { speak, stopAudio } from './audio'

export const SPEEDS = [3, 5, 8]

// Learn player: goes through items in order, reads each answer aloud, auto-advances in a loop.
class LearnStore extends Store {
  playing = false
  auto = true
  seconds = 5
  index = 0
  dx = 0 // swipe drag offset in px
  timer = 0

  get current() {
    return study.items[this.index]
  }

  start() {
    this.index = 0
    this.playing = true
    this.show()
  }

  stop() {
    this.playing = false
    clearTimeout(this.timer)
    stopAudio()
  }

  go(step: number) {
    const n = study.items.length
    this.index = (this.index + step + n) % n
    this.show()
  }

  next() {
    this.go(1)
  }

  prev() {
    this.go(-1)
  }

  toggleAuto() {
    this.auto = !this.auto
    this.show()
  }

  setSeconds(s: number) {
    this.seconds = s
    this.show()
  }

  show() {
    this.dx = 0
    clearTimeout(this.timer)
    const q = this.current
    const parts = [{ src: `/audio/${q.id}.mp3`, text: q.a }]
    if (q.type === 'text') parts.unshift({ src: `/audio/${q.id}-q.mp3`, text: q.q }) // question first, then answer
    speak(parts, this.auto ? this.seconds : undefined)
    if (this.auto) this.timer = window.setTimeout(() => this.next(), this.seconds * 1000)
  }
}


export default new LearnStore()
