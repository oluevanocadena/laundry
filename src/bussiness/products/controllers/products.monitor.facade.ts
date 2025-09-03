import { Injectable } from '@angular/core';
import { FacadeBase } from '../../../globals/types/facade.base';

import { Router } from '@angular/router';
import { routes } from '@app/routes';

import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { ProductsApiService } from '@bussiness/products/products.api.service';
import { Product } from '@bussiness/products/products.interfaces';

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

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Api
   */
  fetchProducts() {
    this.api.getProducts('', 1, 50);
  }

  /**
   * UI Events
   */

  onSegmentChange(value: string | number) {
    this.fetchProducts();
  }

  onNewProductClick() {
    this.draftFacade.clearState();
    this.router.navigate([routes.ProductDraft]);
  }

  onProductClick(product: Product) {
    this.draftFacade.product.value = product;
    this.router.navigate([routes.ProductDraft]);
  }
}
