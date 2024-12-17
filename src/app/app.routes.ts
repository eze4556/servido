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
    path: 'marca',
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
    path: 'product/:id',
    loadComponent: () => import('./views/detalle-producto/product-detail.component').then((m) => m.ProductDetailComponent),
  },

   {
    path: 'productOferta/:id',
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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
