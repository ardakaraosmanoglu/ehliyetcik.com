import { Component } from '@geajs/core'
import StartScreen from './start-screen'
import study from './study-store'
import learn, { SPEEDS } from './learn-store'

const chip = (active: boolean) =>
  `rounded-full px-3 py-1 text-sm font-medium ${active ? 'bg-amber-400 text-black' : 'bg-muted text-muted-foreground'}`

// Swipe like Tinder: card follows the finger, release past 80px = next/prev.
let startX = 0
const down = (e: PointerEvent) => {
  startX = e.clientX
  learn.animating = false
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
const move = (e: PointerEvent) => {
  if (e.buttons || e.pointerType === 'touch') learn.dx = e.clientX - startX
}
const up = () => {
  if (learn.dx < -80) learn.next()
  else if (learn.dx > 80) learn.prev()
  else {
    learn.animating = true
    learn.dx = 0
  }
}

export default class LearnView extends Component {
  template() {
    if (!learn.playing)
      return <StartScreen title="Öğren 📖" hint="Levhalar sırayla gelir, adı sesli okunur." start={learn.start} />

    const q = learn.current
    return (
      <div class="relative flex flex-1 flex-col gap-4 overflow-x-clip">
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <button class="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 font-semibold text-foreground transition-transform active:scale-95" click={learn.stop}>
            ← Geri
          </button>
          <span class="rounded-full bg-amber-100 px-3 py-1.5 font-bold text-amber-900">{learn.index + 1} / {study.items.length}</span>
        </div>
        <div
          class={`flex flex-1 touch-pan-y select-none flex-col justify-center gap-5 rounded-3xl border bg-card p-6 shadow-xl shadow-black/5 ${learn.animating ? 'transition-transform duration-200 ease-out' : ''}`}
          style={`transform: translateX(${learn.dx}px) rotate(${learn.dx / 25}deg)`}
          pointerdown={down}
          pointermove={move}
          pointerup={up}
          pointercancel={up}
        >
          <img src={q.image || ''} alt="" draggable={false} class={q.image ? 'mx-auto size-56 pointer-events-none' : 'hidden'} />
          <p class={q.image ? 'hidden' : 'text-center text-lg text-muted-foreground'}>{q.q}</p>
          <p class="text-center text-2xl font-bold">{q.a}</p>
        </div>
        <div class="flex items-center justify-between gap-2">
          <button class={chip(learn.auto)} click={learn.toggleAuto}>{learn.auto ? '⏸ Otomatik' : '▶ Otomatik'}</button>
          <div class="flex gap-1">
            <button class={chip(learn.seconds === SPEEDS[0])} click={() => learn.setSeconds(SPEEDS[0])}>{SPEEDS[0]}sn</button>
            <button class={chip(learn.seconds === SPEEDS[1])} click={() => learn.setSeconds(SPEEDS[1])}>{SPEEDS[1]}sn</button>
            <button class={chip(learn.seconds === SPEEDS[2])} click={() => learn.setSeconds(SPEEDS[2])}>{SPEEDS[2]}sn</button>
          </div>
        </div>
        {learn.hint && (
          <div class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 rounded-3xl bg-black/70 p-8 text-center text-white backdrop-blur-sm">
            <span class="swipe-hint text-6xl">👆</span>
            <div class="grid gap-2">
              <p class="text-xl font-bold">Kaydırarak geç</p>
              <p class="text-white/80">⬅️ Sola kaydır: sonraki levha</p>
              <p class="text-white/80">➡️ Sağa kaydır: önceki levha</p>
            </div>
            <button class="h-12 w-full rounded-2xl bg-white text-lg font-bold text-black active:scale-95" click={learn.closeHint}>
              Anladım 👍
            </button>
          </div>
        )}
      </div>
    )
  }
}
