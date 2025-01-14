import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { Observable } from 'rxjs';
import { ServiceService } from '../../common/services/services.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { Servicio } from 'src/app/common/models/services.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios-publicados',
  templateUrl: './servicios-publicados.component.html',
  styleUrls: ['./servicios-publicados.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, IoniconsModule],
})
export class ServiciosPublicadosComponent implements OnInit {
  servicios$: Observable<Servicio[]> | null = null;
  userId: string | null = null;
  currentRoute: string = '';

  constructor(
    private serviceService: ServiceService,
    private authService: AuthService,
    private modalController: ModalController,
    private router:Router,

  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user?.id) {
        this.userId = user.id;
        this.loadServicios(this.userId);
      }
    });
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }

  loadServicios(userId: string) {
    this.servicios$ = this.serviceService.getServicesByUserId(userId);
  }

  eliminarServicio(serviceId: string) {
    this.serviceService.deleteService(serviceId).subscribe(
      () => {
        console.log('Servicio eliminado con éxito.');
        this.loadServicios(this.userId!);
      },
      (error) => {
        console.error('Error al eliminar servicio:', error);
      }
    );
  }

  async editarServicio(serviceId: string) {
    const modal = await this.modalController.create({
      component: null, // Cambia esto al componente modal que usarás para editar servicios
      componentProps: { serviceId },
    });
    modal.onDidDismiss().then(() => this.loadServicios(this.userId!));
    await modal.present();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
