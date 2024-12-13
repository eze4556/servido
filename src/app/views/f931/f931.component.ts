import { Component, OnInit ,NO_ERRORS_SCHEMA } from '@angular/core';
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
  selector: 'app-f931',
  templateUrl: './f931.component.html',
  styleUrls: ['./f931.component.scss'],
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
export class F931Component implements OnInit {


  constructor(
private router: Router,
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {

  }


 onSegmentChange(event: any) {
    console.log('Opción seleccionada:', event.detail.value);
  }


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
    this.deltaX = 0; // Reinicia el desplazamiento
  }

  onTouchMove(event: TouchEvent) {
    this.deltaX = event.touches[0].clientX - this.startX;
  }

  onTouchEnd() {
    const threshold = 50; // Distancia mínima para considerar un deslizamiento válido
    if (this.deltaX > threshold && this.currentIndex > 0) {
      // Deslizar hacia la derecha
      this.currentIndex--;
    } else if (this.deltaX < -threshold && this.currentIndex < this.slides.length - 1) {
      // Deslizar hacia la izquierda
      this.currentIndex++;
    }
  }



 // Función para navegar a la tienda usando navigateByUrl
  goToTienda() {
    this.router.navigateByUrl('/tienda');
  }

  // Función para navegar a la página de inicio usando navigateByUrl
  goToHome() {
    this.router.navigateByUrl('home');
  }

}
