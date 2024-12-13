import { IonContent, IonCard, IonInput,IonTabButton,IonLabel, IonSelect, IonTabBar, IonSegment,IonSegmentButton, IonSearchbar, IonButton,IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSpinner, IonGrid, IonCol, IonRow, IonTabs, IonFooter } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.scss'],
  standalone: true,
  imports: [IonFooter, IonTabs, IonRow, IonCol,    IoniconsModule,
 IonTabButton,IonLabel, IonGrid,IonSelect, IonTabBar, IonSpinner,IonInput, IonSearchbar, IonSegment,IonSegmentButton,IonButton,IonIcon, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class FacturacionComponent implements OnInit {
  facturacionDocs$: Observable<any[]>;
  userId: string;

  constructor(
    private firestoreService: FirestoreService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadFacturacion();
  }


  loadFacturacion() {
    const path = `Usuarios/${this.userId}/facturacion`;
    this.facturacionDocs$ = this.firestoreService.getCollectionChanges(path);
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
