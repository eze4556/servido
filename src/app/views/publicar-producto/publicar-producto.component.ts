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
import { ProductService } from 'src/app/common/services/product.service';

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
  // categories: string[] = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];
  categories: any[] = []; // Cambiar a array dinámico
  brands: any[] = []; // Para las marcas

  previewImages: string[] = []; // Para almacenar las URLs de las imágenes seleccionadas (vista previa)
  selectedFiles: File[] = []; // Para almacenar los archivos seleccionados

  productData: Producto = {
    // id:'',
    title: '',
    category: '',
    price: 0,
    description: '',
    stock: 0,
    // variants: [],
    images: [], // Aquí se almacenarán los enlaces de las imágenes
    brand: '', // Nueva propiedad para la marca
  };

  constructor(
    private firestoreService: FirestoreService,
    private productoService: ProductService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController // Inyectar el LoadingController
  ) {}

  ngOnInit() {
    this.loadCategoriesAndBrands();
  }

  async createProduct() {
    const loading = await this.loadingController.create({
      message: 'Creando producto...',
      spinner: 'circles',
    });

    try {
      await loading.present();

      // Subir imágenes y obtener URLs
      await this.uploadImages(); // Método para manejar carga de imágenes

      if (this.productData.images.length === 0) {
        await this.showAlert('Error', 'Debes subir al menos una imagen.');
        return;
      }

      // Convertir a Promise para esperar el resultado
      await this.productoService.createProduct(this.productData).toPromise();

      // Mostrar éxito y redirigir
      await this.showAlert('Éxito', '¡Producto creado exitosamente!');
      this.router.navigate(['/tienda']);
    } catch (error) {
      console.error('Error al crear producto:', error);
      await this.showAlert('Error', 'Falló la creación del producto. Inténtalo nuevamente.');
    } finally {
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

  // updateVariants(event: any) {
  //   const value = event.target.value;
  //   this.productData.variants = value
  //     ? value.split(',').map((v: string) => v.trim())
  //     : [];
  // }

  async onImagesChange(event: any) {
    const files = event.target.files;

    // Verificar si ya hay 6 imágenes cargadas
    if (this.previewImages.length + files.length > 6) {
      console.warn('Solo se pueden agregar hasta 6 imágenes.');
      alert('Has alcanzado el límite de 6 imágenes por producto.');
      return;
    }

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        // Crear una URL temporal para previsualizar la imagen
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    // Eliminar imagen de las listas
    this.previewImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  async uploadImages() {
    const storage = getStorage();
    const uploadedUrls: string[] = [];

    for (let file of this.selectedFiles) {
      const storageRef = ref(storage, `productos/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadURL);
      } catch (error) {
        console.error('Error al subir imagen:', error);
      }
    }

    this.productData.images = uploadedUrls; // Asignar URLs al producto

    // Log de URLs subidas
    // console.log('URLs de las imágenes subidas:', this.productData.images);
  }
  private loadCategoriesAndBrands() {
    this.firestoreService.getCategorias().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );

    this.firestoreService.getMarcas().subscribe(
      (brands) => {
        this.brands = brands;
      },
      (error) => {
        console.error('Error al cargar las marcas:', error);
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
