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

    isLoggedIn: boolean = false;
  isLoading: boolean = true;
  location: string = 'Cargando ubicación...'; // Inicializa con mensaje



  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
        this.checkLoginStatus();

  if (this.isLoggedIn) {
    this.getLocation();
  }

  }

  checkLoginStatus() {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
        this.getLocation();
      }


    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
      localStorage.removeItem('location');

  }

slideOpts = {
  initialSlide: 0,
  slidesPerView: 1,
  spaceBetween: 10,
};

  marcas: Marca[] = [];


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



}
