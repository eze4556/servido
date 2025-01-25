import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    CommonModule,
    IoniconsModule,
    IonButton
  ],
})
export class MiCuentaComponent implements OnInit {
  currentRoute: string = '';
  tipoUsuario: string | null = null; // Almacena el tipo de usuario
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService // Inyecta el AuthService
  ) {}

  ngOnInit() {
    // Actualiza la ruta actual cada vez que cambia
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });

    // Obtén el tipo de usuario desde el localStorage
    this.subscription = this.authService.getCurrentUser().subscribe((user) => {
      this.tipoUsuario = user?.tipo_usuario || null;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpia la suscripción
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
