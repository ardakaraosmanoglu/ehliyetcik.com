import { speech } from './speech-text'
import type { Question } from './study-store'

const CPS = 14 * 1.1 // spoken chars per second at 1.1x

function chars(q: Question) {
  if (q.type === 'image') return (q.name ?? '').length
  const s = speech(q)
  return [s.q, ...s.answer, s.hint].reduce((n, c) => n + (c?.text.length ?? 0), 0)
}

// "~N dk" to play from card `index` to the end of the deck without stopping.
export function remainingLabel(items: Question[], index: number, isNew: boolean) {
  const pause = isNew ? 6 : 1 // Yeni: 4 s think + 2 s next, Eski: 1 s
  const sec = items.slice(index).reduce((n, q) => n + chars(q) / CPS + pause, 0)
  return sec < 60 ? '<1 dk' : `~${Math.ceil(sec / 60)} dk`
}
