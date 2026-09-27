import { Component } from '@geajs/core'
import study from './study-store'
import learn from './learn-store'
import LearnView from './learn-view'
import ExamView from './exam-view'

const tab = (active: boolean) =>
  `flex h-13 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-bold transition-colors ${
    active ? 'bg-sage-200 text-sage-900' : 'text-sand-700'
  }`

// Mobile-first app shell (full screen on phones, framed 390×820 phone on desktop).
export default class App extends Component {
  template() {
    return (
      <div class="flex h-dvh items-center justify-center md:p-8">
        <div class="relative flex h-full w-full flex-col overflow-hidden bg-cream select-none md:h-[820px] md:max-w-[390px] md:rounded-[48px] md:shadow-float">
          <header class="px-3.5 pt-[max(env(safe-area-inset-top),14px)]">
            <div class="relative flex flex-col gap-3 overflow-hidden rounded-[36px] bg-brand px-3.5 pt-3.5 pb-4 pl-4 text-white">
              <div class="absolute -top-[70px] right-10 size-[140px] rounded-full bg-brand-400" />
              <div class="absolute -right-2.5 -bottom-6 size-[60px] rounded-full bg-sage-400" />
              <div class="relative flex items-center gap-3">
                <div class="flex size-[50px] -rotate-6 items-center justify-center rounded-[18px] bg-cream font-heading text-[30px] leading-none font-extrabold text-brand-700 shadow-card">
                  E
                </div>
                <span class="flex-1 font-heading text-[28px] leading-none font-extrabold">Ehliyetçik</span>
                <button
                  class="flex size-11 items-center justify-center rounded-full bg-brand-600 transition-colors hover:bg-brand-700"
                  aria-label="Ses ayarları"
                  click={learn.toggleSoundMenu}
                >
                  <span class={learn.muted ? 'icon icon-mute' : 'icon icon-volume'} />
                </button>
              </div>
              <div class="relative flex items-center gap-2.5">
                <progress class="h-2.5 [--fill:var(--color-cream)] [--track:var(--color-brand-600)]" max={learn.total} value={learn.seen.length} />
                <span class="text-[13px] font-bold whitespace-nowrap">
                  {learn.seen.length} / {learn.total} öğrenildi
                </span>
              </div>
            </div>
          </header>
          {learn.soundMenu && (
            <div class="absolute top-[88px] right-6 z-30 flex w-64 animate-pop items-center gap-3 rounded-full bg-sand-100 p-2 shadow-float">
              <button
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white"
                aria-label={learn.muted ? 'Sesi aç' : 'Sesi kapat'}
                click={learn.toggleMute}
              >
                <span class={learn.muted ? 'icon icon-mute' : 'icon icon-volume'} />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={learn.volume}
                aria-label="Ses seviyesi"
                class="mr-2 w-full accent-brand"
                input={(e: Event) => learn.setVolume(+(e.target as HTMLInputElement).value)}
              />
            </div>
          )}
          <main class="flex min-h-0 flex-1 flex-col">{study.mode === 'learn' ? <LearnView /> : <ExamView />}</main>
          <nav class="px-6 pt-2 pb-[max(env(safe-area-inset-bottom),22px)]">
            <div class="flex gap-1.5 rounded-full bg-sand-100 p-1.5 shadow-soft">
              <button class={tab(study.mode === 'learn')} click={() => study.setMode('learn')}>
                <span class="icon icon-book" />
                Öğren
              </button>
              <button class={tab(study.mode === 'exam')} click={() => study.setMode('exam')}>
                <span class="icon icon-exam" />
                Sınav
              </button>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
