import { Injectable } from '@angular/core';
import { FacadeBase } from '../../../types/facade.base';

import { ProductsApiService } from '../products.api.service';
import { ProductsDraftFacade } from './products.draft.facade';
import { Product } from '../products.interfaces';
import { routes } from '../../../app/routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsMonitorFacade extends FacadeBase {
  //Arrays
  segments = ['Todos', 'Activos', 'Inactivos'];

  constructor(
    public router: Router,
    public api: ProductsApiService,
    public draftFacade: ProductsDraftFacade
  ) {
    super(api);
  }

  initialize() {}

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Api
   */
  fetchProducts() {
    this.api.getProducts();
  }

  /**
   * UI Events
   */

  onSegmentChange(value: string | number) {
    this.fetchProducts();
  }

  onNewProductClick() {
    this.draftFacade.selectedProduct.value = null;
    this.router.navigate([routes.ProductDraft]);
  }

  onProductClick(product: Product) {
    this.draftFacade.selectedProduct.value = product;
    this.router.navigate([routes.ProductDraft]);
  }
}
