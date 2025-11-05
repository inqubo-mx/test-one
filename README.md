# Digital ID App - Aplicación de Identificación Digital

Una aplicación móvil multiplataforma (iOS y Android) construida con Ionic Angular que proporciona una identificación digital segura con autenticación biométrica (Face ID / Fingerprint) y código QR dinámico.

## Características

### 1. Autenticación Segura
- Login con usuario y contraseña
- Soporte para autenticación biométrica (Face ID / Touch ID en iOS, Fingerprint en Android)
- Almacenamiento seguro de credenciales
- Opción para habilitar/deshabilitar autenticación biométrica

### 2. Tarjeta de Identificación Digital
- Diseño atractivo tipo tarjeta oficial
- Fotografía del usuario
- Información personal del usuario
- Código QR dinámico que se renueva cada 2 minutos
- Indicador de tiempo restante hasta la próxima rotación del QR

### 3. Seguridad
- Códigos QR únicos y temporales
- Rotación automática cada 2 minutos
- Tokens criptográficamente seguros
- Protección de rutas con guards

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- **Ionic CLI** - Se instalará automáticamente si usas npx

### Para desarrollo en iOS

- **Xcode** (versión más reciente) - Requerido solo en macOS
- **CocoaPods** - Para dependencias de iOS

#### Instalación de CocoaPods (macOS)

```bash
sudo gem install cocoapods
```

### Para desarrollo en Android

- **Android Studio** (versión más reciente)
- **Android SDK** (API level 24 o superior)
- **Java Development Kit (JDK)** - Versión 17 recomendada
- **Gradle** - Se instala automáticamente con Android Studio

## Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd test-one
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Sincronizar Capacitor**
```bash
npx cap sync
```

## Desarrollo

### Ejecutar en el navegador (modo de desarrollo)

```bash
npm start
# o
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`

**Nota:** Face ID no funcionará en el navegador, ya que requiere un dispositivo iOS físico.

### Ejecutar en iOS Simulator

1. Compilar la aplicación:
```bash
npm run build
```

2. Sincronizar con iOS:
```bash
npx cap sync ios
```

3. Abrir en Xcode:
```bash
npx cap open ios
```

4. En Xcode:
   - Selecciona un simulador de iPhone (iPhone 14 o superior recomendado)
   - Presiona el botón de Play (▶️) para compilar y ejecutar

### Ejecutar en dispositivo iOS físico

1. Conecta tu iPhone al Mac mediante cable USB

2. En Xcode:
   - Selecciona tu dispositivo en el dropdown superior
   - Ve a "Signing & Capabilities"
   - Selecciona tu equipo de desarrollo
   - Asegúrate de que el Bundle Identifier sea único

3. Presiona Play (▶️) para instalar en el dispositivo

**Nota:** Para probar Face ID, necesitas un dispositivo físico. Face ID no funciona en el simulador.

### Ejecutar en Android Emulator

1. Compilar la aplicación:
```bash
npm run build
```

2. Sincronizar con Android:
```bash
npx cap sync android
```

3. Abrir en Android Studio:
```bash
npx cap open android
```

4. En Android Studio:
   - Espera a que Gradle termine de sincronizar
   - Selecciona un emulador Android (o crea uno desde AVD Manager)
   - Presiona el botón de Run (▶️) para compilar y ejecutar

### Ejecutar en dispositivo Android físico

1. Habilita las opciones de desarrollador en tu dispositivo Android:
   - Ve a Ajustes > Acerca del teléfono
   - Toca "Número de compilación" 7 veces
   - Vuelve a Ajustes > Opciones de desarrollador
   - Activa "Depuración USB"

2. Conecta tu dispositivo Android al ordenador mediante cable USB

3. En Android Studio:
   - Selecciona tu dispositivo en el dropdown superior
   - Presiona Run (▶️) para instalar en el dispositivo

**Nota:** Para probar autenticación biométrica (huella digital), necesitas un dispositivo físico con sensor de huellas configurado.

