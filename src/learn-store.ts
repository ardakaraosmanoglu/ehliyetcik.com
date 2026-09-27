import { Store } from '@geajs/core'
import study from './study-store'
import all from './data/questions.json'
import { setVolume, speak, stopAudio } from './audio'
import { load, store } from './storage'

export const SPEEDS = [3, 5, 8]

// Learn player: goes through items in order, reads each aloud, optional auto-advance in a loop.
class LearnStore extends Store {
  playing = false
  auto = false
  seconds = 5
  index = 0
  hint = false // one-time swipe onboarding
  muted = load('ehliyetcik.muted', false)
  volume = load('ehliyetcik.volume', 1)
  soundMenu = false
  seen: number[] = load('ehliyetcik.seen', [])
  timer = 0

  get current() {
    return study.items[this.index]
  }

  get total() {
    return all.length
  }

  // One segment per card for the progress dots: done / current / upcoming.
  get dots() {
    return study.items.map((q, i) => ({
      id: q.id,
      cls: `h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < this.index ? 'bg-brand-300' : i === this.index ? 'bg-brand' : 'bg-sand-100'}`,
    }))
  }

  start() {
    this.index = 0
    this.playing = true
    this.hint = !load('ehliyetcik.swipeHintSeen', false)
    this.show()
  }

  stop() {
    this.playing = false
    this.auto = false
    clearTimeout(this.timer)
    stopAudio()
  }

  closeHint() {
    this.hint = false
    store('ehliyetcik.swipeHintSeen', true)
    this.show()
  }

  // Card flies out to one side, next one slides in from the other (Web Animations API — Gea doesn't bind reactive `style`).
  async slide(step: number) {
    clearTimeout(this.timer)
    const el = document.querySelector<HTMLElement>('[data-card]')
    // Hidden documents (some embedded previews) freeze animations, which would leave the card off-screen.
    const anim = !document.hidden
    const w = step > 0 ? -440 : 440
    if (el && anim)
      await el.animate([{ transform: el.style.transform || 'none' }, { transform: `translateX(${w}px) rotate(${w / 22}deg)`, opacity: 0 }], {
        duration: 220,
        easing: 'ease',
      }).finished
    const n = study.items.length
    this.index = (this.index + step + n) % n
    this.show()
    if (!el) return
    el.style.transform = ''
    if (anim) el.animate([{ transform: `translateX(${-w / 6}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 220, easing: 'ease' })
  }

  next() {
    this.slide(1)
  }

  prev() {
    this.slide(-1)
  }

  toggleSoundMenu() {
    this.soundMenu = !this.soundMenu
  }

  toggleMute() {
    this.muted = !this.muted
    store('ehliyetcik.muted', this.muted)
    if (this.muted) stopAudio()
  }

  setVolume(v: number) {
    this.volume = v
    setVolume(v)
    store('ehliyetcik.volume', v)
    if (this.muted && v > 0) this.toggleMute()
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
    if (!this.seen.includes(q.id)) {
      this.seen = [...this.seen, q.id]
      store('ehliyetcik.seen', this.seen)
    }
    if (this.hint) return // wait for onboarding to close
    const parts =
      q.type === 'image'
        ? [{ src: `/audio/${q.id}.mp3`, text: q.name ?? '' }]
        : [{ src: `/audio/${q.id}-q.mp3`, text: q.q }, { src: `/audio/${q.id}.mp3`, text: q.a }] // question first, then answer
    if (!this.muted) speak(parts, this.auto ? this.seconds : undefined)
    this.schedule()
  }
}

const learn = new LearnStore()
setVolume(learn.volume)
export default learn
