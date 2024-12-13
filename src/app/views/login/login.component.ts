import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonCardHeader, IonCardContent,IonCardTitle, IonContent, IonLabel, IonList, IonItem, IonCard, IonInput, IonSpinner, IonButtons, IonButton, IonIcon, IonImg, IonCol, IonRow, IonBackButton, IonGrid } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../../common/modules/ionicons.module';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/common/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonGrid, IonBackButton, IonCardHeader, IonCardTitle, IonRow, IonCol, IonImg, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput,
    IonIcon, IonButton, IonButtons, IonSpinner, IonInput, IonCard,
    FormsModule,
    IoniconsModule,
    ReactiveFormsModule, IonCardContent,
  ],
})
export class LoginComponent  {

 email: string = '';
  password: string = '';

constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private authService: AuthService

  ) {}



login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        const user = this.authService.getUser();  // Obtener el usuario
        console.log('Usuario logueado:', user);   // Mostrar información del usuario en consola
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.mostrarAlertaError(error.message);
      });
  }


navigateToRegister() {
    this.router.navigate(['/register']);
  }

navigateHome() {
    this.router.navigate(['/home']);
  }



  // Función para mostrar una alerta de error
  async mostrarAlertaError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para mostrar una alerta de éxito
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


async loginWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      const user = this.authService.getUser();  // Obtener el usuario
      console.log('Usuario logueado con Google:', user);  // Mostrar información del usuario en consola
      this.router.navigate(['/home']);
    } catch (error) {
      this.mostrarAlertaError('Error al iniciar sesión con Google. Intenta nuevamente.');
    }
  }







  // async loginWithGoogle() {
  //   try {
  //     const userCredential = await this.authService.signInWithGoogle();
  //     const user = await this.firestoreService.getUserByEmail(userCredential.user.email);

  //     this.redirectUser(user);

  //     await this.showAlert('Éxito', 'Inicio de sesión con Google exitoso');
  //   } catch (error) {
  //     const alert = await this.alertController.create({
  //       header: 'Error',
  //       message: 'Credenciales incorrectas',
  //       buttons: ['OK']
  //     });
  //     await alert.present();
  //   }
  // }


}





