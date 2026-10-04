// Spoken form of a question: screen text stays as is, the voice gets numbers spelled out.
export type Clip = { file: string; text: string }

const ones = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz']
const tens = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan']

function words(n: number): string {
  if (n === 0) return 'sıfır'
  if (n >= 1000) return `${n >= 2000 ? words(Math.floor(n / 1000)) + ' ' : ''}bin ${n % 1000 ? words(n % 1000) : ''}`.trim()
  const h = Math.floor(n / 100)
  const rest = `${tens[Math.floor((n % 100) / 10)]} ${ones[n % 10]}`.trim()
  return `${h ? (h > 1 ? ones[h] + ' ' : '') + 'yüz ' : ''}${rest}`.trim()
}

export function say(t: string): string {
  return t
    .replace(/(\d+),5\b/g, (_, a) => `${words(+a)} buçuk`)
    .replace(/(\d+),(\d+)/g, (_, a, b) => `${words(+a)} virgül ${words(+b)}`)
    .replace(/(\d+)\s*km\/h/g, (_, a) => `saatte ${a} kilometre`)
    .replace(/\b(\d{1,2})\.00/g, (_, h) => `saat ${h}`)
    .replace(/(\d+)-(\d+)/g, '$1 ile $2')
    .replace(/\d+/g, (n) => words(+n))
    .replace(/\s*→\s*/g, ', ')
    .replace(/’/g, '')
}

// Clips in reading order: question, answer (intro, then numbered items), hint.
export function speech(q: { id: number; q: string; a: string; hint?: string }): { q?: Clip; answer: Clip[]; hint?: Clip } {
  const lines = q.a.split('\n').filter(Boolean)
  const numbered = lines.length > 1 && /^\d+\. /.test(lines[lines.length - 1])
  const answer = lines.map((line, i) => {
    const m = line.match(/^(\d+)\. (.*)/)
    const text = m ? `${words(+m[1]).replace(/^./, (c) => c.toLocaleUpperCase('tr'))}: ${say(m[2].replace(/\.$/, ''))}.` : i === 0 || !numbered ? `${i ? '' : 'Cevap: '}${say(line)}` : say(line)
    return { file: `${q.id}-a${i || ''}.mp3`, text }
  })
  return {
    q: { file: `${q.id}-q.mp3`, text: q.q },
    answer,
    hint: q.hint ? { file: `${q.id}-h.mp3`, text: `Kısa hatırlatma: ${say(q.hint)}.` } : undefined,
  }
}
