import { Store } from '@geajs/core'
import { load, store } from './storage'

// Starred question ids + "only starred" filter for the start screen.
class FavoritesStore extends Store {
  ids: string[] = load('ehliyetcik.favorites', [])
  only = load('ehliyetcik.onlyFavs', false)
  onlyTop = load('ehliyetcik.onlyTop', false)

  has = (id: string) => this.ids.includes(id)

  toggle = (id: string) => {
    this.ids = this.has(id) ? this.ids.filter((i) => i !== id) : [...this.ids, id]
    store('ehliyetcik.favorites', this.ids)
  }

  setOnly = (on: boolean) => {
    this.only = on
    store('ehliyetcik.onlyFavs', on)
  }

  setOnlyTop = (on: boolean) => {
    this.onlyTop = on
    store('ehliyetcik.onlyTop', on)
  }
}

export default new FavoritesStore()
