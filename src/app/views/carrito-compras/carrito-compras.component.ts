import {
  IonContent,
  IonCard,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonBackButton,
  IonHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonLabel, IonFooter, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Producto } from 'src/app/common/models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';

import { Productoferta } from 'src/app/common/models/productofree.model';
import { CartService } from 'src/app/common/services/cart.service';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss'],
   standalone: true,
  imports: [IonInput, IonFooter,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSpinner,
    IonCol,
    IonRow,
    IonIcon,
    IonGrid,
    IonHeader,
    IonBackButton,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    FormsModule,
    IoniconsModule
  ]
})
export class CarritoComprasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}