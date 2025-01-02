import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../common/services/product.service';
import { AlertController,IonContent, IonItem, IonIcon,
  IonButton, IonTitle,  IonToolbar, IonHeader,IonLabel, IonFooter, IonList } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IoniconsModule } from 'src/app/common/modules/ionicons.module';
import { Producto } from 'src/app/common/models/producto.model';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  standalone:true,
  imports: [IonList,  FormsModule,IonItem,IonLabel,
    IonIcon, IonHeader,IonFooter,
    IonToolbar, IonButton, IonTitle, CommonModule,
    IonContent, IoniconsModule,
]
})
export class ProductofertaDetailComponent implements OnInit {
  productData: Producto = {
    title: '',
    category: '',
    price: 0,
    description: '',
    stock: 0,
    variants: [],
    images: [],
  };

  constructor(
    private productService: ProductService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async createProduct() {
    try {
      const response = await this.productService
        .createProduct(this.productData)
        .toPromise();
      await this.showAlert('Success', 'Product created successfully!');
      this.router.navigate(['/tienda']);
    } catch (error) {
      await this.showAlert('Error', 'Failed to create product. Try again.');
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}

