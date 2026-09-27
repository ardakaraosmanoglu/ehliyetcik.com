import { Component } from '@geajs/core'
import study from './study-store'
import LearnView from './learn-view'
import ExamView from './exam-view'

// ponytail: plain buttons here — @geajs/ui Button's `variant` doesn't update reactively inside .map()
const seg = (active: boolean) =>
  `flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${active ? 'bg-background shadow-sm' : 'text-muted-foreground'}`
const tab = (active: boolean) =>
  `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium ${active ? 'text-foreground' : 'text-muted-foreground'}`

// Mobile-first: app shell with sticky header and bottom tab bar; on desktop it stays a centered phone-width column.
export default class App extends Component {
  template() {
    return (
      <div class="mx-auto flex min-h-dvh max-w-md flex-col bg-background md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-2xl md:border md:shadow-sm">
        <header class="sticky top-0 z-10 grid gap-3 border-b bg-background/85 px-4 pb-3 pt-[max(env(safe-area-inset-top),0.75rem)] backdrop-blur">
          <h1 class="text-xl font-bold tracking-tight">{study.mode === 'learn' ? 'Öğren' : 'Sınav'}</h1>
          <div class="flex rounded-lg bg-muted p-1">
            <button class={seg(study.kind === 'image')} click={() => study.setKind('image')}>Görselli</button>
            <button class={seg(study.kind === 'text')} click={() => study.setKind('text')}>Metinsel</button>
          </div>
        </header>
        <main class="flex flex-1 flex-col p-4">{study.mode === 'learn' ? <LearnView /> : <ExamView />}</main>
        <nav class="sticky bottom-0 flex border-t bg-background/85 pb-[env(safe-area-inset-bottom)] backdrop-blur md:rounded-b-2xl">
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
