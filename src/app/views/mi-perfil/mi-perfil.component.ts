import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
  standalone:true,
  imports:[IonHeader,IonToolbar,IonButton,IonButtons,IonBackButton,IonTitle,IonContent,IonAvatar,IonIcon
    ,IonList,IonItem,IonLabel, CommonModule, IonFooter, IoniconsModule
  ]
})
export class MiPerfilComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}


  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
