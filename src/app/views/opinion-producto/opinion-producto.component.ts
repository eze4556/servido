import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonGrid, IonBackButton, IonRow, IonCol, IonFabButton, IonImg, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonButton, IonButtons, IonFab, IonSpinner, IonCard, IonChip, IonAvatar, IonFabList, IonThumbnail, IonFooter, IonCardHeader, IonApp, IonCardSubtitle, IonSearchbar, IonSegment, IonSegmentButton, IonCardTitle, IonCardContent, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'app-opinion-producto',
  templateUrl: './opinion-producto.component.html',
  styleUrls: ['./opinion-producto.component.scss'],
  standalone: true,
  imports: [
      IonGrid,
      IonBackButton,
      IonRow,
      IonCol,
      IonFabButton,
      IonImg,
      IonList,
      IonLabel,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItem,
      IonInput,
      IonIcon,
      IonButton,
      IonButtons,
      IonFab,
      IonSpinner,
      IonInput,
      IonCard,
      FormsModule,
      IoniconsModule,
      CommonModule,
      IonChip,
      IonAvatar,
      IonFabList,
      IonThumbnail,
      IonFooter,
      IonCardHeader,
      IonApp,
      IonCardSubtitle,
      IonSearchbar,
      IonSegment,
      IonSegmentButton,
      IonCardTitle,
      IonCardContent,
      IonSelect,
      IonSelectOption,

  ]
})
export class OpinionProductoComponent  implements OnInit {
  stars = Array(5).fill(0); // Genera un array de 5 elementos para las estrellas
  rating = 0; // Calificación actual seleccionada
  currentRoute: string = '';
  productId: string = '';
  product: any = null; // Producto actual
  reviews: any[] = []; // Reseñas del producto
  averageRating = 0; // Calificación promedio
  comment = ''; // Comentario ingresado por el usuario

  constructor(   private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {

     // Obtener el ID del producto desde la URL
     this.productId = this.route.snapshot.paramMap.get('id') || '';

     if (this.productId) {
       this.loadProductData();
       this.loadProductReviews();
     }
     // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }

   // Cargar datos del producto
   loadProductData() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
    });
  }

  loadProductReviews() {
    this.productService.getProductReviews(this.productId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.calculateAverageRating();
      },
      error: (err) => {
        if (err.status === 404) {
          this.reviews = [];
          this.averageRating = 0;
        } else {
          console.error('Error al cargar reseñas:', err);
        }
      },
    });
  }


  // Calcular el promedio de calificaciones
  calculateAverageRating() {
    if (this.reviews.length > 0) {
      const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.averageRating = total / this.reviews.length;
    }
  }

  // Establecer la calificación seleccionada
  setRating(rating: number): void {
    this.rating = rating;
  }

  submitReview() {
    if (this.rating > 0 && this.comment.trim()) {
      const userId = 'id_del_usuario'; // Reemplazar con el ID del usuario actual
      const newReview = { userId, rating: this.rating, comment: this.comment };

      this.productService.createProductReview(this.productId, newReview).subscribe(() => {
        this.loadProductReviews(); // Recargar las reseñas
        this.rating = 0; // Resetear la calificación
        this.comment = ''; // Resetear el comentario
      });
    }
  }


  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
