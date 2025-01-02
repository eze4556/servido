import { IonContent, IonCard, IonInput,IonTabButton,IonLabel, IonSelect, IonTabBar, IonSegment,IonSegmentButton, IonSearchbar, IonButton,IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSpinner, IonGrid, IonCol, IonRow, IonTabs, IonFooter } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { NavController } from '@ionic/angular';

import { Router } from '@angular/router';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  standalone: true,
  imports: [IonFooter, IonTabs, IonRow, IonCol,    IoniconsModule,
 IonTabButton,IonLabel, IonGrid,IonSelect, IonTabBar, IonSpinner,IonInput, IonSearchbar, IonSegment,IonSegmentButton,IonButton,IonIcon, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class TiendaComponent implements OnInit {
  userId: string;

  constructor(
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }


  getSanitizedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }



  productos = [
    {
      nombre: 'Cubierta Fate Sentiva 195 65 15',
      precioActual: 120000,
      precioAnterior: 150000,
      descuento: 20,
      imagen: '../../../assets/icon/rueda-removebg-preview.png',
    },
    {
      nombre: 'Cubierta Fate Sentiva 195 65 15',
      precioActual: 120000,
      precioAnterior: 150000,
      descuento: 20,
      imagen: '../../../assets/icon/rueda-removebg-preview.png',
    },
    {
      nombre: 'Cubierta Fate Sentiva 195 65 15',
      precioActual: 120000,
      precioAnterior: 150000,
      descuento: 20,
      imagen: '../../../assets/icon/rueda-removebg-preview.png',
    },
    {
      nombre: 'Cubierta Fate Sentiva 195 65 15',
      precioActual: 120000,
      precioAnterior: 150000,
      descuento: 20,
      imagen: '../../../assets/icon/rueda-removebg-preview.png',
    },

  ];
}
