import {
  IonItem,
  IonButton,
  IonLabel,
  IonInput,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonList,
  IonCardContent,
  IonToolbar,
  IonTitle,
  IonHeader, IonBackButton,IonFabButton, IonButtons, IonSpinner, IonImg, IonFab, IonModal } from '@ionic/angular/standalone';
import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Marca } from '../../common/models/marca.model';
import { Producto } from 'src/app/common/models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-productos-marca',
  templateUrl: './productos-marca.component.html',
  styleUrls: ['./productos-marca.component.scss'],

 standalone: true,
  imports: [IonModal, IonFabButton, IonImg, IonSpinner, IonButton,IonButtons, IonBackButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonFab,
     IonIcon,
    IonLabel,
    IonContent,
    IonGrid,
    IonFabButton,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonCardContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductosMarcaComponent  implements OnInit {
marcas: Marca[] = [];
  productos: Producto[] = [];
  selectedMarca: Marca | undefined;



  constructor(private firestoreService: FirestoreService, private router: Router,private route: ActivatedRoute) {}

async ngOnInit() {
    const marcaId = this.route.snapshot.paramMap.get('id');
    if (marcaId) {
      this.selectedMarca = await this.firestoreService.getMarcaById(marcaId);
      this.productos = await this.firestoreService.getProductosByMarca(marcaId);
    }
  }

  async loadMarcas() {
    try {
      this.marcas = await this.firestoreService.getMarcas();
    } catch (error) {
      console.error('Error al obtener marcas:', error);
    }
  }

  async loadProductosByMarca(marcaId: string) {
    try {
      this.productos = await this.firestoreService.getProductosByMarca(marcaId);
      this.selectedMarca = this.marcas.find(marca => marca.id === marcaId);
      console.log('Productos obtenidos de la marca:', this.productos);
    } catch (error) {
      console.error('Error al obtener productos por marca:', error);
    }
  }

  onMarcaClick(marcaId: string) {
    this.loadProductosByMarca(marcaId);
  }


  navigateToDetail(product:Producto){
  this.router.navigate(['/product', product.id]);
}
}
