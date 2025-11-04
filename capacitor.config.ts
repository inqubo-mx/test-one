import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.digitalid.app',
  appName: 'Digital ID',
  webDir: 'www',
  ios: {
    contentInset: 'always'
  },
  plugins: {
    // Configuración para plugins de Capacitor si es necesario
  }
};

export default config;
