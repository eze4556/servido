import { ProductosPublicadosComponent } from './views/productos-publicados/productos-publicados.component';
import { ServiceService } from './common/services/services.service';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

   {
    path: 'login',
    loadComponent: () => import('../app/views/login/login.component').then((m) => m.LoginComponent),
  },
    {
    path: 'servicios',
    loadComponent: () => import('../app/views/servicios/servicios.component').then((m) => m.ServicioComponent),
  },
  {
    path: 'elección',
    loadComponent: () => import('./views/eleccion/eleccion.component').then((m) => m.EleccionComponent),
  },
   {
    path: 'product/:id',
    loadComponent: () => import('./views/detalle/detalle.component').then((m) => m.DetalleComponent),
  },
  {
    path: 'service/:id',
    loadComponent: () => import('./views/detalle-servicios/detalle-servicios.component').then((m) => m.DetalleServiciosComponent),
  },
  {
    path: 'tienda',
    loadComponent: () => import('./views/tienda/tienda.component').then((m) => m.TiendaComponent),
  },
   {
    path: 'publicar',
    loadComponent: () => import('./views/publicar-producto/publicar-producto.component').then((m) => m.PublicarProductoComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./views/register/register.component').then((m) => m.RegisterComponent),
  },
   {
    path: 'notificaciones',
    loadComponent: () => import('./views/notificaciones/notificaciones.component').then((m) => m.NotificacionesComponent),
  },
  {
    path: 'mis-compras',
    loadComponent: () => import('./views/carrito/carrito.component').then((m) => m.CarritoComponent),
  },
   {
    path: 'carrito',
    loadComponent: () => import('./views/carrito-compras/carrito-compras.component').then((m) => m.CarritoComprasComponent),
  },
  {
    path: 'opinion',
    loadComponent: () => import('./views/opinion-producto/opinion-producto.component').then((m) => m.OpinionProductoComponent),
  },
  {
    path: 'estado-compra',
    loadComponent: () => import('./views/estado-compra/estado-compra.component').then((m) => m.EstadoCompraComponent),
  },
  {
    path: 'detalles-compra',
    loadComponent: () => import('./views/detalles-compra/detalles-compra.component').then((m) => m.DetallesCompraComponent),
  },
  {
    path: 'mi-perfil',
    loadComponent: () => import('../app/views/mi-perfil/mi-perfil.component').then((m) => m.MiPerfilComponent),
  },
  {
    path: 'mi-cuenta',
    loadComponent: () => import('../app/views/mi-cuenta/mi-cuenta.component').then((m) => m.MiCuentaComponent),
  },

  {
    path: 'mis-productos',
    loadComponent: () => import('../app/views/productos-publicados/productos-publicados.component').then((m) => m.ProductosPublicadosComponent),
  },
  {
    path: 'mis-servicios',
    loadComponent: () => import('../app/views/servicios-publicados/servicios-publicados.component').then((m) => m.ServiciosPublicadosComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
