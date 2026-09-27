import { Button, Card, CardContent, Progress } from '@geajs/ui'
import study from './study-store'

export default function ExamView() {
  if (study.done)
    return (
      <Card>
        <CardContent class="grid gap-4 p-6 text-center">
          <p class="text-2xl font-semibold">Bitti</p>
          <p class="text-muted-foreground">
            Bildin: {study.known} · Bilemedin: {study.missed}
          </p>
          <Button click={study.restart}>Tekrar başla</Button>
        </CardContent>
      </Card>
    )

  const q = study.current
  return (
    <div class="grid gap-4">
      <Progress value={(study.index / study.items.length) * 100} />
      <Card>
        <CardContent class="grid gap-4 p-6">
          {q.image && <img src={q.image} alt="" class="mx-auto size-40" />}
          <p class="text-lg font-medium">{q.q}</p>
          {study.revealed ? (
            <div class="grid gap-4">
              <p class="rounded-md bg-muted p-3">{q.a}</p>
              <div class="grid grid-cols-2 gap-2">
                <Button variant="outline" click={() => study.answer(false)}>Bilemedim</Button>
                <Button click={() => study.answer(true)}>Bildim</Button>
              </div>
            </div>
          ) : (
            <Button click={study.reveal}>Cevabı göster</Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
