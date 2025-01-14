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
import { ServiceService } from 'src/app/common/services/services.service';

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
  servicios: any[] = []; // Array para almacenar los servicios
  isViewingProducts: boolean = true; // Estado para alternar entre productos y servicios

  filteredItems: any[] = []; // Items filtrados (pueden ser productos o servicios)
   filteredProductos: Producto[] = []; // Productos filtrados
  categories: { id: string; nombre: string }[] = []; // Categorías con nombre e ID
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
    private firestoreService: FirestoreService,
    private serviceService: ServiceService,
  ) {}

  ngOnInit() {

    this.loadCategorias();
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


  toggleView(): void {
    this.isViewingProducts = !this.isViewingProducts;

    if (this.isViewingProducts) {
      this.loadProducts(); // Mostrar productos
    } else {
      this.loadServices(); // Mostrar servicios
    }
  }


  loadServices(): void {
    this.isLoading = true;
    // console.log('Obteniendo servicios del servidor...');
    this.serviceService.getServices({}).subscribe(
      (data) => {
        if (!data || data.length === 0) {
          console.warn('No se obtuvieron servicios.');
        } else {
          // console.log('Servicios obtenidos:', data);
        }
        this.servicios = data;
        this.filteredItems = [...data]; // Mostrar servicios
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
        this.isLoading = false;
      }
    );
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

loadProducts(): void {
  this.isLoading = true;
  // console.log('Obteniendo productos del servidor...');
  this.productoService.getProducts({}).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        console.warn('No se obtuvieron productos.');
      } else {
        // console.log('Productos obtenidos:', data);
      }
      this.productos = data;
      this.filteredItems = [...data]; // Inicialmente, no se aplican filtros
      this.isLoading = false;
    },
    (error) => {
      console.error('Error al obtener los productos:', error);
      this.isLoading = false;
    }
  );
}
 // Manejar la selección de filtros
setFilter(filterType: string, value: string | number | number[]): void {
  if (filterType === 'category') {
    this.appliedFilters.category = value;
  } else if (filterType === 'brand') {
    this.appliedFilters.brand = value;
  } else if (filterType === 'priceRange' && Array.isArray(value)) {
    const [min, max] = value; // Extraer el rango de precios
    this.appliedFilters.minPrice = min;
    this.appliedFilters.maxPrice = max;
  } else if (filterType === 'search') {
    this.appliedFilters.search = value;
  }

  this.applyFilters(); // Aplicar filtros con la nueva configuración
}

applyFilters(): void {
  if (this.isViewingProducts) {
    this.filteredItems = this.productos.filter((item) => {
      const matchesCategory =
        !this.appliedFilters.category || item.category === this.appliedFilters.category;

      const matchesBrand =
        !this.appliedFilters.brand || item.brand === this.appliedFilters.brand;

      const matchesPrice =
        (!this.appliedFilters.minPrice || item.price >= this.appliedFilters.minPrice) &&
        (!this.appliedFilters.maxPrice || item.price <= this.appliedFilters.maxPrice);

      const matchesSearch =
        !this.appliedFilters.search ||
        item.title.toLowerCase().includes((this.appliedFilters.search as string).toLowerCase());

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
    });
  } else {
    this.filteredItems = this.servicios.filter((item) => {
      const matchesCategory =
        !this.appliedFilters.category || item.category === this.appliedFilters.category;

      const matchesBrand =
        !this.appliedFilters.brand || item.brand === this.appliedFilters.brand;

      const matchesPrice =
        (!this.appliedFilters.minPrice || item.price >= this.appliedFilters.minPrice) &&
        (!this.appliedFilters.maxPrice || item.price <= this.appliedFilters.maxPrice);

      const matchesSearch =
        !this.appliedFilters.search ||
        item.title.toLowerCase().includes((this.appliedFilters.search as string).toLowerCase());

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
    });
  }
}


  // Limpiar filtros
  clearFilters(): void {
    this.appliedFilters = {};
    this.filteredProductos = [...this.productos]; // Restaurar los productos originales
  }

 toggleFilter(filter: string) {
    if (this.activeFilter === filter) {
      this.activeFilter = '';
    } else {
      this.activeFilter = filter;
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

  navigateToService(serviceId: string) {
    this.router.navigate([`/service/${serviceId}`]);
  }


  categorias$: Observable<any[]>;  // Observable para categorías

  // Carga las categorías con nombres
  loadCategorias() {
    this.firestoreService.getCategorias().subscribe((categorias) => {
      this.categories = categorias.map((cat) => ({
        id: cat.id,
        nombre: cat.nombre,
      }));
    });
  }
}
