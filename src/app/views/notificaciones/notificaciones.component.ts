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
import { Component, OnInit,  OnDestroy
} from '@angular/core';
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
export class NotificacionesComponent  implements OnInit, OnDestroy {
  currentRoute: string = '';

  notificaciones: { id: number; titulo: string; descripcion: string; hora: string }[] = [];
  intervalId: any;
constructor(
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}


  ngOnInit() {
     
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });

        this.generarNotificacionesRandom();

  }


  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  generarNotificacionesRandom() {
    this.agregarNotificacion();


    this.intervalId = setInterval(() => {
      this.agregarNotificacion();
    }, 2 * 60 * 60 * 1000);
  }


  agregarNotificacion() {
    const randomTitulo = [
      '¡Aprovecha esta oferta!',
      'Nueva promoción en tienda',
      'Precios Increibles',
      '¡Descuentos especiales hoy!',
      'Tus cubiertas al mejor precio',
    ];
    const randomDescripcion = [
      'Revisa nuestras ofertas imperdibles.',
      'Haz clic aquí para más detalles.',
      '¿Que esperas para comprar?.',
      'Tus neumáticos te lo agradecerán.',
      'Encuentra el mejor precio en nuestra tienda.',
    ];

    const nuevaNotificacion = {
      id: Date.now(),
      titulo: randomTitulo[Math.floor(Math.random() * randomTitulo.length)],
      descripcion: randomDescripcion[Math.floor(Math.random() * randomDescripcion.length)],
  hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    this.notificaciones.unshift(nuevaNotificacion);
  }


  onNotificacionClick() {
    this.navigateTo('tienda');
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
