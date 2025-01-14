import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { Servicio } from 'src/app/common/models/services.model';
import { ServiceService } from 'src/app/common/services/services.service';
import { AuthService } from 'src/app/common/services/auth.service';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, IoniconsModule],
})
export class ServicioComponent implements OnInit {

  previewImages: string[] = [];
  selectedFiles: File[] = [];
  currentUserId: string | null = null;

  servicioData: Servicio = {
    id: '',
    images: [],
    title: '',
    category: '',
    price: 0,
    description: '',
    userId: '',
    telefono: 0,
  };
  currentRoute: string = '';

  constructor(
    private serviceService: ServiceService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
       // Actualiza la ruta actual cada vez que cambia
       this.router.events.subscribe(() => {
        this.currentRoute = this.router.url.replace('/', '');
      });

    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserId = user?.id || null;
    });
  }

  async createService() {
    const loading = await this.loadingController.create({
      message: 'Creando servicio...',
      spinner: 'circles',
    });

    try {
      await loading.present();

      if (!this.currentUserId) {
        await this.showAlert('Error', 'No se pudo identificar al usuario actual.');
        return;
      }

      this.servicioData.userId = this.currentUserId;
      await this.uploadImages();

      if (this.servicioData.images.length === 0) {
        await this.showAlert('Error', 'Debes subir al menos una imagen.');
        return;
      }

      // Crear servicio usando ServiceService
      await this.serviceService.createService(this.servicioData).toPromise();
      await this.showAlert('Éxito', '¡Servicio creado exitosamente!');
      this.router.navigate(['/servicios']);
    } catch (error) {
      console.error('Error al crear servicio:', error);
      await this.showAlert(
        'Error',
        'Falló la creación del servicio. Inténtalo nuevamente.'
      );
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

  async onImagesChange(event: any) {
    const files = event.target.files;

    if (this.previewImages.length + files.length > 6) {
      alert('Has alcanzado el límite de 6 imágenes por servicio.');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.previewImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  async uploadImages() {
    const storage = getStorage();
    const uploadedUrls: string[] = [];

    for (let file of this.selectedFiles) {
      const storageRef = ref(storage, `servicios/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadURL);
      } catch (error) {
        console.error('Error al subir imagen:', error);
      }
    }

    this.servicioData.images = uploadedUrls;
  }


  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }


}
