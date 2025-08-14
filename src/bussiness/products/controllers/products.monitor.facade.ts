import { Injectable } from '@angular/core';
import { FacadeBase } from '../../../types/facade.base';

import { Router } from '@angular/router';
import { routes } from '../../../app/routes';
import { ProductsApiService } from '../products.api.service';
import { Product } from '../products.interfaces';
import { ProductsDraftFacade } from './products.draft.facade';

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
    this.api.getProducts();
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
