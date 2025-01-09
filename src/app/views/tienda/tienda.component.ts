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
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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
    FormsModule,
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
  categories: string[] = [];
  brands: string[] = [];
   activeFilter: string = '';
  appliedFilters: any = {}; // Filtros aplicados
  minPrice: number = 0;
  maxPrice: number = 0;
  searchTerm: string = '';



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

//  loadProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number; brand?: string; search?: string }): void {
//     this.isLoading = true;

//     this.productoService.getProducts(filters || {}).subscribe(
//       (data) => {
//         this.productos = data;
//         this.filteredProductos = [...data];


//         this.categories = [...new Set(data.map((p) => p.category))];
//         this.brands = [...new Set(data.map((p) => p.brand))];

//         this.isLoading = false;
//       },
//       (error) => {
//         console.error('Error al obtener los productos:', error);
//         this.isLoading = false;
//       }
//     );
//   }

loadProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number; brand?: string; search?: string }): void {
  this.isLoading = true;

  this.firestoreService.getCategorias().subscribe((categorias) => {
    const categoryMap = categorias.reduce((map, cat) => {
      map[cat.id] = cat.nombre;
      return map;
    }, {});

    this.productoService.getProducts(filters || {}).subscribe(
      (data) => {
        this.productos = data;
        this.filteredProductos = [...data];

        this.categories = [...new Set(data.map((p) => categoryMap[p.category] || p.category))];
        this.brands = [...new Set(data.map((p) => p.brand))];

        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
        this.isLoading = false;
      }
    );
  });
}


 applyFilter(filterType: string, value: string | number): void {
  if (filterType === 'category') {
    this.appliedFilters['category'] = value;
  } else if (filterType === 'brand') {
    this.appliedFilters['brand'] = value;
  } else if (filterType === 'price') {
    const priceOrder = value as string;
    if (priceOrder === 'low-to-high') {
      // Orden ascendente: De menor a mayor precio
      this.appliedFilters['minPrice'] = 0;
      this.appliedFilters['maxPrice'] = undefined; // Sin límite superior
    } else if (priceOrder === 'high-to-low') {
      // Orden descendente: De mayor a menor precio
      this.appliedFilters['minPrice'] = undefined; // Sin límite inferior
      this.appliedFilters['maxPrice'] = Number.MAX_VALUE;
    }
  } else if (filterType === 'search') {
    this.appliedFilters['search'] = value;
  }

  this.loadProducts(this.appliedFilters); // Recarga productos con los filtros aplicados
}


  clearFilters() {
    this.appliedFilters = {};
    this.searchTerm = '';
    this.loadProducts();
  }
 toggleFilter(filter: string) {
    if (this.activeFilter === filter) {
      this.activeFilter = '';  // Si el filtro ya está activo, lo desactiva
    } else {
      this.activeFilter = filter;  // Si el filtro no está activo, lo activa
    }
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

  categorias$: Observable<any[]>;  // Observable para categorías

  // Método para obtener categorías
  loadCategorias() {
    this.categorias$ = this.firestoreService.getCategorias();
    this.categorias$.subscribe(categorias => {
      console.log('Categorías cargadas:', categorias);
    });
  }










}
