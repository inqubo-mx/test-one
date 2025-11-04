import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Capacitor } from '@capacitor/core';

export interface User {
  id: string;
  username: string;
  name: string;
  photo: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly STORAGE_KEY = 'digital_id_user';
  private readonly BIOMETRIC_ENABLED_KEY = 'biometric_enabled';

  constructor() {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Simula un login con usuario y contraseña
   * En producción, esto debería llamar a una API real
   */
  async login(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulación de llamada API
      setTimeout(() => {
        if (username && password) {
          // Usuario mock
          const user: User = {
            id: '12345',
            username: username,
            name: 'Juan Pérez',
            email: `${username}@example.com`,
            photo: 'https://ui-avatars.com/api/?name=' + encodeURIComponent('Juan Pérez') + '&size=300&background=0D8ABC&color=fff'
          };

          // Guardar en localStorage
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
          this.currentUserSubject.next(user);
          resolve(user);
        } else {
          reject('Usuario o contraseña inválidos');
        }
      }, 1000);
    });
  }

  /**
   * Verifica si el dispositivo soporta biometría (Face ID / Touch ID)
   */
  async isBiometricAvailable(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      console.log('No estamos en plataforma nativa');
      return false;
    }

    try {
      // En producción, usarías un plugin real como @capacitor-community/biometric
      // Por ahora, simulamos que está disponible en iOS
      return Capacitor.getPlatform() === 'ios';
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }

  /**
   * Verifica si el usuario tiene habilitada la autenticación biométrica
   */
  isBiometricEnabled(): boolean {
    return localStorage.getItem(this.BIOMETRIC_ENABLED_KEY) === 'true';
  }

  /**
   * Habilita la autenticación biométrica para el usuario actual
   */
  async enableBiometric(): Promise<void> {
    const available = await this.isBiometricAvailable();
    if (!available) {
      throw new Error('Biometric authentication not available');
    }
    localStorage.setItem(this.BIOMETRIC_ENABLED_KEY, 'true');
  }

  /**
   * Deshabilita la autenticación biométrica
   */
  disableBiometric(): void {
    localStorage.removeItem(this.BIOMETRIC_ENABLED_KEY);
  }

  /**
   * Autentica usando Face ID / Touch ID
   * En producción, esto usaría el plugin de biometría real
   */
  async authenticateWithBiometric(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const available = await this.isBiometricAvailable();
      if (!available) {
        reject('Face ID no está disponible en este dispositivo');
        return;
      }

      if (!this.isBiometricEnabled()) {
        reject('Face ID no está habilitado. Por favor, inicia sesión primero.');
        return;
      }

      try {
        // En producción, aquí llamarías al plugin de biometría
        // await NativeBiometric.verifyIdentity({ ... });

        // Simulación: recuperar usuario guardado
        const storedUser = localStorage.getItem(this.STORAGE_KEY);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
          resolve(user);
        } else {
          reject('No hay usuario guardado');
        }
      } catch (error) {
        reject('Autenticación biométrica fallida');
      }
    });
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Verifica si hay un usuario autenticado
   */
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }
}
