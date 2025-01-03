import {
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonFooter,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/common/services/firestore.service'; // Servicio actualizado
import { Producto } from 'src/app/common/models/producto.model'; // Modelo de producto

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonRow,
    IonCol,
    IoniconsModule,
    IonLabel,
    IonGrid,
    IonInput,
    IonButton,
    IonIcon,
    IonToolbar,
    IonHeader,
    CommonModule,
    IonContent,
  ],
})
export class TiendaComponent implements OnInit {
  userId: string;
  productos: Producto[] = []; // Productos cargados desde el servicio
  isLoading = true; // Indicador de carga

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private firestoreService: FirestoreService // Servicio actualizado
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadProducts(); // Cargar productos desde el servicio
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  loadProducts(): void {
    this.firestoreService.getProductos().subscribe(
      (data) => {
        console.log('Productos recibidos:', data); // Verificar los datos en la consola
        this.productos = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
        this.isLoading = false;
      }
    );
  }

  getSanitizedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
