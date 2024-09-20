import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse } from '../../shared-module/types/responses/BaseApiResponse';
import { environment } from '../../../environments/environment.development';
import { Product } from '../types/product';
import { CreateProductCommand } from '../types/createProductCommand';
import { UpdateProductCommand } from '../types/updateProductCommand';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseApiUrl}Products/GetAllProducts`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`${environment.baseApiUrl}Products/${productId}`);
  }

  createProduct(command: CreateProductCommand): Observable<any> {
    return this.http.post(`${environment.baseApiUrl}Products/`, JSON.stringify(command));
  }

  updateProduct(command: UpdateProductCommand): Observable<any> { 
    return this.http.put(`${environment.baseApiUrl}Products/${command.id}`, JSON.stringify(command));
  }

  deleteProductById(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseApiUrl}Products/${productId}`);
  }

}
