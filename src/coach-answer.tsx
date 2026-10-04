import { Component } from '@geajs/core'
import coach from './learn-coach-store'
import type { Question } from './study-store'

const steps = [
  { k: 'q', label: 'SORU' },
  { k: 'think', label: 'DÜŞÜN' },
  { k: 'a', label: 'CEVAP' },
]

// Answer box of the "Yeni" mode: hidden until the thinking time is over, current line highlighted.
export default class CoachAnswer extends Component {
  template({ q }: { q: Question }) {
    const lines = (q.type === 'image' ? q.name ?? '' : q.a).split('\n')
    const shown = coach.stage === 'a'
    return (
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5">
          {steps.map((s) => (
            <span key={s.k} class={`tag text-[12px] font-bold ${coach.stage === s.k ? 'bg-brand text-white' : 'bg-sand-200 text-sand-700'}`}>
              {s.label}
            </span>
          ))}
        </div>
        <div class="relative min-h-24 rounded-[28px] bg-sage-100 p-5">
          <div data-scroll class={`flex max-h-48 flex-col gap-1.5 overflow-y-auto text-[17px] leading-normal text-sage-900 transition-[filter] ${shown ? '' : 'blur-md'}`}>
            {lines.map((l, i) => (
              <p key={i} class={`rounded-xl px-2 transition-colors ${shown && coach.line === i ? 'bg-sage-200 font-bold' : ''}`}>{l}</p>
            ))}
            {shown && coach.hintOn && q.hint && <p class="mt-1 rounded-xl bg-brand-100 px-2 py-1 text-brand-800">Kısa hatırlatma: {q.hint}</p>}
          </div>
          {!shown && (
            <div class="absolute inset-0 flex items-center justify-center font-heading text-xl font-extrabold text-sage-900">
              {coach.stage === 'think' ? `Cevabı düşün… ${coach.count}` : 'Soru okunuyor…'}
            </div>
          )}
        </div>
      </div>
    )
  }
}
