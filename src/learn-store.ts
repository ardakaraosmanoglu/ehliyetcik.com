import { Store } from '@geajs/core'
import study from './study-store'

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
    speak(this.current.id, this.current.a)
    if (this.auto) this.timer = window.setTimeout(() => this.next(), this.seconds * 1000)
  }
}

// Pre-generated Piper audio (`make audio`); falls back to the browser voice if the file is missing.
const audio = new Audio()

function stopAudio() {
  audio.pause()
  speechSynthesis.cancel()
}

function speak(id: number, text: string) {
  stopAudio()
  audio.src = `/audio/${id}.mp3`
  audio.onerror = () => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'tr-TR'
    speechSynthesis.speak(u)
  }
  audio.play().catch(() => {})
}

export default new LearnStore()
