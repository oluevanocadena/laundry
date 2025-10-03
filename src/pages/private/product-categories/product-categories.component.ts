import { Component, OnInit } from '@angular/core';

import { ProductCategoriesMonitorFacade } from '@bussiness/product-categories/controllers/product-categories.monitor.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-product-categories-page',
  standalone: false,
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesPageComponent extends HelperPage implements OnInit {
  constructor(public facade: ProductCategoriesMonitorFacade) {
    super();
  }

  /**
   * Getters
   */
 

  get busy() {
    return this.facade.repo.busy.value;
  }

  get columns() {
    return this.facade.columns;
  }

  get rowCount() {
    return this.facade.repo.pagedProductCategories.value?.count ?? 0;
  }

  get data() {
    return this.facade.repo.pagedProductCategories.value?.data ?? [];
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.initialize();
  }
}
