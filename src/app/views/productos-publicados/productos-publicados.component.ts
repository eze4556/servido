import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { map, Observable } from 'rxjs';
import { ProductService } from 'src/app/common/services/product.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { Producto } from 'src/app/common/models/producto.model';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { Router } from '@angular/router';
import { EditarProductoModalComponent } from '../editar-producto-modal/editar-producto-modal.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-productos-publicados',
  standalone: true,
  imports: [CommonModule, IonicModule, IoniconsModule, FormsModule],
  templateUrl: './productos-publicados.component.html',
  styleUrls: ['./productos-publicados.component.scss'],
})
export class ProductosPublicadosComponent implements OnInit {
  productos$: Observable<Producto[]> | null = null;
  productosDesactivados$: Observable<Producto[]> | null = null;
  userId: string | null = null;
  currentRoute: string = '';
  currentTab: string = 'activos';
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user?.id) {
        this.userId = user.id;
        this.loadProductos(this.userId);
      }
    });
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace('/', '');
    });
  }

  // loadProductos(userId: string) {
  //   this.productos$ = this.productService.getProductsByUserId(userId);
  //   this.productosDesactivados$ = this.productService.getInactiveProductsByUserId(userId);
  // }

  eliminarProducto(productId: string) {
    // this.productService.checkProductInOrders(productId).subscribe((isLinked) => {
    //   if (!isLinked) {
    //     this.productService.deleteProduct(productId).subscribe(
    //       () => {
    //         console.log('Producto eliminado con éxito.');
    //         this.loadProductos(this.userId!);
    //       },
    //       (error) => {
    //         console.error('Error al eliminar producto:', error);
    //       }
    //     );
    //   } else {
    //     console.warn('El producto está asociado a una orden y no se puede eliminar.');
    //   }
    // });
  }

  toggleProducto(productId: string, currentStatus: boolean) {
    this.productService.updateProduct(productId, { isActive: !currentStatus }).subscribe(
      () => {
        console.log(`Producto ${currentStatus ? 'desactivado' : 'activado'} con éxito.`);
        this.loadProductos(this.userId!); // Actualizar las listas después de cambiar el estado
      },
      (error) => {
        console.error('Error al actualizar el estado del producto:', error);
      }
    );
  }

  loadProductos(userId: string) {
    this.productos$ = this.productService.getProductsByUserId(userId).pipe(
      map((productos) => productos.filter((producto) => producto.isActive)) // Solo productos activos
    );
    this.productosDesactivados$ = this.productService.getInactiveProductsByUserId(userId).pipe(
      map((productos) => productos.filter((producto) => !producto.isActive)) // Solo productos inactivos
    );
  }


  async editarProducto(productId: string) {
    const modal = await this.modalController.create({
      component: EditarProductoModalComponent,
      componentProps: { productId },
    });
    modal.onDidDismiss().then(() => this.loadProductos(this.userId!));
    await modal.present();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
