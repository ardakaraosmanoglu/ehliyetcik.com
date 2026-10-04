import { Component } from '@geajs/core'
import StartScreen from './start-screen'
import study from './study-store'
import learn from './learn-store'
import StarButton from './star-button'
import settings from './settings-store'
import CoachAnswer from './coach-answer'
import CoachControls from './coach-controls'


// Swipe like Tinder: card follows the finger, release past 70px = next/prev, otherwise springs back.
// touch-action: pan-y leaves vertical drags to the browser (answer scrolls, pointercancel fires).
let startX = 0
let dx = 0
const card = (e: PointerEvent) => e.currentTarget as HTMLElement
const down = (e: PointerEvent) => {
  startX = e.clientX
  dx = 0
  card(e).setPointerCapture(e.pointerId)
}
const move = (e: PointerEvent) => {
  if (!card(e).hasPointerCapture(e.pointerId)) return
  dx = e.clientX - startX
  card(e).style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`
}
const up = (e: PointerEvent) => {
  const el = card(e)
  if (dx < -70) learn.next()
  else if (dx > 70) learn.prev()
  else if (dx) {
    el.animate([{ transform: el.style.transform }, { transform: 'none' }], { duration: 220, easing: 'ease' })
    el.style.transform = ''
  }
  dx = 0
}

export default class LearnView extends Component {
  template() {
    if (!learn.playing) return <StartScreen start={learn.start} />

    const q = learn.current
    const visual = q.type === 'image'
    return (
      <div class="flex min-h-0 flex-1 flex-col gap-3.5 px-6 py-3">
        <div class="flex items-center justify-between">
          <button class="flex h-10 items-center gap-1.5 rounded-full bg-sand-100 pr-4 pl-3 text-[15px] font-semibold hover:bg-brand-100" click={learn.stop}>
            <span class="icon icon-arrow-left size-[18px]" />
            Geri
          </button>
          <div class="flex items-center gap-2">
            <span class="tag bg-brand-100 font-bold text-brand-800">
              {learn.index + 1} / {study.items.length}
            </span>
            <span class="text-[13px] font-semibold text-sand-700">{learn.remaining}</span>
            <StarButton id={q.id} />
            <button
              class={`flex size-10 items-center justify-center rounded-full transition-colors ${learn.auto ? 'bg-sage-700 text-white' : 'bg-sand-100 hover:bg-brand-100'}`}
              aria-label={learn.auto ? 'Duraklat' : 'Otomatik oynat'}
              click={learn.toggleAuto}
            >
              <span class={`icon size-4 ${learn.auto ? 'icon-pause' : 'icon-play'}`} />
            </button>
          </div>
        </div>
        <div class="flex gap-[5px]">
          {learn.dots.map((dot) => (
            <div key={dot.id} class={dot.cls} />
          ))}
        </div>
        <div class="relative min-h-0 flex-1">
          <div class="absolute inset-x-3.5 top-3.5 -bottom-2 rounded-[40px] bg-surface" />
          <div
            data-card
            class="absolute inset-0 flex cursor-grab touch-pan-y flex-col gap-3.5 rounded-[40px] bg-sand-100 p-7 shadow-card will-change-transform"
            pointerdown={down}
            pointermove={move}
            pointerup={up}
            pointercancel={up}
          >
            <div class={visual ? 'flex min-h-0 flex-1 items-center justify-center' : 'hidden'}>
              <div class={q.images ? 'flex w-full flex-wrap items-center justify-center gap-2 rounded-[32px] bg-brand-200 p-3' : 'flex size-[230px] max-h-full max-w-full items-center justify-center rounded-full bg-brand-200'}>
                {(q.images || [q.image || '']).map((src) => (
                  <img src={src} alt="" draggable={false} class={`pointer-events-none object-contain ${q.images ? 'size-[120px]' : 'size-[170px]'} drop-shadow-[0_4px_8px_rgba(46,43,37,.18)]`} />
                ))}
              </div>
            </div>
            <span class={visual ? 'hidden' : 'tag self-start bg-sage-100 text-sage-800'}>Kural {learn.index + 1}</span>
            <h2 class={`font-heading font-extrabold ${visual ? 'text-[29px] leading-[1.05]' : `mt-2 leading-[1.1] text-pretty ${q.q.length > 110 ? 'text-2xl' : 'text-[29px]'}`}`}>{visual ? (settings.isNew ? 'Bu nedir?' : q.name) : q.q}</h2>
            <div class={visual ? 'hidden' : 'flex-1'} />
            {settings.isNew ? <CoachAnswer q={q} /> : <p data-scroll class={visual ? 'text-base leading-normal text-pretty text-sand-800' : 'min-h-24 touch-pan-y overflow-y-auto overscroll-contain rounded-[28px] bg-sage-100 p-5 text-[17px] leading-normal text-pretty text-sage-900'}>{q.a}</p>}

          </div>
          {learn.hint && (
            <div class="absolute inset-0 z-20 flex animate-pop flex-col items-start justify-end gap-3.5 rounded-[40px] bg-sand-900/80 px-7 py-8 text-white backdrop-blur-md">
              <div class="mb-2.5 flex size-[84px] items-center justify-center rounded-full bg-brand">
                <span class="icon icon-hand size-10 animate-nudge" />
              </div>
              <h3 class="font-heading text-[32px] leading-none font-extrabold">Kaydırarak geç</h3>
              <div class="flex flex-col gap-2 text-base">
                <div class="flex items-center gap-2.5">
                  <span class="icon icon-arrow-left size-[18px]" />
                  Sola kaydır: sonraki kart
                </div>
                <div class="flex items-center gap-2.5">
                  <span class="icon icon-arrow-right size-[18px]" />
                  Sağa kaydır: önceki kart
                </div>
              </div>
              <button class="mt-3 h-[52px] rounded-full bg-cream px-8 text-base font-bold text-ink hover:bg-brand-200" click={learn.closeHint}>
                Anladım
              </button>
            </div>
          )}
        </div>
        {settings.isNew && <CoachControls id={q.id} />}
      </div>
    )
  }
}
