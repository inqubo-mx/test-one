import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News, NewsArticle } from '../../services/news';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: false
})
export class NewsPage implements OnInit {
  newsArticles: NewsArticle[] = [];
  filteredNews: NewsArticle[] = [];
  selectedCategory: string = 'all';

  categories = [
    { value: 'all', label: 'Todas' },
    { value: 'security', label: 'Seguridad' },
    { value: 'updates', label: 'Actualizaciones' },
    { value: 'tips', label: 'Consejos' },
    { value: 'general', label: 'General' }
  ];

  constructor(
    private newsService: News,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadNews();
  }

  /**
   * Carga las noticias
   */
  loadNews() {
    this.newsService.getAllNews().subscribe(news => {
      this.newsArticles = news;
      this.filterNews();
    });
  }

  /**
   * Maneja el pull-to-refresh
   */
  handleRefresh(event: any) {
    this.newsService.refreshNews().subscribe(news => {
      this.newsArticles = news;
      this.filterNews();
      event.target.complete();
    });
  }

  /**
   * Filtra noticias por categoría
   */
  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.filterNews();
  }

  /**
   * Aplica el filtro de categoría
   */
  private filterNews() {
    if (this.selectedCategory === 'all') {
      this.filteredNews = this.newsArticles;
    } else {
      this.filteredNews = this.newsArticles.filter(
        news => news.category === this.selectedCategory
      );
    }
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatDate(date: Date): string {
    const now = new Date();
    const newsDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - newsDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return newsDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }

  /**
   * Obtiene el nombre de la categoría
   */
  getCategoryLabel(category: string): string {
    const cat = this.categories.find(c => c.value === category);
    return cat?.label || 'General';
  }

  /**
   * Obtiene el color según la categoría
   */
  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'security': 'danger',
      'updates': 'primary',
      'tips': 'success',
      'general': 'medium'
    };
    return colors[category] || 'medium';
  }

  /**
   * Obtiene el icono según la categoría
   */
  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'security': 'shield-checkmark',
      'updates': 'rocket',
      'tips': 'bulb',
      'general': 'newspaper'
    };
    return icons[category] || 'newspaper';
  }

  /**
   * Navega a la tarjeta de ID
   */
  goToIdCard() {
    this.router.navigate(['/id-card']);
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
