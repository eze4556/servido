import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'app-editar-producto-modal',
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.scss'],
})
export class EditarProductoModalComponent implements OnInit {
  @Input() productId!: string;
  productForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadProductData();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadProductData() {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  }

  saveChanges() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(
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

  closeModal() {
    this.modalController.dismiss();
  }
}
