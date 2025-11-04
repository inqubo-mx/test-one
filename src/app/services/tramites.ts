import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Tramite {
  id: string;
  title: string;
  description: string;
  category: 'identificacion' | 'documentos' | 'certificados' | 'permisos';
  status: 'disponible' | 'en-proceso' | 'completado' | 'rechazado';
  icon: string;
  color: string;
  estimatedTime?: string;
  requiredDocuments?: string[];
  dateStarted?: Date;
  dateCompleted?: Date;
  progress?: number; // 0-100
}

@Injectable({
  providedIn: 'root',
})
export class Tramites {
  private tramitesSubject: BehaviorSubject<Tramite[]>;
  public tramites$: Observable<Tramite[]>;

  constructor() {
    const initialTramites = this.getMockTramites();
    this.tramitesSubject = new BehaviorSubject<Tramite[]>(initialTramites);
    this.tramites$ = this.tramitesSubject.asObservable();
  }

  /**
   * Obtiene todos los trámites
   */
  getAllTramites(): Observable<Tramite[]> {
    return this.tramites$;
  }

  /**
   * Obtiene trámites por estado
   */
  getTramitesByStatus(status: string): Tramite[] {
    return this.tramitesSubject.value.filter(t => t.status === status);
  }

  /**
   * Obtiene trámites por categoría
   */
  getTramitesByCategory(category: string): Tramite[] {
    return this.tramitesSubject.value.filter(t => t.category === category);
  }

  /**
   * Inicia un nuevo trámite
   */
  startTramite(tramiteId: string): Observable<boolean> {
    return new Promise<boolean>((resolve) => {
      const tramites = this.tramitesSubject.value;
      const tramite = tramites.find(t => t.id === tramiteId);

      if (tramite && tramite.status === 'disponible') {
        tramite.status = 'en-proceso';
        tramite.dateStarted = new Date();
        tramite.progress = 10;
        this.tramitesSubject.next([...tramites]);
        resolve(true);
      } else {
        resolve(false);
      }
    }) as any;
  }

  /**
   * Actualiza el progreso de un trámite
   */
  updateProgress(tramiteId: string, progress: number): void {
    const tramites = this.tramitesSubject.value;
    const tramite = tramites.find(t => t.id === tramiteId);

    if (tramite) {
      tramite.progress = progress;
      if (progress >= 100) {
        tramite.status = 'completado';
        tramite.dateCompleted = new Date();
      }
      this.tramitesSubject.next([...tramites]);
    }
  }

  /**
   * Refresca la lista de trámites
   */
  refreshTramites(): Observable<Tramite[]> {
    return of(this.getMockTramites()).pipe(delay(1000));
  }

  /**
   * Genera trámites mock
   */
  private getMockTramites(): Tramite[] {
    return [
      {
        id: '1',
        title: 'Renovación de ID Digital',
        description: 'Renueva tu identificación digital antes de que expire',
        category: 'identificacion',
        status: 'disponible',
        icon: 'card',
        color: 'primary',
        estimatedTime: '2-3 días hábiles',
        requiredDocuments: ['Fotografía reciente', 'Comprobante de domicilio']
      },
      {
        id: '2',
        title: 'Solicitud de Constancia de Identidad',
        description: 'Obtén una constancia oficial que valide tu identidad digital',
        category: 'documentos',
        status: 'en-proceso',
        icon: 'document-text',
        color: 'secondary',
        estimatedTime: '1-2 días hábiles',
        dateStarted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        progress: 65,
        requiredDocuments: ['ID Digital vigente']
      },
      {
        id: '3',
        title: 'Certificado de No Antecedentes',
        description: 'Solicita tu certificado de no antecedentes penales',
        category: 'certificados',
        status: 'disponible',
        icon: 'shield-checkmark',
        color: 'success',
        estimatedTime: '5-7 días hábiles',
        requiredDocuments: ['ID Digital', 'Comprobante de domicilio', 'CURP']
      },
      {
        id: '4',
        title: 'Actualización de Datos Personales',
        description: 'Modifica la información asociada a tu perfil',
        category: 'identificacion',
        status: 'completado',
        icon: 'person',
        color: 'medium',
        estimatedTime: '1 día hábil',
        dateStarted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        dateCompleted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        progress: 100
      },
      {
        id: '5',
        title: 'Permiso de Viaje Internacional',
        description: 'Solicita permiso para viajar al extranjero',
        category: 'permisos',
        status: 'disponible',
        icon: 'airplane',
        color: 'warning',
        estimatedTime: '10-15 días hábiles',
        requiredDocuments: ['Pasaporte vigente', 'ID Digital', 'Itinerario de viaje']
      },
      {
        id: '6',
        title: 'Duplicado de ID Digital',
        description: 'Obtén un duplicado de tu identificación digital',
        category: 'identificacion',
        status: 'disponible',
        icon: 'copy',
        color: 'tertiary',
        estimatedTime: '1-2 días hábiles',
        requiredDocuments: ['Acta de extravío o robo']
      },
      {
        id: '7',
        title: 'Certificado de Vigencia de ID',
        description: 'Certifica que tu identificación digital está vigente',
        category: 'certificados',
        status: 'en-proceso',
        icon: 'checkbox',
        color: 'success',
        estimatedTime: '24 horas',
        dateStarted: new Date(Date.now() - 12 * 60 * 60 * 1000),
        progress: 85
      },
      {
        id: '8',
        title: 'Registro de Firma Electrónica',
        description: 'Registra tu firma electrónica avanzada',
        category: 'documentos',
        status: 'disponible',
        icon: 'create',
        color: 'primary',
        estimatedTime: '3-5 días hábiles',
        requiredDocuments: ['ID Digital vigente', 'Comprobante de domicilio', 'RFC']
      }
    ];
  }
}
