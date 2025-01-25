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
import { CeilPipe } from 'src/app/common/pipe/ceil.pipe';
import { ProductService } from 'src/app/common/services/product.service';
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
    CeilPipe
  ],
})
export class DetalleComponent implements OnInit {
  // Segmento seleccionado por defecto
  selectedSegment: string = 'product-details';
  product$: Observable<Producto | undefined>; // Producto dinámico
  currentIndex = 0;
  currentRoute: string = '';
  features: any[] = []; // Características del producto
  productId: string | null = null; // Declarar como propiedad de clase
  opinions: any[] = [];
  averageRating: number | null = null;

  faqs: any[] = []; // Lista de preguntas frecuentes
  newQuestion: string = ''; // Nueva pregunta del usuario
  userType: string = ''; // Tipo de usuario (cliente/tienda)
  userId: string = '';
  isLoggedIn: boolean = false;
  isLoading: boolean = true;


  constructor(
        private router: Router,
        public route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private productService: ProductService,
    private authService: AuthService,
        private http: HttpClient,

  ) {}


  async ngOnInit() {


        this.userId = localStorage.getItem('userId');

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.userId = parsedUser.id;
      this.userType = parsedUser.tipo_usuario || ''; // Verificar tipo de usuario
    }

    // Obtener el productId de la URL
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      // Cargar producto
      this.product$ = this.productService.getProductById(this.productId);

      // Cargar características
      this.productService.getProductFeatures(this.productId).subscribe(
        (features) => {
          this.features = features;
        },
        (error) => {
          console.error('Error al cargar características:', error);
        }
      );

      // Cargar opiniones y FAQ
      this.loadOpinions(this.productId);
      this.loadFAQs();
    } else {
      console.error('No se encontró el productId en la URL.');
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



  loadOpinions(productId: string) {
    this.productService.getProductReviews(productId).subscribe({
      next: (opinions) => {
        this.opinions = opinions || []; // Asegúrate de que sea un arreglo
        this.calculateAverageRating();
        this.cdr.detectChanges(); // Forzar detección de cambios si es necesario
      },
      error: (error) => {
        console.error('Error al cargar opiniones:', error);
        this.opinions = [];
        this.calculateAverageRating(); // Asegúrate de manejar el caso de error
      },
    });
  }

 // Cargar preguntas frecuentes
 loadFAQs() {
  this.productService.getProductFAQs(this.productId).subscribe(
    (data) => {
      this.faqs = data;
    },
    (error) => {
      console.error('Error al cargar preguntas frecuentes:', error);
    }
  );
}

 // Agregar una nueva pregunta
  addQuestion() {
    if (!this.newQuestion.trim()) {
      alert('La pregunta no puede estar vacía.');
      return;
    }

    if (!this.productId) {
      alert('No se pudo enviar la pregunta porque no se encontró el ID del producto.');
      return;
    }

    const question = {
      productId: this.productId,
      userId: this.userId,
      text: this.newQuestion,
    };

    this.productService.createProductFAQ(this.productId, question).subscribe(
      (response) => {
        this.faqs.push(response.faq);
        this.newQuestion = '';
        alert('Pregunta agregada exitosamente.');
      },
      (error) => {
        console.error('Error al agregar la pregunta:', error);
      }
    );
  }

  respondToQuestion(faq: any) {
    if (!faq.response.trim()) {
      alert('La respuesta no puede estar vacía.');
      return;
    }

    if (!this.productId) {
      alert('No se encontró el ID del producto.');
      return;
    }

    const answer = faq.response;

    this.productService.updateFaqAnswer(this.productId, faq.id, answer).subscribe(
      (response) => {
        faq.answer = answer; // Actualiza la respuesta localmente
        delete faq.response; // Limpia la propiedad temporal
        alert('Respuesta enviada exitosamente.');
      },
      (error) => {
        console.error('Error al responder la pregunta:', error);
        alert('Ocurrió un error al enviar la respuesta.');
      }
    );
  }



// Generar estrellas dinámicamente para el promedio
getStarsForAverage(): string {
  const filledStars = Math.round(this.averageRating);
  const emptyStars = 5 - filledStars;
  return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
}


calculateAverageRating() {
  if (this.opinions && this.opinions.length > 0) {
    const totalRating = this.opinions.reduce((sum, opinion) => sum + (opinion.rating || 0), 0);
    this.averageRating = totalRating / this.opinions.length;
  } else {
    this.averageRating = 0; // Si no hay opiniones, establece 0
  }
}


  navigateToOpinion(route: string, productId: string | null) {
    if (productId) {
      this.router.navigate([`/${route}`, { id: productId }]);
    } else {
      console.error('No se pudo navegar porque el ID del producto es nulo.');
    }
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
    {
      image:
        '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 3',
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
