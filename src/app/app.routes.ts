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
  //   {
  //   path: 'perfil',
  //   loadComponent: () => import('../app/views/perfil/perfil.component').then((m) => m.PerfilComponent),
  // },
  {
    path: 'elección',
    loadComponent: () => import('./views/marca/marca.component').then((m) => m.MarcaComponent),
  },
   {
    path: 'detalle',
    loadComponent: () => import('./views/detalle/detalle.component').then((m) => m.DetalleComponent),
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
    path: 'compras',
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
