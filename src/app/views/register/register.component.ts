import { IonContent, IonCard, IonCardHeader,IonItem, IonNote, IonLabel, IonInput, IonCardTitle, IonCardContent, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../common/services/auth.service';

import { Router } from '@angular/router';
import { UserI } from 'src/app/common/models/users.models';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonButton,IonNote, FormsModule,IonHeader, IonInput, IonLabel,IonItem, IonToolbar, IonBackButton, IonTitle, IonButtons, CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class RegisterComponent {
     registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario enviado:', this.registerForm.value);
      // Aquí puedes realizar la lógica para enviar los datos al backend
    }
  }
}
