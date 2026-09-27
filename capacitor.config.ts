import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.ehliyetcik.app',
  appName: 'Ehliyetçik',
  webDir: 'dist',
  backgroundColor: '#f5ead8',
  ios: { contentInset: 'never', scrollEnabled: false, backgroundColor: '#f5ead8' },
}

export default config
