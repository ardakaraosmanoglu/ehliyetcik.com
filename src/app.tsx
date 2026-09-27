import { Component } from '@geajs/core'
import study from './study-store'
import learn from './learn-store'
import LearnView from './learn-view'
import ExamView from './exam-view'

const tab = (active: boolean) =>
  `flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-xs font-semibold transition-all active:scale-95 ${
    active ? 'bg-amber-100 text-amber-900' : 'text-muted-foreground'
  }`

// Mobile-first: app shell with sticky header and bottom tab bar; on desktop it stays a centered phone-width column.
export default class App extends Component {
  template() {
    return (
      <div class="mx-auto flex min-h-dvh max-w-md flex-col bg-background md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-3xl md:border md:shadow-xl">
        <header class="sticky top-0 z-10 flex items-center gap-2 bg-background/85 px-4 pb-3 pt-[max(env(safe-area-inset-top),0.75rem)] backdrop-blur">
          <span class="text-2xl">🚗</span>
          <h1 class="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">Ehliyetçik</h1>
          <button
            class="ml-auto flex size-10 items-center justify-center rounded-full bg-muted text-xl transition-transform active:scale-90"
            aria-label="Ses ayarları"
            click={learn.toggleSoundMenu}
          >
            {learn.muted ? '🔇' : '🔊'}
          </button>
          {learn.soundMenu && (
            <div class="absolute top-full right-4 flex w-64 items-center gap-3 rounded-2xl border bg-background p-3 shadow-xl">
              <button
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xl active:scale-90"
                aria-label={learn.muted ? 'Sesi aç' : 'Sesi kapat'}
                click={learn.toggleMute}
              >
                {learn.muted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={learn.volume}
                aria-label="Ses seviyesi"
                class="w-full accent-amber-500"
                input={(e: Event) => learn.setVolume(+(e.target as HTMLInputElement).value)}
              />
            </div>
          )}
        </header>
        <main class="flex flex-1 flex-col p-4">{study.mode === 'learn' ? <LearnView /> : <ExamView />}</main>
        <nav class="sticky bottom-0 flex gap-2 border-t bg-background/85 px-4 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur md:rounded-b-3xl">
          <button class={tab(study.mode === 'learn')} click={() => study.setMode('learn')}>
            <span class="text-xl">📖</span>Öğren
          </button>
          <button class={tab(study.mode === 'exam')} click={() => study.setMode('exam')}>
            <span class="text-xl">📝</span>Sınav
          </button>
        </nav>
      </div>
    )
  }
}
