import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-detalles-compra',
  templateUrl: './detalles-compra.component.html',
  styleUrls: ['./detalles-compra.component.scss'],
  standalone:true,
  imports:[IonContent,IonHeader,IonFooter,IonIcon,IonToolbar
    ,IonButtons,IonBackButton,IonTitle,CommonModule, IonLabel,IoniconsModule]
})
export class DetallesCompraComponent  implements OnInit {
  currentRoute: string ='';

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
