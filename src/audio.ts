// Plays pre-generated Piper clips (`make audio`) in order at a fixed, slightly faster rate.
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

const RATE = 1.1

// Resolves true when reading finished, false when it was cut off (next card, pause, stop).
export async function speak(parts: { src: string; text: string }[]): Promise<boolean> {
  stopAudio()
  const my = token
  clips = parts.map((p) => route(new Audio(p.src)))
  try {
    for (const a of clips) {
      if (my !== token) return false
      a.playbackRate = RATE
      await a.play()
      await new Promise((ok, fail) => ((a.onended = ok), (a.onerror = fail), (a.onpause = () => a.ended || ok(0))))
    }
    return my === token
  } catch {
    if (my !== token) return false
    const u = new SpeechSynthesisUtterance(parts.map((p) => p.text).join('. '))
    u.lang = 'tr-TR'
    u.volume = volume
    u.rate = RATE
    await new Promise((ok) => ((u.onend = ok), (u.onerror = ok), speechSynthesis.speak(u)))
    return my === token
  }
}
