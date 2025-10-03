import { Injectable } from '@angular/core';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';
import { IProductsRepository } from '@bussiness/products/repository/products.repository';
import { SessionService } from '@bussiness/session/services/session.service';
import { FacadeBase } from '@globals/types/facade.base';

@Injectable({
  providedIn: 'root',
})
export class PosFacade extends FacadeBase {
  tabIndex = 0;

  constructor(
    public repoProducts: IProductsRepository,
    public repoCategories: IProductCategoriesRepository,
    public sessionService: SessionService,
  ) {
    super(repoProducts);
  }

  override initialize() {
    super.initialize();
    this.repoCategories.getAll();
  }

  bindEvents() {
    // TODO: Implement bindEvents
  }

  clearState() {
    // TODO: Implement clearState
  }

  submitForm() {
    // TODO: Implement submitForm
  }

  /**
   * Events
   */

  onTabIndexChange(index: number) {
    const locationId = this.sessionService.locationId;
    const productCategories = this.repoCategories.productCategories.value?.data;
    const productCategoryId = productCategories?.[index]?.id?.toString();
    this.repoProducts.search('', 1, 10, locationId, productCategoryId === '0' ? undefined : productCategoryId);
  }
}