## Estructura del Proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── login/              # Página de inicio de sesión
│   │   │   ├── login.page.ts
│   │   │   ├── login.page.html
│   │   │   └── login.page.scss
│   │   ├── id-card/            # Página de tarjeta de ID
│   │   │   ├── id-card.page.ts
│   │   │   ├── id-card.page.html
│   │   │   └── id-card.page.scss
│   │   ├── news/               # Página de noticias
│   │   │   ├── news.page.ts
│   │   │   ├── news.page.html
│   │   │   └── news.page.scss
│   │   ├── tramites/           # Página de trámites
│   │   │   ├── tramites.page.ts
│   │   │   ├── tramites.page.html
│   │   │   └── tramites.page.scss
│   │   └── profile/            # Página de perfil
│   │       ├── profile.page.ts
│   │       ├── profile.page.html
│   │       └── profile.page.scss
│   ├── services/
│   │   ├── auth.ts             # Servicio de autenticación
│   │   ├── qr-generator.ts     # Servicio de generación de QR
│   │   ├── news.ts             # Servicio de noticias
│   │   └── tramites.ts         # Servicio de trámites
│   └── app-routing.module.ts   # Configuración de rutas
├── ios/                        # Proyecto nativo de iOS
├── android/                    # Proyecto nativo de Android
└── capacitor.config.ts         # Configuración de Capacitor
```

## Uso de la Aplicación

### Primera vez (Login con Usuario/Contraseña)

1. Abre la aplicación
2. Ingresa cualquier usuario y contraseña (es una simulación)
3. Presiona "Iniciar Sesión"
4. Si estás en un dispositivo con Face ID, se te preguntará si quieres habilitarlo
5. Selecciona "Sí, habilitar" para activar Face ID

### Siguientes accesos (con Face ID habilitado)

1. Abre la aplicación
2. Presiona el botón "Ingresar con Face ID"
3. El sistema solicitará verificación de Face ID
4. Una vez verificado, accederás directamente a tu ID digital

### Tarjeta de ID Digital

- **Código QR**: Se actualiza automáticamente cada 2 minutos
- **Temporizador**: Muestra cuánto tiempo queda para la próxima actualización
- **Información del usuario**: Muestra nombre, usuario, ID y email
- **Cerrar sesión**: Presiona el botón de logout en la esquina superior derecha

## Configuración para Producción

### Actualizar credenciales de API

El servicio de autenticación actual es una simulación. Para producción:

1. Abre `src/app/services/auth.ts`
2. Modifica el método `login()` para conectar con tu API real:

```typescript
async login(username: string, password: string): Promise<User> {
  const response = await fetch('https://tu-api.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const user = await response.json();
  // ... resto del código
}
```

### Configurar Face ID real

Para integrar Face ID real en producción:

1. Instala un plugin de biometría como `@capacitor-community/biometric-auth`:
```bash
npm install @capacitor-community/biometric-auth
```

2. Actualiza el servicio `auth.ts` para usar el plugin real

### Configurar firma de código

Antes de publicar en el App Store:

1. Ve a Xcode > Signing & Capabilities
2. Selecciona tu equipo de desarrollo
3. Configura un Bundle Identifier único
4. Habilita las capacidades necesarias (Face ID ya está configurado en Info.plist)

## Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo
npm run build          # Compila la aplicación

# Capacitor - General
npx cap sync           # Sincroniza código web con todas las plataformas

# Capacitor - iOS
npx cap open ios       # Abre proyecto en Xcode
npx cap sync ios       # Sincroniza solo iOS

# Capacitor - Android
npx cap open android   # Abre proyecto en Android Studio
npx cap sync android   # Sincroniza solo Android

# Testing
npm test              # Ejecuta tests (si están configurados)
```

## Tecnologías Utilizadas

- **Ionic Framework** - Framework de UI móvil
- **Angular** - Framework web
- **Capacitor** - Runtime nativo
- **angularx-qrcode** - Generación de códigos QR
- **RxJS** - Programación reactiva
- **TypeScript** - Lenguaje de programación

## Permisos

### iOS

La aplicación requiere los siguientes permisos (ya configurados en `ios/App/App/Info.plist`):

- **NSFaceIDUsageDescription**: Para usar Face ID en autenticación

### Android

La aplicación requiere los siguientes permisos (ya configurados en `android/app/src/main/AndroidManifest.xml`):

- **INTERNET**: Para conectar con servicios web
- **USE_BIOMETRIC**: Para usar autenticación biométrica (huella digital, reconocimiento facial)

## Solución de Problemas

### Face ID no funciona en el simulador
**Solución:** Face ID requiere un dispositivo físico. Usa un iPhone real para probar esta funcionalidad.

### Error al compilar para iOS
**Solución:**
1. Asegúrate de tener Xcode instalado y actualizado
2. Ejecuta `npx cap sync ios` antes de abrir Xcode
3. Limpia el build en Xcode: Product > Clean Build Folder

### El código QR no se muestra
**Solución:** Verifica que el módulo QRCodeModule esté importado en `id-card.module.ts`

### Errores de dependencias
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
npx cap sync
```

### Error al compilar para Android
**Solución:**
1. Asegúrate de tener Android Studio instalado y actualizado
2. Verifica que Android SDK esté instalado (desde SDK Manager en Android Studio)
3. Ejecuta `npx cap sync android` antes de abrir Android Studio
4. Limpia el build en Android Studio: Build > Clean Project > Rebuild Project

### Gradle sync failed en Android
**Solución:**
1. Verifica tu conexión a internet
2. En Android Studio: File > Invalidate Caches / Restart
3. Borra la carpeta `.gradle` en tu directorio home y vuelve a sincronizar

### La autenticación biométrica no funciona en Android
**Solución:**
- En emulador: Ve a Settings > Security > Fingerprint y configura una huella digital virtual
- En dispositivo físico: Asegúrate de tener configurado al menos un método biométrico en los ajustes del dispositivo

## Próximas Mejoras

- [ ] Integración con API backend real
- [ ] Plugin real de autenticación biométrica
- [ ] Modo offline
- [ ] Sincronización en la nube
- [ ] Múltiples tarjetas de ID
- [ ] Exportar/compartir tarjeta
- [ ] Mejora del tema oscuro
- [ ] Soporte multiidioma
- [ ] Push notifications
- [ ] Análisis y estadísticas de uso

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ usando Ionic Angular
