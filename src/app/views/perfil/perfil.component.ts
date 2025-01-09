import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar,IonCardContent,IonCardHeader,IonCardTitle, IonTitle, IonContent, IonLabel, IonList, IonItem, IonCard, IonInput, IonSpinner, IonButtons, IonButton, IonIcon, IonImg, IonCol, IonRow, IonBackButton, IonGrid, IonFooter } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from '../../common/modules/ionicons.module';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';
import { Auth } from '@angular/fire/auth';
import { UserI } from 'src/app/common/models/users.models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
   standalone: true,
  imports: [IonGrid, IonBackButton, IonRow, IonCol, IonImg, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput,
    IonIcon, IonButton, IonButtons, IonSpinner, IonInput, IonCard,
    FormsModule,
    IoniconsModule,
    ReactiveFormsModule,
    CommonModule,
    IonFooter,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
})
export class PerfilComponent  implements OnInit {

  user: UserI | undefined;
  userId: string | null = null;
  currentRoute: string = '';

  constructor(  private firestoreService: FirestoreService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private auth: Auth
 ) { }

 async ngOnInit() {
   // Actualiza la ruta actual cada vez que cambia
   this.router.events.subscribe(() => {
    this.currentRoute = this.router.url.replace('/', '');
  });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
