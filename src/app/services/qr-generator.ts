import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QrGenerator {
  private qrDataSubject: BehaviorSubject<string>;
  public qrData$: Observable<string>;
  private readonly QR_ROTATION_INTERVAL = 2 * 60 * 1000; // 2 minutos en milisegundos
  private intervalSubscription: any;

  constructor() {
    const initialQR = this.generateQRData();
    this.qrDataSubject = new BehaviorSubject<string>(initialQR);
    this.qrData$ = this.qrDataSubject.asObservable();
  }

  /**
   * Inicia la rotación automática del código QR cada 2 minutos
   */
  startQRRotation(userId: string): void {
    // Detener rotación previa si existe
    this.stopQRRotation();

    // Generar el primer QR inmediatamente
    this.updateQRData(userId);

    // Configurar rotación automática
    this.intervalSubscription = interval(this.QR_ROTATION_INTERVAL).subscribe(() => {
      this.updateQRData(userId);
    });
  }

  /**
   * Detiene la rotación automática del código QR
   */
  stopQRRotation(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  /**
   * Actualiza el código QR con nuevos datos
   */
  private updateQRData(userId: string): void {
    const newQRData = this.generateQRData(userId);
    this.qrDataSubject.next(newQRData);
  }

  /**
   * Genera los datos del código QR
   * Incluye: ID de usuario, timestamp, y un token único
   */
  private generateQRData(userId?: string): string {
    const timestamp = Date.now();
    const randomToken = this.generateRandomToken();

    const qrPayload = {
      userId: userId || 'guest',
      timestamp: timestamp,
      token: randomToken,
      expiresAt: timestamp + this.QR_ROTATION_INTERVAL,
      type: 'digital-id-card'
    };

    // En producción, esto podría ser un JWT firmado o un código encriptado
    return JSON.stringify(qrPayload);
  }

  /**
   * Genera un token aleatorio único
   */
  private generateRandomToken(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Obtiene el valor actual del QR
   */
  getCurrentQRData(): string {
    return this.qrDataSubject.value;
  }

  /**
   * Calcula el tiempo restante hasta la próxima rotación
   */
  getTimeUntilNextRotation(): Observable<number> {
    return interval(1000).pipe(
      map(() => {
        try {
          const currentData = JSON.parse(this.getCurrentQRData());
          const expiresAt = currentData.expiresAt;
          const now = Date.now();
          const remaining = Math.max(0, expiresAt - now);
          return Math.floor(remaining / 1000); // Retorna segundos
        } catch {
          return 0;
        }
      })
    );
  }
}
