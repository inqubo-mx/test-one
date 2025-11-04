import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '../../services/auth';
import { QrGenerator } from '../../services/qr-generator';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.page.html',
  styleUrls: ['./id-card.page.scss'],
  standalone: false
})
export class IdCardPage implements OnInit, OnDestroy {
  user: User | null = null;
  qrData$: Observable<string>;
  timeRemaining$: Observable<number>;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: Auth,
    private qrService: QrGenerator,
    private router: Router
  ) {
    this.qrData$ = this.qrService.qrData$;
    this.timeRemaining$ = this.qrService.getTimeUntilNextRotation();
  }

  ngOnInit() {
    // Verificar autenticación
    this.user = this.authService.currentUserValue;

    if (!this.user) {
      // Si no hay usuario autenticado, redirigir al login
      this.router.navigate(['/login']);
      return;
    }

    // Iniciar rotación del QR
    this.qrService.startQRRotation(this.user.id);

    // Suscribirse a cambios en el usuario
    const userSub = this.authService.currentUser.subscribe(user => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
    this.subscriptions.push(userSub);
  }

  ngOnDestroy() {
    // Limpiar suscripciones
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // Detener rotación del QR
    this.qrService.stopQRRotation();
  }

  /**
   * Cierra la sesión del usuario
   */
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Navega a la página de noticias
   */
  goToNews() {
    this.router.navigate(['/news']);
  }

  /**
   * Formatea el tiempo restante en formato MM:SS
   */
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
