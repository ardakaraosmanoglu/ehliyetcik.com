// Plays pre-generated Piper clips (`make audio`) in order, sped up so they finish within `seconds`.
// Falls back to the browser voice when a clip is missing.
let clips: HTMLAudioElement[] = []
let token = 0
let volume = 1

// Volume goes through a GainNode: iOS Safari ignores HTMLAudioElement.volume.
let ctx: AudioContext | undefined
let gain: GainNode | undefined

export function setVolume(v: number) {
  volume = v
  if (gain) gain.gain.value = v
}

function route(a: HTMLAudioElement) {
  if (!ctx) {
    ctx = new AudioContext()
    gain = ctx.createGain()
    gain.gain.value = volume
    gain.connect(ctx.destination)
  }
  ctx.resume()
  ctx.createMediaElementSource(a).connect(gain!)
  return a
}

export function stopAudio() {
  token++
  clips.forEach((a) => a.pause())
  speechSynthesis.cancel()
}

const duration = (a: HTMLAudioElement) =>
  new Promise<number>((ok, fail) => {
    a.onloadedmetadata = () => ok(a.duration)
    a.onerror = fail
    a.load()
  })

// ponytail: rate capped at 2.5x — beyond that speech is unintelligible; long answers just overrun the timer
const rateFor = (total: number, seconds?: number) => (seconds ? Math.min(2.5, Math.max(1, total / (seconds - 0.5))) : 1)

export async function speak(parts: { src: string; text: string }[], seconds?: number) {
  stopAudio()
  const my = token
  clips = parts.map((p) => route(new Audio(p.src)))
  try {
    const total = (await Promise.all(clips.map(duration))).reduce((a, b) => a + b, 0)
    const rate = rateFor(total, seconds)
    for (const a of clips) {
      if (my !== token) return
      a.playbackRate = rate
      await a.play()
      await new Promise((ok) => (a.onended = ok))
    }
  } catch {
    if (my !== token) return
    const text = parts.map((p) => p.text).join('. ')
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'tr-TR'
    u.volume = volume
    u.rate = rateFor(text.length / 14, seconds) // ~14 chars/sec at normal rate
    speechSynthesis.speak(u)
  }
}
