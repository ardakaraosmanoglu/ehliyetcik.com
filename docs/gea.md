# Gea cheat sheet

Docs: https://geajs.com — scaffold: `npm create gea@latest`.

```tsx
import { Component, Store } from '@geajs/core'

class S extends Store {        // fields are reactive
  n = 0
  get double() { return this.n * 2 }  // getters = computed
  inc() { this.n++ }           // methods can be passed directly as handlers
}
export const s = new S()

export default class App extends Component {
  template() {
    return <button click={s.inc}>{s.double}</button>   // `click`, not `onClick`; `class`, not `className`
  }
}

// function components receive props
function Note({ n }: { n: number }) { return <p>{n}</p> }

new App().render(document.getElementById('app')!)
```

## Gotchas (learned the hard way)
- No destructuring in `.map()` callback params (`([a, b]) =>` crashes: "m is not defined"). Use `(item) => item.a`.
- Inside `.map()` items: no conditional elements (`{x && <img/>}` / ternary) and no component elements — bindings shift or crash ("Cannot set properties of null"). Render always, hide via `class`; use plain elements.
- Function components that read a store at the top (e.g. `if (!store.x) return ...`) don't re-render when it changes. Use a class component with `template()`.
- Reactive `style={`...${x}`}` is NOT applied to the DOM. For motion, set `el.style` / `el.animate()` (Web Animations API) directly — also faster than re-rendering.
- Function components returning `<svg>` render nothing. Icons = CSS masks in `src/styles.css`: `<span class="icon icon-book" />` (add new ones there, Lucide paths).
- Never name a `.map()` callback param `d` — the compiler uses `d` internally ("e.add is not a function").
- Dynamic widths: use `<progress max value>` (styled in `src/styles.css`), since reactive `style` isn't bound.
- Class components receive props via `this.props`.
- Custom CSS classes that Tailwind utilities must override (`.icon`, `.tag`) go in `@layer components`.
