import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MercadoPagoService } from 'src/app/common/services/mercadopago.service';
import { AuthService } from 'src/app/common/services/auth.service'; // Importar AuthService


@Component({
  selector: 'app-subscripciones',
  templateUrl: './subscripciones.component.html',
  styleUrls: ['./subscripciones.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated, // Usar Emulated para encapsulación
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, IoniconsModule],
})
export class SubscripcionesComponent implements OnInit {
  expandedPlan: string | null = null;
  email: { [key: string]: string } = {
    basic: '',
    standard: '',
    premium: '',
  };
  currentRoute: string = '';
  userId: string | null = null; // Variable para almacenar el ID del usuario logeado

  constructor(
    private mercadopagoService: MercadoPagoService,
    private router: Router,
    private authService: AuthService // Inyectar AuthService
  ) {}

  ngOnInit(): void {
    // Obtener usuario logeado al inicializar el componente
    this.authService.getCurrentUser().subscribe((user: any | null) => {
      this.userId = user?.id || null; // Guardar el ID del usuario
    });

    // Actualizar la ruta actual
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }

  toggleDetails(plan: string) {
    this.expandedPlan = this.expandedPlan === plan ? null : plan;
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  subscribe(plan: string) {
    const email = this.email[plan];
    const price = plan === 'basic' ? 100.0 : plan === 'standard' ? 200.0 : 300.0;
    console.log("Precio enviado al backend:", price);

    if (!email) {
      alert('Por favor, ingrese su email.');
      return;
    }

    if (!this.userId) {
      alert('No se pudo obtener el ID del usuario. Inicie sesión nuevamente.');
      return;
    }

    const subscriptionData = { email, userId: this.userId, price, plan }; // Agregar el plan aquí

    this.mercadopagoService.createSubscription(subscriptionData).subscribe({
      next: (response) => {
        if (response.init_point) {
          window.location.href = response.init_point; // Redirigir al checkout
        }
      },
      error: (err) => {
        console.error('Error al crear la suscripción:', err);
        alert('Hubo un error al procesar la suscripción.');
      },
    });
  }
}
