import { Component } from '@geajs/core'
import study from './study-store'
import StartScreen from './start-screen'

const pill = 'flex h-[58px] w-full items-center justify-center gap-2 rounded-full text-[17px] font-bold transition-colors'

export default class ExamView extends Component {
  template() {
    if (!study.started) return <StartScreen start={() => study.start()} />

    if (study.done)
      return (
        <div class="flex min-h-0 flex-1 animate-pop flex-col gap-5 overflow-auto px-6 pt-6 pb-4">
          <div class="mt-3 flex items-center gap-5">
            <div class="flex size-[150px] flex-none flex-col items-center justify-center rounded-full bg-sage-200">
              <span class="font-heading text-[54px] leading-none font-extrabold text-sage-900">
                {study.correct}/{study.results.length}
              </span>
              <span class="mt-1 text-[13px] font-semibold text-sage-800">doğru</span>
            </div>
            <div class="size-14 self-start rounded-full bg-brand-300" />
          </div>
          <h1 class="font-heading text-[40px] leading-[1.02] font-extrabold text-pretty">{study.resultTitle}</h1>
          <div class={study.missed.length ? 'flex flex-col gap-2.5' : 'hidden'}>
            <span class="text-sm font-bold text-sand-800">Tekrar bakılacaklar</span>
            <div class="flex flex-wrap gap-2">
              {study.missed.map((m) => (
                <span key={m.id} class="tag bg-brand-100 text-brand-800">
                  {m.name || m.q}
                </span>
              ))}
            </div>
          </div>
          <div class="flex-1" />
          <div class="flex flex-col gap-2.5">
            <button class={study.missed.length ? `${pill} bg-brand text-cream hover:bg-brand-600` : 'hidden'} click={study.retryMissed}>
              Yanlışları tekrar sor
            </button>
            <button class={`${pill} bg-sand-100 hover:bg-brand-100`} click={study.restart}>
              <span class="icon icon-restart size-[18px]" />
              Baştan başla
            </button>
          </div>
        </div>
      )

    const q = study.current
    const visual = q.type === 'image'
    const open = study.revealed
    return (
      <div class="flex min-h-0 flex-1 flex-col gap-3.5 px-6 py-3">
        <div class="flex items-center justify-between">
          <button class="flex h-10 items-center gap-1.5 rounded-full bg-sand-100 pr-4 pl-3 text-[15px] font-semibold hover:bg-brand-100" click={study.quit}>
            <span class="icon icon-x size-[18px]" />
            Bitir
          </button>
          <span class="text-[15px] font-bold">
            Soru {study.index + 1} / {study.items.length}
          </span>
        </div>
        <progress
          class="h-2.5 [--fill:var(--color-sage)] [--track:var(--color-sand-100)]"
          max={study.items.length}
          value={study.index + (open ? 1 : 0)}
        />
        <div class={`flex min-h-0 flex-1 flex-col gap-3 overflow-hidden rounded-[40px] bg-sand-100 shadow-card ${open ? 'px-[22px] py-5' : 'p-7'}`}>
          <div class={visual ? 'flex min-h-0 flex-1 items-center justify-center' : 'hidden'}>
            <div class={q.images ? 'flex w-full flex-wrap items-center justify-center gap-2 rounded-[32px] bg-brand-200 p-3' : `flex items-center justify-center rounded-full bg-brand-200 transition-all duration-350 ${open ? 'size-[130px]' : 'size-[230px]'}`}>
              {(q.images || [q.image || '']).map((src) => (
                  <img src={src} alt="" class={`object-contain drop-shadow-[0_4px_8px_rgba(46,43,37,.18)] transition-all duration-350 ${q.images ? (open ? 'size-16' : 'size-[120px]') : open ? 'size-24' : 'size-[170px]'}`} />
                ))}
            </div>
          </div>
          <span class={visual ? 'hidden' : 'tag self-start bg-sage-100 text-sage-800'}>Kural sorusu</span>
          <h2 class={`font-heading font-extrabold ${visual ? 'text-[28px] leading-[1.1]' : 'mt-2 text-[30px] leading-[1.1] text-pretty'}`}>{q.q}</h2>
          <div class={visual ? 'hidden' : 'flex-1'} />
          <div class={open ? 'flex animate-pop flex-col gap-1 rounded-[28px] bg-sage-100 px-5 py-[18px] text-sage-900' : 'hidden'}>
            <strong class={visual ? 'text-lg' : 'hidden'}>{q.name}</strong>
            <span class="text-base leading-normal text-pretty">{q.a}</span>
          </div>
        </div>
        <button class={open ? 'hidden' : `${pill} bg-brand text-cream hover:bg-brand-600`} click={study.reveal}>
          <span class="icon icon-eye" />
          Cevabı göster
        </button>
        <div class={open ? 'flex gap-2.5' : 'hidden'}>
          <button class={`${pill} bg-brand-200 text-brand-800 hover:bg-brand-300`} click={() => study.answer(false)}>
            <span class="icon icon-x" />
            Bilemedim
          </button>
          <button class={`${pill} bg-sage-700 text-white hover:bg-sage-800`} click={() => study.answer(true)}>
            <span class="icon icon-check" />
            Bildim
          </button>
        </div>
      </div>
    )
  }
}
