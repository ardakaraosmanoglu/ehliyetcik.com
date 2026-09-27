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
