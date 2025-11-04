import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tramites, Tramite } from '../../services/tramites';
import { Auth } from '../../services/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.page.html',
  styleUrls: ['./tramites.page.scss'],
  standalone: false
})
export class TramitesPage implements OnInit {
  allTramites: Tramite[] = [];
  filteredTramites: Tramite[] = [];
  selectedFilter: string = 'todos';

  filters = [
    { value: 'todos', label: 'Todos' },
    { value: 'disponible', label: 'Disponibles' },
    { value: 'en-proceso', label: 'En Proceso' },
    { value: 'completado', label: 'Completados' }
  ];

  constructor(
    private tramitesService: Tramites,
    private authService: Auth,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadTramites();
  }

  /**
   * Carga los trámites
   */
  loadTramites() {
    this.tramitesService.getAllTramites().subscribe(tramites => {
      this.allTramites = tramites;
      this.filterTramites();
    });
  }

  /**
   * Maneja el pull-to-refresh
   */
  handleRefresh(event: any) {
    this.tramitesService.refreshTramites().subscribe(tramites => {
      this.allTramites = tramites;
      this.filterTramites();
      event.target.complete();
    });
  }

  /**
   * Maneja el cambio de filtro
   */
  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.filterTramites();
  }

  /**
   * Filtra los trámites según el filtro seleccionado
   */
  private filterTramites() {
    if (this.selectedFilter === 'todos') {
      this.filteredTramites = this.allTramites;
    } else {
      this.filteredTramites = this.allTramites.filter(
        t => t.status === this.selectedFilter
      );
    }
  }

  /**
   * Inicia un trámite
   */
  async startTramite(tramite: Tramite) {
    if (tramite.status !== 'disponible') {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Iniciar Trámite',
      message: `¿Deseas iniciar el trámite "${tramite.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Iniciar',
          handler: () => {
            this.tramitesService.startTramite(tramite.id).subscribe(success => {
              if (success) {
                this.showSuccessAlert('Trámite iniciado correctamente');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Ver detalles del trámite
   */
  async viewDetails(tramite: Tramite) {
    let message = `<strong>Descripción:</strong><br>${tramite.description}<br><br>`;
    message += `<strong>Tiempo estimado:</strong> ${tramite.estimatedTime || 'No especificado'}<br><br>`;

    if (tramite.requiredDocuments && tramite.requiredDocuments.length > 0) {
      message += `<strong>Documentos requeridos:</strong><ul>`;
      tramite.requiredDocuments.forEach(doc => {
        message += `<li>${doc}</li>`;
      });
      message += `</ul>`;
    }

    if (tramite.status === 'en-proceso' && tramite.dateStarted) {
      message += `<br><strong>Iniciado:</strong> ${this.formatDate(tramite.dateStarted)}`;
    }

    if (tramite.status === 'completado' && tramite.dateCompleted) {
      message += `<br><strong>Completado:</strong> ${this.formatDate(tramite.dateCompleted)}`;
    }

    const alert = await this.alertController.create({
      header: tramite.title,
      message: message,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  /**
   * Muestra alerta de éxito
   */
  private async showSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Formatea la fecha
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Obtiene el texto del estado
   */
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'disponible': 'Disponible',
      'en-proceso': 'En Proceso',
      'completado': 'Completado',
      'rechazado': 'Rechazado'
    };
    return statusMap[status] || status;
  }

  /**
   * Obtiene el color del estado
   */
  getStatusColor(status: string): string {
    const colorMap: { [key: string]: string } = {
      'disponible': 'primary',
      'en-proceso': 'warning',
      'completado': 'success',
      'rechazado': 'danger'
    };
    return colorMap[status] || 'medium';
  }

  /**
   * Navega a otra página
   */
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  /**
   * Cierra sesión
   */
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
