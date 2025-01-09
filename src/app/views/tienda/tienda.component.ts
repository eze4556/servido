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
  IonFooter, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/common/services/firestore.service'; // Servicio actualizado
import { Producto } from 'src/app/common/models/producto.model'; // Modelo de producto
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/services/auth.service';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  standalone: true,
  imports: [IonItem,
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
  currentRoute: string = '';

  filteredProductos: Producto[] = []; // Productos filtrados

  categories: string[] = []; // Lista de categorías únicas
  brands: string[] = []; // Lista de marcas únicas
  activeFilter: string = ''; // Filtro activo
  appliedFilters: any = {}; // Filtros aplicados

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private authService: AuthService,
    private productoService: ProductService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadProducts();
    this.checkLoginStatus();
       // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });

    if (this.isLoggedIn) {
      this.getLocation();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  location: string = 'Cargando ubicación...';
  checkLoginStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
        this.getLocation();
      }
    });
  }

  loadProducts(): void {
    this.productoService.getProducts().subscribe(
      (data) => {
        console.log('Productos recibidos:', data);
        this.productos = data;

this.filteredProductos = [...data]; // Copia inicial
        this.categories = [...new Set(data.map((p) => p.category))];
        this.brands = [...new Set(data.map((p) => p.brand))];

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

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

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

  getCityName(lat: number, lon: number) {
    const apiKey = '98b2a3c7dffc490c972b130ea176974d';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response && response.results && response.results.length > 0) {
          const components = response.results[0].components;

          const city =
            components.city ||
            components.town ||
            components.village ||
            'Ciudad no encontrada';
          const country = components.country;

          this.location = `${city}, ${country}`;
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
    this.router.navigate([`/product/${productId}`]);
  }












    toggleFilter(filter: string) {
    this.activeFilter = this.activeFilter === filter ? '' : filter;
  }

  applyFilter(type: string, value: string) {
    this.appliedFilters[type] = value;

    // Lógica para aplicar los filtros
    this.filteredProductos = this.productos.filter((producto) => {
      let matches = true;
      if (this.appliedFilters['category']) {
        matches = matches && producto.category === this.appliedFilters['category'];
      }

      if (this.appliedFilters['price']) {
        if (this.appliedFilters['price'] === 'low-to-high') {
          this.filteredProductos.sort((a, b) => a.price - b.price);
        } else if (this.appliedFilters['price'] === 'high-to-low') {
          this.filteredProductos.sort((a, b) => b.price - a.price);
        }
      }
      return matches;
    });

    this.activeFilter = ''; // Cerrar el dropdown
  }
}
