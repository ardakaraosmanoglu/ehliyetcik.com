import { Component } from '@geajs/core'
import study from './study-store'
import learn from './learn-store'
import LearnView from './learn-view'
import ExamView from './exam-view'

const tab = (active: boolean) =>
  `relative flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium tracking-wide transition-colors ${
    active ? 'text-foreground' : 'text-muted-foreground'
  }`
const dot = (active: boolean) => `absolute top-0 h-0.5 w-8 rounded-full bg-amber-500 transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`
const iconBtn = 'flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted active:scale-95'

// Mobile-first: app shell with sticky header and bottom tab bar; on desktop it stays a centered phone-width column.
export default class App extends Component {
  template() {
    return (
      <div class="mx-auto flex min-h-dvh max-w-md flex-col bg-background md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-3xl md:border md:shadow-xl">
        <header class="sticky top-0 z-10 flex items-center gap-2.5 border-b border-border/60 bg-background/80 px-4 pb-2.5 pt-[max(env(safe-area-inset-top),0.625rem)] backdrop-blur-xl">
          <span class="flex size-7 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">E</span>
          <h1 class="text-base font-semibold tracking-tight">Ehliyetçik</h1>
          <button class={`ml-auto ${iconBtn}`} aria-label="Ses ayarları" click={learn.toggleSoundMenu}>
            <span class={learn.muted ? 'icon icon-mute' : 'icon icon-volume'} />
          </button>
          {learn.soundMenu && (
            <div class="absolute top-full right-4 mt-1 flex w-64 items-center gap-3 rounded-2xl border bg-background p-2.5 shadow-lg">
              <button class={`${iconBtn} shrink-0 bg-muted`} aria-label={learn.muted ? 'Sesi aç' : 'Sesi kapat'} click={learn.toggleMute}>
                <span class={learn.muted ? 'icon icon-mute' : 'icon icon-volume'} />
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
        <nav class="sticky bottom-0 flex border-t border-border/60 bg-background/80 px-6 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:rounded-b-3xl">
          <button class={tab(study.mode === 'learn')} click={() => study.setMode('learn')}>
            <span class={dot(study.mode === 'learn')} />
            <span class="icon icon-book" />
            Öğren
          </button>
          <button class={tab(study.mode === 'exam')} click={() => study.setMode('exam')}>
            <span class={dot(study.mode === 'exam')} />
            <span class="icon icon-exam" />
            Sınav
          </button>
        </nav>
      </div>
    )
  }
}
