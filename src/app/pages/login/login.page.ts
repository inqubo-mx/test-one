import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  biometricAvailable: boolean = false;
  biometricEnabled: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    // Verificar si Face ID está disponible
    this.biometricAvailable = await this.authService.isBiometricAvailable();
    this.biometricEnabled = this.authService.isBiometricEnabled();

    // Si el usuario ya está autenticado, redirigir a noticias
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/news']);
    }
  }

  /**
   * Maneja el login con usuario y contraseña
   */
  async onLogin() {
    if (!this.username || !this.password) {
      await this.showAlert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    try {
      await this.authService.login(this.username, this.password);
      await loading.dismiss();

      // Preguntar si quiere habilitar Face ID
      if (this.biometricAvailable && !this.biometricEnabled) {
        await this.askEnableBiometric();
      }

      // Navegar a la página de noticias
      this.router.navigate(['/news']);
    } catch (error) {
      await loading.dismiss();
      await this.showAlert('Error', 'Usuario o contraseña incorrectos');
    }
  }

  /**
   * Maneja el login con Face ID
   */
  async onBiometricLogin() {
    const loading = await this.loadingController.create({
      message: 'Verificando Face ID...',
    });
    await loading.present();

    try {
      await this.authService.authenticateWithBiometric();
      await loading.dismiss();
      this.router.navigate(['/news']);
    } catch (error) {
      await loading.dismiss();
      await this.showAlert('Error', error as string);
    }
  }

  /**
   * Pregunta al usuario si quiere habilitar Face ID
   */
  private async askEnableBiometric() {
    const alert = await this.alertController.create({
      header: 'Habilitar Face ID',
      message: '¿Deseas habilitar Face ID para iniciar sesión más rápido en el futuro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí, habilitar',
          handler: async () => {
            try {
              await this.authService.enableBiometric();
              this.biometricEnabled = true;
              await this.showAlert('Éxito', 'Face ID habilitado correctamente');
            } catch (error) {
              await this.showAlert('Error', 'No se pudo habilitar Face ID');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Muestra una alerta
   */
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
