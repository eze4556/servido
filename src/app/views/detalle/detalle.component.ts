import { Component, OnInit ,NO_ERRORS_SCHEMA, ViewEncapsulation } from '@angular/core';
import {
  IonHeader,
  IonToolbar,

  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonCard,
  IonInput,
  IonSpinner,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg,
  IonCol,
  IonRow,
  IonBackButton,
  IonGrid,
  IonRouterLink,

  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
IonFab,
IonFabButton,
  IonSelectOption,
  IonSegment,
  IonBadge, IonSegmentButton, IonChip } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../../common/modules/ionicons.module';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as bcrypt from 'bcryptjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Producto } from 'src/app/common/models/producto.model';
import { CartService } from 'src/app/common/services/cart.service';

import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IonChip, IonSegmentButton,

    IonGrid,
    IonBackButton,
IonSegment,
IonFooter,
IonFab,
IonFabButton,
    IonSelect,
    IonSelectOption,
    IonRow,
    IonCol,
      IonTabs,
  IonTabBar,
  IonTabButton,
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
    IonSpinner,
    IonInput,
    IonCard,
    FormsModule,
    IoniconsModule,
    ReactiveFormsModule,
    CommonModule,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    PdfViewerModule,
    IonBadge,
    IoniconsModule,
    RouterModule,

  ],
})
export class DetalleComponent implements OnInit {
  // Segmento seleccionado por defecto
  selectedSegment: string = 'product-details';


  constructor(
private router: Router,
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {

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
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
}

// Ejemplo de datos actualizados
opinions = [
  { user: 'Juan Pérez', rating: 5, comment: '¡Excelente producto! Llegó en perfecto estado.', date: '2024-12-11' },
  { user: 'María López', rating: 4, comment: 'Muy buen producto, recomendable.', date: '2024-12-07' },
  { user: 'Carlos Gómez', rating: 4, comment: 'Como siempre. Excelente calidad.', date: '2024-12-07' }
];

// Ejemplo de datos FAQ
faqs = [
  { question: '¿Cuál es el tiempo de envío?', answer: 'El tiempo de envío estimado es de 3-5 días hábiles.' },
  { question: '¿Puedo devolver el producto?', answer: 'Sí, puedes devolverlo dentro de los primeros 15 días.' },
  { question: '¿Qué garantía tiene?', answer: 'El producto tiene garantía de 6 meses contra defectos de fábrica.' }
];

  slides = [
    {
      image: '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 1',
    },
    {
      image: '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 2',
    },
    {
      image: '../../../assets/icon/istockphoto-95757561-612x612-removebg-preview.png',
      alt: 'Cubierta 3',
    },
  ];

 currentIndex = 0;

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
    } else if (this.deltaX < -threshold && this.currentIndex < this.slides.length - 1) {

      this.currentIndex++;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
