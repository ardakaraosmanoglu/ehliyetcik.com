// Prints every text-question clip as JSON for tts.py (same speech() as the app).
import { speech } from '../src/speech-text.ts'
import all from '../src/data/questions.json' with { type: 'json' }

const clips = all.filter((q) => q.type === 'text').flatMap((q) => {
  const s = speech(q as never)
  return [...s.answer, ...(s.hint ? [s.hint] : [])]
})
console.log(JSON.stringify(clips))
