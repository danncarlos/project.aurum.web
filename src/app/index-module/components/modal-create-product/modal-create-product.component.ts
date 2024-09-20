import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { closeModalById } from '../../../shared-module/util/modal.util';
import { EProductCategory } from '../../../shared-module/types/enum/eproductCategory';
import { getEnumKeyByValue } from '../../../shared-module/util/enum.util';
import { CreateProductCommand } from '../../types/createProductCommand';

const _modalId = 'create_product_modal';
@Component({
  selector: 'app-modal-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-create-product.component.html',
  styleUrl: './modal-create-product.component.scss'
})
export class ModalCreateProductComponent {

  productFormGroup!: FormGroup;
  productCategories = [EProductCategory.Accessories, EProductCategory.Clothes, EProductCategory.Others, EProductCategory.Parfum];

  @Output() onSubmit: EventEmitter<CreateProductCommand> = new EventEmitter();


  constructor(private fb: FormBuilder) {
    this.productFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
    });
  }

  getItemCategory(category: EProductCategory) {
    return getEnumKeyByValue(EProductCategory, category);
  }

  createProduct() {
    this.productFormGroup.markAllAsTouched();

    if (!this.productFormGroup.valid) return;

    const formData = this.productFormGroup.value;

    const commmand = {
      name: formData.name,
      price: formData.price,
      category: parseInt(formData.category),
      description: formData.description,
    } as CreateProductCommand;

    this.onSubmit.emit(commmand);
    this.closeModal();
  }

  closeModal() {
    this.productFormGroup.reset();
    closeModalById(_modalId);
  }
}
