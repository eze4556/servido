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
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/services/auth.service';


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
  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  constructor(
    private sanitizer: DomSanitizer,
        private http: HttpClient,
    private authService: AuthService,

    private router: Router,
    private firestoreService: FirestoreService // Servicio actualizado
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadProducts(); // Cargar productos desde el servicio
    this.checkLoginStatus();

  if (this.isLoggedIn) {
    this.getLocation();
  }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

    location: string = 'Cargando ubicación...'; // Inicializa con mensaje
checkLoginStatus() {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
        this.getLocation();
      }


    });
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





  // Obtener ubicación y luego la ciudad
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Llama a la función para obtener la ciudad
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

  // Obtener la ciudad a partir de las coordenadas
  getCityName(lat: number, lon: number) {
    const apiKey = '98b2a3c7dffc490c972b130ea176974d';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.results && response.results.length > 0) {
          const components = response.results[0].components;

          // Busca el nombre de la ciudad
          const city = components.city || components.town || components.village || 'Ciudad no encontrada';
          const country = components.country;

          this.location = `${city}, ${country}`; // Mostrar ciudad y país
        } else {
          this.location = 'Ciudad no encontrada.';
        }
      },
      (error) => {
        console.error('Error al obtener ciudad:', error);
        this.location = 'Error al cargar ciudad.';
      }
    );
  }

navigateToProduct(productId: string) {
  this.router.navigate([`/product/${productId}`]); // Navegar a la ruta dinámica
}



}
