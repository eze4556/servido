import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonModal, IonInput } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { UserService } from 'src/app/common/services/user.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserI } from 'src/app/common/models/users.models';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButton, IonButtons, IonBackButton, IonTitle, IonContent, IonAvatar, IonIcon,
    IonList, IonItem, IonLabel, CommonModule, IonFooter, IoniconsModule, IonModal, IonInput, FormsModule
  ]
})
export class MiPerfilComponent implements OnInit {
  currentRoute: string = '';
  user: UserI | null = null;
  isEditModalOpen: boolean = false;
  previewImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });

    this.loadUserData();
  }

  loadUserData() {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        if (user) {
          this.user = user;
          this.user.redes_sociales = this.user.redes_sociales || {};
          this.userService.getUserById(user.id).subscribe(
            (data) => {
              this.user = data;
              this.user.redes_sociales = this.user.redes_sociales || {};
              console.log('Datos del usuario cargados:', this.user);
            },
            (error) => {
              console.error('Error cargando datos del usuario:', error);
            }
          );
        } else {
          console.error('No se encontró un usuario autenticado.');
        }
      },
      (error) => {
        console.error('Error obteniendo el usuario actual:', error);
      }
    );
  }

  editProfile() {
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  async saveProfile() {
    if (this.user && this.user.id) {
      if (this.selectedFile) {
        const imageUrl = await this.uploadImage(this.selectedFile);
        if (imageUrl) {
          this.user.imagenPerfilUrl = imageUrl;
        }
      }

      this.userService.updateUser(this.user.id, this.user).subscribe(
        (data) => {
          console.log('Perfil actualizado:', data);
          this.closeEditModal();
        },
        (error) => {
          console.error('Error actualizando perfil:', error);
        }
      );
    } else {
      console.error('No se puede actualizar el perfil: ID de usuario no disponible.');
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewImage = null;
    this.selectedFile = null;
  }

  async uploadImage(file: File): Promise<string | null> {
    const storage = getStorage();
    const storageRef = ref(storage, `perfiles/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return null;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
