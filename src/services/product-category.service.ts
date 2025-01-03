import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(public http: HttpService) {}

  getCategory(id: string) {
    return this.http.get<ProductCategory>(`order-categories/${id}`);
  }

  getCategories() {
    return this.http.get<ProductCategory[]>('order-categories');
  }
}

export interface ProductCategory {
  id: string;
  name: string;
}
