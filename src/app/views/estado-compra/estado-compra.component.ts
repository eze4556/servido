import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-estado-compra',
  templateUrl: './estado-compra.component.html',
  styleUrls: ['./estado-compra.component.scss'],
  standalone:true,
  imports:[CommonModule,IonHeader,IonToolbar,IonButtons,IonButton,IonBackButton, IonTitle,IonContent,IonCard,IonCol,IonRow,IonCardHeader,IonItem,IonList,
    IonCardTitle,IonLabel, IonFooter,IonIcon, IoniconsModule
  ]
})
export class EstadoCompraComponent  implements OnInit {
  currentRoute: string = '';

  constructor(
    private router: Router
  ) { }

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
