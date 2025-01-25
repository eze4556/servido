import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonFab,
  IonFabList,
  IonFabButton,
  IonFooter,
  IonSegment,
  IonCardHeader,
  IonThumbnail,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonSegmentButton,
  IonChip,
  IonAvatar,
  IonSearchbar,
  IonApp,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonCard,
  IonInput,
  IonSpinner,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg,
  IonCol,
  IonRow,
  IonBackButton,
  IonGrid,
  IonSelect,
  IonSelectOption,

} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../common/modules/ionicons.module';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';

import { UserI } from '../common/models/users.models';
import { CommonModule } from '@angular/common';
import { Producto } from '../common/models/producto.model';
import { Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { Marca } from '../common/models/marca.model';
import { Productoferta } from '../common/models/productofree.model';
import { Categoria } from 'src/app/common/models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../common/services/firestore.service';
import { ProductService } from '../common/services/product.service';

type DropdownSegment = 'categoria' | 'marcas' | 'productos' | 'perfil';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  discountedProducts: Producto[] = [];

  isLoggedIn: boolean = false;
  isLoading: boolean = true;
  location: string = 'Cargando ubicación...';
  currentRoute: string = '';
  recommendedProducts: Producto[] = [];
userId: string | null = null;
  productos: Producto[] = [];



  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private firestoreService: FirestoreService,
    private productService: ProductService,


  ) {   setInterval(() => this.moveSlide(1), 3000);
}

  async ngOnInit() {

    this.loadProducts();



  this.checkLoginStatus();

  if (this.isLoggedIn) {
    this.getLocation();
        this.loadRecommendedProducts(); // Cargar productos recomendados si el usuario está logueado

  }
  // Actualiza la ruta actual cada vez que cambia
  this.router.events.subscribe(() => {
    this.currentRoute = this.router.url.replace('/', '');
  });

  this.loadDiscountedProducts();
  this.loadMarcas();       // Cargar marcas al iniciar
  this.loadCategorias();   // Cargar categorías al iniciar

  }

  checkLoginStatus() {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
              this.userId = user.id; // Asegúrate de que 'id' sea el nombre del campo correspondiente en tu modelo de usuario

        this.getLocation();
              this.loadRecommendedProducts(); // Llamar aquí si ya tienes el userId

      }


    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
      localStorage.removeItem('location');

  }




    marcas$: Observable<any[]>;      // Observable para marcas
  categorias$: Observable<any[]>;
  categorias: any[] = []; // Aquí almacenaremos las categorías

navigateTo(route: string) {
  this.router.navigate([`/${route}`]);
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


images = [

    '../../assets/icon/2.png',
    '../../assets/icon/4enero.png',
    '../../assets/icon/4enero1.png',
    '../../assets/icon/4enero2.png',
  ];


  currentSlide = 0;

  moveSlide(step: number) {
    const totalSlides = this.images.length;
    this.currentSlide += step;

    // Ciclo infinito en el carrusel
    if (this.currentSlide >= totalSlides) this.currentSlide = 0;
    if (this.currentSlide < 0) this.currentSlide = totalSlides - 1;
  }



   // Método para obtener marcas
  loadMarcas() {
    this.marcas$ = this.firestoreService.getMarcas();
    this.marcas$.subscribe(marcas => {
      console.log('Marcas cargadas:', marcas);
    });
  }

  // Método para obtener categorías
  loadCategorias() {
    this.categorias$ = this.firestoreService.getCategorias();
    this.categorias$.subscribe(categorias => {
      console.log('Categorías cargadas:', categorias);
    });
  }


loadRecommendedProducts() {
  if (!this.userId) {
    console.warn('El usuario no está autenticado, no se pueden cargar productos recomendados.');
    return;
  }

  const category = this.categorias.length > 0 ? this.categorias[0].name : null;

  this.productService.getRecommendedProducts(this.userId, { category, limit: 5 })
    .subscribe({
      next: (products) => {
        this.recommendedProducts = products;
        console.log('Productos recomendados:', this.recommendedProducts);
      },
      error: (err) => {
        console.error("Error al cargar productos recomendados:", err);
      }
    });
}

  loadDiscountedProducts(): void {
    console.log("Cargando productos con descuento...");
    this.productService.getDiscountedProducts().subscribe({
      next: (products) => {
        this.discountedProducts = products;
        console.log("Productos con descuento:", this.discountedProducts);
      },
      error: (error) => {
        console.error("Error cargando productos con descuento:", error);
      },
    });
  }


loadProducts(): void {
  this.isLoading = true;
  // console.log('Obteniendo productos del servidor...');
  this.productService.getProducts({}).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        console.warn('No se obtuvieron productos.');
      } else {

      }
      this.productos = data;

      this.isLoading = false;
    },
    (error) => {
      console.error('Error al obtener los productos:', error);
      this.isLoading = false;
    }
  );
}



}
