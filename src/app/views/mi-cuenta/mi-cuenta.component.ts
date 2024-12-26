import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss'],
  standalone: true,
  imports: [IonHeader,IonToolbar,IonTitle,IonContent,IonFooter,IonList,IonItem,IonIcon,IonLabel,
    CommonModule, IoniconsModule, IonButton
  ]
})
export class MiCuentaComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
