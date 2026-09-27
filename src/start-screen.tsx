import { Component } from '@geajs/core'
import study from './study-store'

const card = (on: boolean, tilt: string) =>
  `relative flex h-[230px] flex-col items-start justify-between rounded-[40px] border-[3px] p-4 text-left text-ink transition-[transform,background] duration-250 ease-[cubic-bezier(.3,1.6,.5,1)] hover:bg-brand-100 ${
    on ? `border-brand bg-brand-100 ${tilt} -translate-y-1` : 'border-sand-400 bg-sand-100'
  }`

// Shared home screen for both modes: pick a question type, then start.
export default class StartScreen extends Component {
  template() {
    const learn = study.mode === 'learn'
    return (
      <div class="flex flex-1 animate-pop flex-col gap-[22px] px-6 pt-6 pb-4">
        <h1 class="mt-2 font-heading text-[58px] leading-[.95] font-extrabold">{learn ? 'Öğren' : 'Sınav'}</h1>
        <div class="mt-1.5 grid grid-cols-2 gap-3">
          <button class={card(study.kind === 'image', '-rotate-3')} click={() => study.setKind('image')}>
            <span class={study.kind === 'image' ? 'absolute top-3.5 right-3.5 flex size-[30px] items-center justify-center rounded-full bg-brand text-white' : 'hidden'}>
              <span class="icon icon-check size-4" />
            </span>
            <div class="flex size-[104px] items-center justify-center rounded-full bg-brand-200">
              <img src="/signs/dur.svg" alt="" class="size-[72px] drop-shadow-[0_4px_8px_rgba(46,43,37,.18)]" />
            </div>
            <div class="flex flex-col items-start gap-1.5">
              <span class="font-heading text-[26px] leading-none font-extrabold">İşaretler</span>
              <span class="tag bg-sand-100 text-sand-800">{study.deck('image').length} işaret</span>
            </div>
          </button>
          <button class={card(study.kind === 'text', 'rotate-3')} click={() => study.setKind('text')}>
            <span class={study.kind === 'text' ? 'absolute top-3.5 right-3.5 flex size-[30px] items-center justify-center rounded-full bg-brand text-white' : 'hidden'}>
              <span class="icon icon-check size-4" />
            </span>
            <div class="flex size-[104px] items-center justify-center rounded-full bg-sage-200 font-heading text-[44px] font-extrabold text-sage-800">Aa</div>
            <div class="flex flex-col items-start gap-1.5">
              <span class="font-heading text-[26px] leading-none font-extrabold">Kurallar</span>
              <span class="tag bg-sand-100 text-sand-800">{study.deck('text').length} kural</span>
            </div>
          </button>
        </div>
        <div class={!learn && study.lastScore ? 'flex items-center gap-2.5 text-sm text-sand-700' : 'hidden'}>
          <span class="size-2.5 rounded-full bg-sage" />
          Son sınav: <strong class="text-ink">{study.lastScore}</strong>
        </div>
        <div class="flex-1" />
        <button
          class="flex h-[58px] w-full items-center justify-center gap-2.5 rounded-full bg-brand text-[17px] font-bold text-cream transition-colors hover:bg-brand-600 active:bg-brand-700"
          click={this.props.start}
        >
          <span class="icon icon-play size-[18px]" />
          {learn ? 'Öğrenmeye başla' : 'Sınava başla'}
        </button>
      </div>
    )
  }
}
