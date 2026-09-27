import { Component } from '@geajs/core'
import learn from './learn-store'

const SITE = 'https://ardakaraosmanoglu.github.io/ehliyetcik.com'
const link = 'flex h-[52px] items-center justify-between rounded-full bg-sand-100 px-5 text-base font-bold hover:bg-brand-100'

// About sheet: unofficial notice, content source, version, contact, privacy/support links.
// External links open in Safari (Capacitor hands non-app URLs to the system browser).
export default class About extends Component {
  template() {
    return (
      <div class="absolute inset-0 z-40 flex flex-col gap-4 overflow-y-auto bg-cream px-6 pt-[max(env(safe-area-inset-top),22px)] pb-[max(env(safe-area-inset-bottom),22px)]">
        <div class="flex items-center justify-between">
          <h2 class="font-heading text-[34px] leading-none font-extrabold">Hakkında</h2>
          <button class="flex size-11 items-center justify-center rounded-full bg-sand-100 hover:bg-brand-100" aria-label="Kapat" click={learn.toggleAbout}>
            <span class="icon icon-x" />
          </button>
        </div>
        <div class="flex flex-col gap-3 rounded-[28px] bg-brand-100 p-5 text-[17px] leading-normal text-pretty text-brand-800">
          <strong class="font-heading text-xl">Bu uygulama resmî değildir.</strong>
          <p>Herhangi bir devlet kurumuyla bağlantısı yoktur.</p>
          <p>İçerik kaynağı: KKTC Sürücü Kursu Müfredatı kitapçığı.</p>
          <p>Seslendirme: Piper TTS, tr_TR-dfki-medium sesi (CC BY-NC-SA 4.0).</p>
        </div>
        <div class="flex flex-col gap-1 rounded-[28px] bg-sand-100 p-5 text-base">
          <span class="text-sand-700">Sürüm</span>
          <strong>1.0.0</strong>
          <span class="mt-2 text-sand-700">İletişim</span>
          <a class="font-bold text-brand-700" href="mailto:arda@raxana.net">arda@raxana.net</a>
        </div>
        <a class={link} href={`${SITE}/privacy.html`} target="_blank" rel="noopener">
          Gizlilik politikası
          <span class="icon icon-chevron-right size-5" />
        </a>
        <a class={link} href={`${SITE}/support.html`} target="_blank" rel="noopener">
          Destek
          <span class="icon icon-chevron-right size-5" />
        </a>
      </div>
    )
  }
}
