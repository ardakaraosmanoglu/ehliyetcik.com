import { Button, Progress } from '@geajs/ui'
import study from './study-store'

// Actions sit at the bottom of the screen (thumb zone).
export default function ExamView() {
  if (study.done)
    return (
      <div class="flex flex-1 flex-col justify-center gap-6 text-center">
        <p class="text-3xl font-bold">Bitti 🎉</p>
        <p class="text-lg text-muted-foreground">
          Bildin: {study.known} · Bilemedin: {study.missed}
        </p>
        <Button size="lg" class="h-12 w-full text-base" click={study.restart}>Tekrar başla</Button>
      </div>
    )

  const q = study.current
  return (
    <div class="flex flex-1 flex-col gap-4">
      <Progress value={(study.index / study.items.length) * 100} />
      <div class="flex flex-1 flex-col justify-center gap-5">
        {q.image && <img src={q.image} alt="" class="mx-auto size-48" />}
        <p class="text-center text-xl font-semibold">{q.q}</p>
        {study.revealed && <p class="rounded-xl bg-muted p-4 text-lg">{q.a}</p>}
      </div>
      {study.revealed ? (
        <div class="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" class="h-12 text-base" click={() => study.answer(false)}>Bilemedim</Button>
          <Button size="lg" class="h-12 text-base" click={() => study.answer(true)}>Bildim</Button>
        </div>
      ) : (
        <Button size="lg" class="h-12 w-full text-base" click={study.reveal}>Cevabı göster</Button>
      )}
    </div>
  )
}
