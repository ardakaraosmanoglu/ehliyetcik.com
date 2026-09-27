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
- `@geajs/ui` `Button`'s `variant` prop doesn't update reactively inside `.map()`. Use a plain `<button class={...}>` for toggles.
- `@geajs/ui` components accept `click` (or `onClick`).
- Tailwind: `src/styles.css` imports `@geajs/ui/style.css` and `@source`s its dist so component classes are generated.
