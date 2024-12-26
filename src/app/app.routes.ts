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
    path: 'perfil',
    loadComponent: () => import('../app/views/perfil/perfil.component').then((m) => m.PerfilComponent),
  },
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
    loadComponent: () => import('./views/oferta/oferta.component').then((m) => m.ProductofertaDetailComponent),
  },

  {
    path: 'register',
    loadComponent: () => import('./views/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'productos-marca/:id',
    loadComponent: () => import('./views/productos-marca/productos-marca.component').then((m) => m.ProductosMarcaComponent),
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
