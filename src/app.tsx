import { Component } from '@geajs/core'
import study from './study-store'

export default class App extends Component {
  template() {
    return (
      <main class="app">
        <h1>Ehliyetçik</h1>
        <section class="card">
          <p class="meta">
            {study.current.category} · {study.index + 1}/{study.total}
          </p>
          <h2>{study.current.name}</h2>
          <p class="desc">{study.revealed ? study.current.desc : '…'}</p>
          <div class="actions">
            <button click={study.reveal}>Göster</button>
            <button click={study.next}>Sonraki</button>
          </div>
        </section>
      </main>
    )
  }
}
