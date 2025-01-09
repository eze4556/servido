import {
  IonContent,
  IonCard,
  IonIcon,
  IonCardContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonLabel, IonFooter} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Producto } from 'src/app/common/models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
   standalone: true,
  imports: [ IonFooter,
    IonLabel,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent,
    FormsModule,
    IoniconsModule
  ]
})
export class NotificacionesComponent  implements OnInit {
  currentRoute: string = '';

constructor(
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
       // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }


  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
