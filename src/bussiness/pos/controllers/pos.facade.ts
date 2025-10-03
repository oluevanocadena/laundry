import { Injectable } from '@angular/core';
import { IProductCategoriesRepository } from '@bussiness/product-categories/repository/product.categories.repository';
import { FacadeBase } from '@globals/types/facade.base';

@Injectable({
  providedIn: 'root',
})
export class PosFacade extends FacadeBase {
  tabIndex = 0;

  constructor(public repo: IProductCategoriesRepository, public repoCategories: IProductCategoriesRepository) {
    super(repo);
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
    this.tabIndex = index;
  }
}
