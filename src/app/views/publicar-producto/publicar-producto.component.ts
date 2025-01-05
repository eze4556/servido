import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonContent,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonLabel,
  IonFooter,
  LoadingController,
} from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { Producto } from 'src/app/common/models/producto.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-pubicar-producto',
  templateUrl: './publicar-producto.component.html',
  styleUrls: ['./publicar-producto.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonLabel,
    IonIcon,
    IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    CommonModule,
    IonContent,
    IoniconsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicarProductoComponent implements OnInit {
  categories: string[] = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];

  productData: Producto = {
    id:'',
    title: '',
    category: '',
    price: 0,
    description: '',
    stock: 0,
    variants: [],
    images: '', // Aquí se almacenarán los enlaces de las imágenes
  };

  constructor(
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController // Inyectar el LoadingController
  ) {}

  ngOnInit() {}

  async createProduct() {
    const loading = await this.loadingController.create({
      message: 'Creando producto...', // Mensaje de carga
      spinner: 'circles', // Estilo del spinner
    });

    try {
      // Mostrar el indicador de carga
      await loading.present();

      // Crear producto usando el nuevo método
      await this.firestoreService.addProduct(this.productData);

      await this.showAlert('Éxito', '¡Producto creado exitosamente!');
      this.router.navigate(['/tienda']);
    } catch (error) {
      await this.showAlert(
        'Error',
        'Falló la creación del producto. Inténtalo nuevamente.'
      );
    } finally {
      // Ocultar el indicador de carga
      await loading.dismiss();
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  updateVariants(event: any) {
    const value = event.target.value;
    this.productData.variants = value
      ? value.split(',').map((v: string) => v.trim())
      : [];
  }

  async onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const storage = getStorage(); // Inicializa Firebase Storage
      const storageRef = ref(storage, `productos/${file.name}`); // Ruta en Firebase Storage

      try {
        // Subir archivo a Firebase Storage
        await uploadBytes(storageRef, file);

        // Obtener URL de descarga
        const downloadURL = await getDownloadURL(storageRef);
        this.productData.images = downloadURL; // Asignar enlace al array de imágenes
      } catch (error) {
        await this.showAlert(
          'Error',
          'Falló la carga de la imagen. Inténtalo nuevamente.'
        );
      }
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
