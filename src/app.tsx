import { Component } from '@geajs/core'
import study from './study-store'
import LearnView from './learn-view'
import ExamView from './exam-view'

// ponytail: plain buttons here — @geajs/ui Button's `variant` doesn't update reactively inside .map()
const tab = (active: boolean) =>
  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`

export default class App extends Component {
  template() {
    return (
      <main class="mx-auto grid max-w-xl gap-4 p-4">
        <h1 class="text-2xl font-bold tracking-tight">Ehliyetçik</h1>
        <div class="flex flex-wrap items-center gap-1">
          <button class={tab(study.mode === 'learn')} click={() => study.setMode('learn')}>Öğren</button>
          <button class={tab(study.mode === 'exam')} click={() => study.setMode('exam')}>Sınav</button>
          <span class="mx-2 h-5 w-px bg-border" />
          <button class={tab(study.kind === 'image')} click={() => study.setKind('image')}>Görselli</button>
          <button class={tab(study.kind === 'text')} click={() => study.setKind('text')}>Metinsel</button>
        </div>
        {study.mode === 'learn' ? <LearnView /> : <ExamView />}
      </main>
    )
  }
}
