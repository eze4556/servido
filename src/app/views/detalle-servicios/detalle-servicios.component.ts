import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../../common/services/services.service'; // Asegúrate de tener el servicio importado
import { Servicio } from '../../common/models/services.model'; // Asegúrate de tener el modelo definido
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { CeilPipe } from 'src/app/common/pipe/ceil.pipe';

@Component({
  selector: 'app-detalle-servicios',
  templateUrl: './detalle-servicios.component.html',
  styleUrls: ['./detalle-servicios.component.scss'],
  imports:[CommonModule,ReactiveFormsModule,FormsModule,IonicModule,IoniconsModule, CeilPipe],
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Deshabilita la encapsulación
})
export class DetalleServiciosComponent implements OnInit {
  service$: Observable<Servicio | undefined>; // Servicio dinámico
  serviceId: string | null = null; // ID del servicio
  userId: string = ''; // ID del usuario logueado
  currentRoute: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario desde localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.userId = parsedUser.id;
    }

    // Obtener el serviceId de la URL
    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId) {
      // Cargar servicio
      this.service$ = this.serviceService.getServiceById(this.serviceId);
    } else {
      console.error('No se encontró el serviceId en la URL.');
    }
     // Actualiza la ruta actual cada vez que cambia
     this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
    // Forzar detección de cambios si es necesario
    this.cdr.detectChanges();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
