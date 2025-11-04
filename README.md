# Digital ID App - Aplicación de Identificación Digital para iPhone

Una aplicación móvil para iPhone construida con Ionic Angular que proporciona una identificación digital segura con autenticación biométrica (Face ID) y código QR dinámico.

## Características

### 1. Autenticación Segura
- Login con usuario y contraseña
- Soporte para Face ID / Touch ID de iPhone
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
- **Xcode** (versión más reciente) - Solo para compilar para iOS
- **CocoaPods** - Para dependencias de iOS
- **Ionic CLI** - Se instalará automáticamente si usas npx

### Instalación de CocoaPods (macOS)

```bash
sudo gem install cocoapods
```

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

## Estructura del Proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── login/              # Página de inicio de sesión
│   │   │   ├── login.page.ts
│   │   │   ├── login.page.html
│   │   │   └── login.page.scss
│   │   └── id-card/            # Página de tarjeta de ID
│   │       ├── id-card.page.ts
│   │       ├── id-card.page.html
│   │       └── id-card.page.scss
│   ├── services/
│   │   ├── auth.ts             # Servicio de autenticación
│   │   └── qr-generator.ts     # Servicio de generación de QR
│   └── app-routing.module.ts   # Configuración de rutas
├── ios/                        # Proyecto nativo de iOS
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

# Capacitor
npx cap sync           # Sincroniza código web con plataformas nativas
npx cap open ios       # Abre proyecto en Xcode
npx cap sync ios       # Sincroniza solo iOS

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

## Permisos de iOS

La aplicación requiere los siguientes permisos (ya configurados en `Info.plist`):

- **NSFaceIDUsageDescription**: Para usar Face ID en autenticación

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

## Próximas Mejoras

- [ ] Integración con API backend real
- [ ] Soporte para Touch ID
- [ ] Modo offline
- [ ] Sincronización en la nube
- [ ] Múltiples tarjetas de ID
- [ ] Exportar/compartir tarjeta
- [ ] Tema oscuro/claro
- [ ] Soporte multiidioma

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ usando Ionic Angular
