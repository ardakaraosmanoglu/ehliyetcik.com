import { Card, CardContent, Badge } from '@geajs/ui'
import study from './study-store'

export default function LearnView() {
  return (
    <div class="grid gap-3">
      {study.items.map((q) => (
        <Card key={q.id}>
          <CardContent class="flex gap-4 p-4">
            {q.image && <img src={q.image} alt="" class="size-20 shrink-0" />}
            <div class="grid gap-1">
              <Badge variant="secondary" class="w-fit">{q.category}</Badge>
              <p class="font-medium">{q.q}</p>
              <p class="text-muted-foreground text-sm">{q.a}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
