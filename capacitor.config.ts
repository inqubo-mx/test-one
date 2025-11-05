import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.digitalid.app',
  appName: 'Digital ID',
  webDir: 'www',
  ios: {
    contentInset: 'always'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    // Configuración para plugins de Capacitor si es necesario
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#667eea',
      showSpinner: false
    }
  }
};

export default config;
