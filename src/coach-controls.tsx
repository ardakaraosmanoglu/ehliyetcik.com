import { Component } from '@geajs/core'
import learn from './learn-store'
import coach from './learn-coach-store'

const btn = 'flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full text-[14px] font-bold transition-colors'

// "Yeni" Öğren controls: skip the thinking time, replay, mark as hard.
export default class CoachControls extends Component {
  template({ id }: { id: number }) {
    const hard = coach.isHard(id)
    return (
      <div class="flex gap-2">
        <button class={`${btn} bg-sand-100 hover:bg-brand-100 ${coach.stage === 'a' ? 'opacity-40' : ''}`} click={learn.skip}>
          <span class="icon icon-skip-forward size-4" />
          Cevabı söyle
        </button>
        <button class={`${btn} bg-sand-100 hover:bg-brand-100`} click={() => learn.show()}>
          <span class="icon icon-rotate-ccw size-4" />
          Tekrar
        </button>
        <button class={`${btn} ${hard ? 'bg-brand-200 text-brand-700' : 'bg-sand-100 hover:bg-brand-100'}`} click={learn.markHard}>
          <span class="icon icon-flag size-4" />
          Zorlandım
        </button>
      </div>
    )
  }
}
