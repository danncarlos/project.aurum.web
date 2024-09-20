import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UpdateProductCommand } from '../../types/updateProductCommand';
import { closeModalById } from '../../../shared-module/util/modal.util';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EProductCategory } from '../../../shared-module/types/enum/eproductCategory';
import { getEnumKeyByValue } from '../../../shared-module/util/enum.util';
import { CreateProductCommand } from '../../types/createProductCommand';
import { CommonModule } from '@angular/common';
import { Product } from '../../types/product';

const _modalId = 'update_product_modal';
@Component({
  selector: 'app-modal-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-update-product.component.html',
  styleUrl: './modal-update-product.component.scss'
})
export class ModalUpdateProductComponent implements OnChanges {

  @Input() product!: Product;
  @Output() onSubmit: EventEmitter<UpdateProductCommand> = new EventEmitter();
  @Output() onSubmitDelete: EventEmitter<string> = new EventEmitter();

  productFormGroup!: FormGroup;
  isUpdateEnable = false;
  productCategories = [EProductCategory.Accessories, EProductCategory.Clothes, EProductCategory.Others, EProductCategory.Parfum];

  constructor(private fb: FormBuilder) {
    this.productFormGroup = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.maxLength(300)],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.product) return;

    this.#loadProductData();
    this.productFormGroup.disable();
  }

  getItemCategory(category: EProductCategory) {
    return getEnumKeyByValue(EProductCategory, category);
  }

  deleteProduct(productId: string) {
    this.onSubmitDelete.emit(productId);
    this.closeModal();
  }

  updateProduct() {
    this.productFormGroup.markAllAsTouched();

    if (!this.productFormGroup.valid || !this.productFormGroup.dirty) return;

    const formData = this.productFormGroup.value;

    const commmand = {
      id: formData.id,
      name: formData.name,
      price: formData.price,
      category: parseInt(formData.category),
      description: formData.description,
    } as UpdateProductCommand;

    this.onSubmit.emit(commmand);
    this.closeModal();
  }

  #loadProductData() {
    this.productFormGroup.patchValue({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
      description: this.product.description
    });
  }

  enableEdit() {
    this.isUpdateEnable = true;
    this.productFormGroup.enable();
  }

  closeModal() {
    //- fix formData
    this.isUpdateEnable = false;
    this.#loadProductData();
    this.productFormGroup.disable();

    closeModalById(_modalId);
  }
}
