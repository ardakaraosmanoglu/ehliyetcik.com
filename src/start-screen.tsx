import study, { type Kind } from './study-store'

const opt = (kind: Kind) =>
  `flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all active:scale-95 ${
    study.kind === kind
      ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-200/60 scale-[1.03]'
      : 'border-transparent bg-muted/70'
  }`

// Shared start screen for both modes: pick a question type, then start.
export default function StartScreen({ title, hint, start }: { title: string; hint: string; start: () => void }) {
  return (
    <div class="flex flex-1 flex-col justify-center gap-8">
      <div class="grid gap-1 text-center">
        <p class="text-3xl font-extrabold tracking-tight">{title}</p>
        <p class="text-muted-foreground">{hint}</p>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <button class={opt('image')} click={() => study.setKind('image')}>
          <span class="text-5xl">🚸</span>
          <span class="font-bold">Görselli</span>
          <span class="text-xs text-muted-foreground">{study.count('image')} levha</span>
        </button>
        <button class={opt('text')} click={() => study.setKind('text')}>
          <span class="text-5xl">📘</span>
          <span class="font-bold">Metinsel</span>
          <span class="text-xs text-muted-foreground">{study.count('text')} soru</span>
        </button>
      </div>
      <button
        class="h-14 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-300/50 transition-transform active:scale-95"
        click={start}
      >
        Başla 🚀
      </button>
    </div>
  )
}
