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
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UserI } from '../common/models/users.models';
import { CommonModule } from '@angular/common';
import { Producto } from '../common/models/producto.model';
import { Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { Marca } from '../common/models/marca.model';
import { Productoferta } from '../common/models/productofree.model';
import { Categoria } from 'src/app/common/models/categoria.model';


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
  isLoading: boolean = true; // Nueva propiedad para controlar el estado de carga



  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private authService: AuthService

  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  async ngOnInit() {
        this.marcas = await this.firestoreService.getMarcas();

        this.checkLoginStatus();

  }

  checkLoginStatus() {
    this.authService.getUser().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.isLoggedIn = false; // Cambiar el estado de login
  }


navegarAmaq() {
    this.router.navigate(['/MAQUINARIAS']);
  }

login() {
    this.router.navigate(['/login']);
  }



irTienda(){
this.router.navigate(['/tienda'])
}

slideOpts = {
  initialSlide: 0,
  slidesPerView: 1, // Muestra una fila de tarjetas
  spaceBetween: 10, // Ajusta el espacio entre las tarjetas
};

  marcas: Marca[] = [];









}
