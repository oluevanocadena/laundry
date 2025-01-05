import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { Observable } from 'rxjs';

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

  //Fake gets
  getCategoriesFake() {
    return new Observable<ProductCategory[]>((observer) => {
      observer.next([
        {
          id: 1,
          name: 'Laundry',
          icon: 'local_laundry_service',
          visible: true,
        },
        {
          id: 2,
          name: 'Dry Cleaning',
          icon: 'dry_cleaning',
          visible: true,
        },
        {
          id: 3,
          name: 'Ironing',
          icon: 'iron',
          visible: true,
        },
        {
          id: 4,
          name: 'Others',
          icon: 'note_stack',
          visible: true,
        },
        {
          id: 5,
          name: 'Delivery',
          icon: 'truck',
          visible: false,
        },
      ]);
    });
  }
}

export interface ProductCategory {
  id: number;
  name: 'Laundry' | 'Dry Cleaning' | 'Ironing' | 'Others' | 'Delivery';
  icon: 'local_laundry_service' | 'dry_cleaning' | 'iron' | 'note_stack' | 'truck';
  visible: boolean;
}


export enum ProductCategoryEnum {
  Laundry = 1,
  DryCleaning = 2,
  Ironing = 3,
  Others = 4,
}