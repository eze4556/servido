import {
  IonItem,
  IonButton,
  IonLabel,
  IonInput,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonList,
  IonCardContent,
  IonToolbar,
  IonTitle,
  IonThumbnail,
  IonHeader, IonBackButton,IonFabButton, IonButtons, IonSpinner, IonImg, IonFab, IonModal,
  IonFooter} from '@ionic/angular/standalone';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Marca } from '../../common/models/marca.model';
import { Producto } from 'src/app/common/models/producto.model';
import { Router } from '@angular/router';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
  standalone: true,
  imports: [IonModal, IonFabButton, IonImg, IonSpinner, IonButton,IonButtons, IonBackButton,
    IonHeader,
    IonTitle,
    IonFooter,
    IonToolbar,
    IonItem,
    IonInput,
    IonThumbnail,
    IonFab,
     IonIcon,
    IonLabel,
    IonContent,
    IonGrid,
    IonFabButton,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonCardContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
        IoniconsModule

  ],
})
export class MarcaComponent implements OnInit {
  currentRoute: string = '';



  constructor(private router: Router) {}

 // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
 async ngOnInit() {
   // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }



  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }



}
