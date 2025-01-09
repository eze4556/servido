import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonGrid, IonBackButton, IonRow, IonCol, IonFabButton, IonImg, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonButton, IonButtons, IonFab, IonSpinner, IonCard, IonChip, IonAvatar, IonFabList, IonThumbnail, IonFooter, IonCardHeader, IonApp, IonCardSubtitle, IonSearchbar, IonSegment, IonSegmentButton, IonCardTitle, IonCardContent, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

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

  constructor(   private router: Router,) {}

  ngOnInit() {
     // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }

  setRating(rating: number): void {
    this.rating = rating; // Establece la calificación según el índice de la estrella seleccionada
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
