import { Store } from '@geajs/core'
import signs from './data/signs.json'

class StudyStore extends Store {
  index = 0
  revealed = false

  get current() {
    return signs[this.index]
  }

  get total() {
    return signs.length
  }

  reveal() {
    this.revealed = true
  }

  next() {
    this.index = (this.index + 1) % signs.length
    this.revealed = false
  }
}

export default new StudyStore()
