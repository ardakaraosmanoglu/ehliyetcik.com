import '@fontsource/baloo-2/600.css'
import '@fontsource/baloo-2/700.css'
import '@fontsource/baloo-2/800.css'
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/500.css'
import '@fontsource/figtree/600.css'
import '@fontsource/figtree/700.css'
import App from './app'
import './styles.css'

// Hidden documents freeze CSS animations mid-way (content stuck invisible), so turn them off there.
const syncHidden = () => document.documentElement.classList.toggle('hidden-doc', document.hidden)
syncHidden()
document.addEventListener('visibilitychange', syncHidden)

const root = document.getElementById('app')

if (!root) {
  throw new Error('App root element not found')
}

const app = new App()
app.render(root)
