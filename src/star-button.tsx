import { Component } from '@geajs/core'
import favs from './favorites-store'

// Round star toggle shown next to the card counter (Öğren) and in the exam header.
export default class StarButton extends Component {
  template({ id }: { id: string }) {
    const on = favs.has(id)
    return (
      <button
        class={`flex size-10 items-center justify-center rounded-full transition-colors ${on ? 'bg-brand-200 text-brand-700' : 'bg-sand-100 hover:bg-brand-100'}`}
        aria-label={on ? 'Yıldızı kaldır' : 'Yıldızla'}
        click={() => favs.toggle(id)}
      >
        <span class={`icon size-4 ${on ? 'icon-star-fill' : 'icon-star'}`} />
      </button>
    )
  }
}
