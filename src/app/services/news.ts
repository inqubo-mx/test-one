import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: 'security' | 'updates' | 'tips' | 'general';
  date: Date;
  author: string;
  readTime: number; // minutos
}

@Injectable({
  providedIn: 'root',
})
export class News {
  private newsSubject: BehaviorSubject<NewsArticle[]>;
  public news$: Observable<NewsArticle[]>;

  constructor() {
    const initialNews = this.getMockNews();
    this.newsSubject = new BehaviorSubject<NewsArticle[]>(initialNews);
    this.news$ = this.newsSubject.asObservable();
  }

  /**
   * Obtiene todas las noticias
   */
  getAllNews(): Observable<NewsArticle[]> {
    return this.news$;
  }

  /**
   * Simula la actualización de noticias (pull to refresh)
   */
  refreshNews(): Observable<NewsArticle[]> {
    // Simular delay de red
    return of(this.getMockNews()).pipe(delay(1000));
  }

  /**
   * Obtiene una noticia por ID
   */
  getNewsById(id: string): NewsArticle | undefined {
    return this.newsSubject.value.find(news => news.id === id);
  }

  /**
   * Filtra noticias por categoría
   */
  getNewsByCategory(category: string): NewsArticle[] {
    return this.newsSubject.value.filter(news => news.category === category);
  }

  /**
   * Genera noticias mock para demostración
   */
  private getMockNews(): NewsArticle[] {
    return [
      {
        id: '1',
        title: 'Nueva actualización de seguridad disponible',
        summary: 'Mejoras en el cifrado de códigos QR y optimización del sistema biométrico.',
        content: 'Nos complace anunciar que hemos lanzado una nueva actualización de seguridad que incluye mejoras significativas en el sistema de cifrado de códigos QR. Ahora los códigos son aún más seguros y resistentes a intentos de falsificación.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
        category: 'security',
        date: new Date('2025-11-04'),
        author: 'Equipo de Seguridad',
        readTime: 3
      },
      {
        id: '2',
        title: 'Consejos para proteger tu identificación digital',
        summary: 'Aprende las mejores prácticas para mantener tu ID digital segura.',
        content: 'La seguridad de tu identificación digital es nuestra prioridad. Aquí te compartimos algunos consejos importantes: 1) Nunca compartas tu código QR por captura de pantalla, 2) Habilita Face ID para mayor seguridad, 3) Cierra sesión en dispositivos compartidos.',
        imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop',
        category: 'tips',
        date: new Date('2025-11-03'),
        author: 'María González',
        readTime: 5
      },
      {
        id: '3',
        title: 'Face ID: La forma más segura de acceder',
        summary: 'Descubre por qué Face ID es el método de autenticación más confiable.',
        content: 'La tecnología Face ID utiliza reconocimiento facial avanzado para garantizar que solo tú puedas acceder a tu identificación digital. Con una tasa de precisión del 99.9%, es prácticamente imposible de engañar.',
        imageUrl: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=400&fit=crop',
        category: 'security',
        date: new Date('2025-11-02'),
        author: 'Carlos Ramírez',
        readTime: 4
      },
      {
        id: '4',
        title: 'Próximas funcionalidades en desarrollo',
        summary: 'Un vistazo a las nuevas características que pronto estarán disponibles.',
        content: 'Estamos trabajando en nuevas funcionalidades emocionantes que llegarán pronto: modo offline, múltiples tarjetas de identificación, compartir credenciales de forma segura, y mucho más.',
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
        category: 'updates',
        date: new Date('2025-11-01'),
        author: 'Equipo de Desarrollo',
        readTime: 3
      },
      {
        id: '5',
        title: '¿Cómo funcionan los códigos QR dinámicos?',
        summary: 'Explicación técnica de la tecnología detrás de tu ID digital.',
        content: 'Los códigos QR de tu identificación digital se renuevan cada 2 minutos utilizando tokens criptográficos únicos. Esto significa que cada código tiene una validez temporal, haciendo imposible su reutilización o falsificación.',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
        category: 'tips',
        date: new Date('2025-10-31'),
        author: 'Ana Martínez',
        readTime: 6
      },
      {
        id: '6',
        title: 'Celebramos 10,000 usuarios activos',
        summary: 'Gracias por confiar en nuestra plataforma de identificación digital.',
        content: '¡Hemos alcanzado un hito importante! Más de 10,000 usuarios confían en Digital ID para sus necesidades de identificación. Agradecemos a toda nuestra comunidad por hacer esto posible.',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
        category: 'general',
        date: new Date('2025-10-30'),
        author: 'Equipo Digital ID',
        readTime: 2
      }
    ];
  }
}
