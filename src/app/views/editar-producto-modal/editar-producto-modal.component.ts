import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ProductService } from 'src/app/common/services/product.service';
import { CommonModule } from '@angular/common';
import { Producto } from 'src/app/common/models/producto.model';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class EditarProductoModalComponent implements OnInit {
  @Input() productId!: string;
  productForm!: FormGroup;
  discountForm!: FormGroup;
  featureForm!: FormGroup; // Nuevo formulario para características
  features: { label: string; value: string }[] = []; // Lista de características actuales
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.initForms();
    this.loadProductData();
    this.loadProductFeatures(); // Cargar características existentes
  }

  initForms() {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });

    this.discountForm = this.formBuilder.group({
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    });

    this.featureForm = this.formBuilder.group({
      label: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  loadProductData() {
    this.productService.getProductById(this.productId).subscribe((product: Producto) => {
      this.productForm.patchValue(product);
      this.discountForm.patchValue({ discount: product.discount || 0 });
    });
  }


  saveChanges() {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.productForm.value };
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => {
          console.log('Producto actualizado con éxito.');
          this.modalController.dismiss();
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    }
  }

  applyDiscount() {
    if (this.discountForm.valid) {
      const discount = this.discountForm.value.discount;
      const originalPrice = this.productForm.value.price;

      const discountedPrice = originalPrice - (originalPrice * discount) / 100;

      const updatedProduct = {
        ...this.productForm.value,
        discount,
        discountedPrice,
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => {
          console.log('Descuento aplicado con éxito.');
          this.loadProductData(); // Recargar datos
        },
        (error) => {
          console.error('Error al aplicar descuento:', error);
        }
      );
    }
  }

  loadProductFeatures() {
    this.productService.getProductFeatures(this.productId).subscribe(
      (features) => {
        this.features = features;
      },
      (error) => {
        console.error("Error al cargar características:", error);
      }
    );
  }


  addFeature() {
    if (this.featureForm.valid) {
      const feature = { ...this.featureForm.value };
      this.productService.addProductFeature(this.productId, feature).subscribe(
        (response) => {
          console.log('Característica agregada:', response);
          this.features.push(feature); // Actualizar la lista local
          this.featureForm.reset(); // Reiniciar formulario
        },
        (error) => {
          console.error('Error al agregar característica:', error);
        }
      );
    }
  }


  closeModal() {
    this.modalController.dismiss();
  }
}
