import { CreateProductCommand } from './../../types/createProductCommand';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { BaseApiResponse } from '../../../shared-module/types/responses/BaseApiResponse';
import { Product } from '../../types/product';
import { UpdateProductCommand } from '../../types/updateProductCommand';
import { EProductCategory } from '../../../shared-module/types/enum/eproductCategory';
import { getEnumKeyByValue } from '../../../shared-module/util/enum.util';
import { productIcons } from '../../../shared-module/util/productIcon.util';
import { openModalById } from '../../../shared-module/util/modal.util';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ModalCreateProductComponent } from "../../components/modal-create-product/modal-create-product.component";
import { AlertComponent } from "../../../shared-module/components/alert/alert.component";
import { ModalUpdateProductComponent } from "../../components/modal-update-product/modal-update-product.component";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, ModalCreateProductComponent, AlertComponent, ModalUpdateProductComponent],
  providers: [ProductService],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {

  isBusy = false;
  productList!: Product[];
  selectProduct!: Product;
  alertMsg: {
    type: 'success' | 'error';
    msg: string;
  }[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.#listAllProducts();
  }

  getItemIcon(category: EProductCategory) {
    return productIcons.get(category);
  }

  getItemCategory(category: EProductCategory) {
    return getEnumKeyByValue(EProductCategory, category);
  }

  openCreateProductModal() {
    openModalById('create_product_modal');
  }

  openViewProductModal(item: Product) {
    this.selectProduct = item;
    openModalById('update_product_modal');
  }

  openDeleteProductModal(item: Product, event?: Event) {
    if(event) event.stopPropagation();
    this.selectProduct = item;
    openModalById('delete_product_modal');
  }

  onSubmitDeleteProduct(productId: string) {
    this.productService.deleteProductById(productId).subscribe({
      next: (value: BaseApiResponse<any>) => {
        this.#updateAlertsAndNotify({
          type: 'success',
          msg: 'Produto apagado com sucesso'
        });

        this.#listAllProducts();
      },
      error: (err: HttpErrorResponse) => {
        this.#updateAlertsAndNotify({
          type: 'error',
          msg: (err.error.errors as []).join(', ')
        });
      },
    });
  }

  onSubmitCreateProduct(command: CreateProductCommand) {
    this.productService.createProduct(command).subscribe({
      next: (value: BaseApiResponse<any>) => {

        this.#updateAlertsAndNotify({
          type: 'success',
          msg: 'Produto criado com sucesso'
        });

        this.#listAllProducts();
      },
      error: (err) => {
        this.#updateAlertsAndNotify({
          type: 'error',
          msg: (err.error.errors as []).join(', ')
        });
      },
    });
  }

  onSubmitUpdateProduct(command: UpdateProductCommand) {

    this.productService.updateProduct(command).subscribe({
      next: (value: BaseApiResponse<any>) => {

        this.#updateAlertsAndNotify({
          type: 'success',
          msg: 'Produto atualizado com sucesso'
        });
        this.#listAllProducts();
      },
      error: (err) => {
        this.#updateAlertsAndNotify({
          type: 'error',
          msg: (err.error.errors as []).join(', ')
        });
      },
    });

  }

  #listAllProducts() {
    this.isBusy = true;
    this.productService.getAllProducts().subscribe({
      next: (value: BaseApiResponse<Product>) => {
        this.productList = value.data;

        this.isBusy = false;
      },
      error: (err) => {

        this.isBusy = false;
      },
    });
  }

  #updateAlertsAndNotify(alert: any) {
    this.alertMsg.push(alert);

    setTimeout(() => {
      if (this.alertMsg.length == 0) return;
      this.alertMsg.shift();
    }, 3000);
  }

}