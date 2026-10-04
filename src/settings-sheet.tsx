import { Component } from '@geajs/core'
import learn from './learn-store'
import settings from './settings-store'
import About from './about'
import { canRemind } from './reminder'

const opt = (on: boolean) => `h-12 flex-1 rounded-full text-base font-bold transition-colors ${on ? 'bg-brand text-white' : 'text-sand-700'}`

// Settings sheet (opened from the header gear): learning mode + About.
export default class SettingsSheet extends Component {
  template() {
    return (
      <div class="absolute inset-0 z-40 flex flex-col gap-5 overflow-y-auto bg-cream px-6 pt-[max(env(safe-area-inset-top),22px)] pb-[max(env(safe-area-inset-bottom),22px)]">
        <div class="flex items-center justify-between">
          <h2 class="font-heading text-[34px] leading-none font-extrabold">Ayarlar</h2>
          <button class="flex size-11 items-center justify-center rounded-full bg-sand-100 hover:bg-brand-100" aria-label="Kapat" click={learn.toggleAbout}>
            <span class="icon icon-x" />
          </button>
        </div>
        <div class="flex flex-col gap-2.5">
          <h3 class="font-heading text-2xl font-extrabold">Öğrenme modu</h3>
          <div class="flex gap-1.5 rounded-full bg-sand-100 p-1.5">
            <button class={opt(!settings.isNew)} click={() => settings.setMode('old')}>Eski</button>
            <button class={opt(settings.isNew)} click={() => settings.setMode('new')}>Yeni</button>
          </div>
          <p class="text-[15px] text-sand-700">{settings.isNew ? 'Soru okunur, düşünme süresi verilir, sonra cevap maddeleriyle okunur.' : 'Soru ve cevap arka arkaya okunur.'}</p>
        </div>
        {canRemind && (
          <div class="flex flex-col gap-2.5">
            <h3 class="font-heading text-2xl font-extrabold">Günlük hatırlatma</h3>
            <div class="flex items-center gap-3">
              <div class="flex flex-1 gap-1.5 rounded-full bg-sand-100 p-1.5">
                <button class={opt(!settings.reminder.on)} click={() => settings.setReminder(false)}>Kapalı</button>
                <button class={opt(settings.reminder.on)} click={() => settings.setReminder(true)}>Açık</button>
              </div>
              <input type="time" value={settings.reminder.time} class="h-12 rounded-full bg-sand-100 px-4 text-base font-bold text-sand-700" change={(e: Event) => settings.setReminder(settings.reminder.on, (e.target as HTMLInputElement).value || '19:00')} />
            </div>
            <p class="text-[15px] text-sand-700">{settings.denied ? 'Bildirim izni verilmedi. iPhone Ayarlar bölümünden izin verebilirsin.' : 'Her gün seçtiğin saatte bildirim gelir. Hatırlatma yalnızca cihazında çalışır.'}</p>
          </div>
        )}
        <About />
      </div>
    )
  }
}
