import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonFooter,
  IonSegment,
  IonSegmentButton,
  IonChip,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../../common/modules/ionicons.module';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as bcrypt from 'bcryptjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterModule } from '@angular/router';
import { Producto } from 'src/app/common/models/producto.model';
import { Observable } from 'rxjs/internal/Observable';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { AuthService } from '../../common/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    IonChip,
    IonSegmentButton,
    IonSegment,
    IonFooter,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonIcon,
    IonButton,
    IonInput,
    FormsModule,
    IoniconsModule,
    ReactiveFormsModule,
    CommonModule,
    PdfViewerModule,
    IoniconsModule,
    RouterModule,
  ],
})
export class DetalleComponent implements OnInit {
  // Segmento seleccionado por defecto
  selectedSegment: string = 'product-details';
  product$: Observable<Producto | undefined>; // Producto dinámico
  currentIndex = 0;
  currentRoute: string = '';
  userId: string;
  isLoggedIn: boolean = false;
  isLoading: boolean = true;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private firestoreService: FirestoreService,
    private authService: AuthService,
        private http: HttpClient,

  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {


        this.userId = localStorage.getItem('userId');

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product$ = this.firestoreService.getProductoById(productId);
    }
    // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
    this.cdr.detectChanges(); // Forzar detección de cambios


     if (this.isLoggedIn) {
      this.getLocation();
    }
  }


    location: string = 'Cargando ubicación...';
  checkLoginStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
        this.getLocation();
      }
    });
  }

 getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.getCityName(latitude, longitude);
        },
        (error) => {
          console.error('Error al obtener ubicación:', error.message);
          this.location = 'No se pudo obtener la ubicación.';
        }
      );
    } else {
      this.location = 'Geolocalización no soportada.';
    }
  }

  getCityName(lat: number, lon: number) {
    const apiKey = '98b2a3c7dffc490c972b130ea176974d';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.results && response.results.length > 0) {
          const components = response.results[0].components;

          const city =
            components.city ||
            components.town ||
            components.village ||
            'Ciudad no encontrada';
          const country = components.country;

          this.location = `${city}, ${country}`;
        } else {
          this.location = 'Ciudad no encontrada.';
        }
      },
      (error: any) => {
        console.error('Error al obtener ciudad:', error);
        this.location = 'Error al cargar ciudad.';
      }
    );
  }



  onSegmentChange(event: any) {
    console.log('Opción seleccionada:', event.detail.value);
  }

  // Devuelve el contenido de estrellas llenas en función de la calificación
  getFilledStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // Formatea la fecha (puedes adaptarla según tus necesidades)
  formatDate(date?: string): string {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  // Ejemplo de datos actualizados
  opinions = [
    {
      user: 'Juan Pérez',
      rating: 5,
      comment: '¡Excelente producto! Llegó en perfecto estado.',
      date: '2024-12-11',
    },
    {
      user: 'María López',
      rating: 4,
      comment: 'Muy buen producto, recomendable.',
      date: '2024-12-07',
    },
    {
      user: 'Carlos Gómez',
      rating: 4,
      comment: 'Como siempre. Excelente calidad.',
      date: '2024-12-07',
    },
  ];

  // Ejemplo de datos FAQ
  faqs = [
    {
      question: '¿Cuál es el tiempo de envío?',
      answer: 'El tiempo de envío estimado es de 3-5 días hábiles.',
    },
    {
      question: '¿Puedo devolver el producto?',
      answer: 'Sí, puedes devolverlo dentro de los primeros 15 días.',
    },
    {
      question: '¿Qué garantía tiene?',
      answer:
        'El producto tiene garantía de 6 meses contra defectos de fábrica.',
    },
  ];

  slides = [
    {
      image:
        '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 1',
    },
    {
      image:
        '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 2',
    },
    {
      image:
        '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 3',
    },
  ];

  private startX = 0;
  private deltaX = 0;

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.deltaX = 0;
  }

  onTouchMove(event: TouchEvent) {
    this.deltaX = event.touches[0].clientX - this.startX;
  }

  onTouchEnd() {
    const threshold = 50;
    if (this.deltaX > threshold && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (
      this.deltaX < -threshold &&
      this.currentIndex < this.slides.length - 1
    ) {
      this.currentIndex++;
    }
  }

  // Método para cambiar el índice actual
  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
