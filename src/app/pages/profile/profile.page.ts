import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  biometricEnabled: boolean = false;
  biometricAvailable: boolean = false;
  notificationsEnabled: boolean = true;
  darkModeEnabled: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = this.authService.currentUserValue;
    this.biometricEnabled = this.authService.isBiometricEnabled();
    this.biometricAvailable = await this.authService.isBiometricAvailable();

    // Cargar preferencias del usuario
    this.loadPreferences();
  }

  /**
   * Carga las preferencias guardadas del usuario
   */
  loadPreferences() {
    const savedPrefs = localStorage.getItem('user_preferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      this.notificationsEnabled = prefs.notifications ?? true;
      this.darkModeEnabled = prefs.darkMode ?? false;
    }
  }

  /**
   * Guarda las preferencias del usuario
   */
  savePreferences() {
    const prefs = {
      notifications: this.notificationsEnabled,
      darkMode: this.darkModeEnabled
    };
    localStorage.setItem('user_preferences', JSON.stringify(prefs));
  }

  /**
   * Maneja el cambio de Face ID
   */
  async onBiometricToggle(event: any) {
    const enabled = event.detail.checked;

    if (enabled) {
      try {
        await this.authService.enableBiometric();
        this.biometricEnabled = true;
        await this.showAlert('Éxito', 'Face ID habilitado correctamente');
      } catch (error) {
        this.biometricEnabled = false;
        await this.showAlert('Error', 'No se pudo habilitar Face ID');
      }
    } else {
      this.authService.disableBiometric();
      this.biometricEnabled = false;
      await this.showAlert('Face ID deshabilitado', 'Has deshabilitado Face ID para el inicio de sesión');
    }
  }

  /**
   * Maneja el cambio de notificaciones
   */
  onNotificationsToggle(event: any) {
    this.notificationsEnabled = event.detail.checked;
    this.savePreferences();
  }

  /**
   * Maneja el cambio de modo oscuro
   */
  onDarkModeToggle(event: any) {
    this.darkModeEnabled = event.detail.checked;
    this.savePreferences();
    // Aquí podrías implementar el cambio de tema
    document.body.classList.toggle('dark', this.darkModeEnabled);
  }

  /**
   * Editar perfil
   */
  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      message: 'Esta funcionalidad estará disponible próximamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Ver historial de actividad
   */
  async viewActivity() {
    const alert = await this.alertController.create({
      header: 'Historial de Actividad',
      message: 'Aquí podrás ver tu historial de accesos y actividades recientes',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Ver documentos guardados
   */
  async viewDocuments() {
    const alert = await this.alertController.create({
      header: 'Mis Documentos',
      message: 'Gestiona tus documentos digitales guardados',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Configuración de privacidad
   */
  async privacySettings() {
    const alert = await this.alertController.create({
      header: 'Privacidad',
      message: 'Administra tus preferencias de privacidad y datos',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Ayuda y soporte
   */
  async helpSupport() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ayuda y Soporte',
      buttons: [
        {
          text: 'Preguntas Frecuentes',
          icon: 'help-circle-outline',
          handler: () => {
            this.showAlert('FAQ', 'Sección de preguntas frecuentes');
          }
        },
        {
          text: 'Contactar Soporte',
          icon: 'mail-outline',
          handler: () => {
            this.showAlert('Soporte', 'Contacta con nuestro equipo de soporte');
          }
        },
        {
          text: 'Tutoriales',
          icon: 'play-circle-outline',
          handler: () => {
            this.showAlert('Tutoriales', 'Videos tutoriales de la aplicación');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  /**
   * Acerca de la aplicación
   */
  async aboutApp() {
    const alert = await this.alertController.create({
      header: 'Digital ID',
      message: `
        <strong>Versión:</strong> 1.0.0<br>
        <strong>Desarrollado con:</strong> Ionic Angular<br><br>
        © 2025 Digital ID. Todos los derechos reservados.
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Cerrar sesión
   */
  async onLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Navega a otra página
   */
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  /**
   * Muestra una alerta
   */
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
