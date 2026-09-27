import study from './study-store'

// ponytail: no conditional elements or @geajs/ui components inside .map() items — Gea mis-binds them; img is always rendered and hidden via class
export default function LearnView() {
  return (
    <div class="grid gap-3">
      {study.items.map((q) => (
        <article key={q.id} class="grid gap-3 rounded-xl border bg-card p-4">
          <img src={q.image || ''} alt="" class={q.image ? 'mx-auto size-28' : 'hidden'} />
          <span class="w-fit rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold">{q.category}</span>
          <p class="font-medium">{q.q}</p>
          <p class="text-muted-foreground">{q.a}</p>
        </article>
      ))}
    </div>
  )
}
