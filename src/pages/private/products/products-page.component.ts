import { Component, OnInit } from '@angular/core';
import { HomeFacade } from '@bussiness/home/controllers/home.facade';
import { ProductsMonitorFacade } from '@bussiness/products/controllers/products.monitor.facade';
import { HelperPage } from '@components/common/helper.page';
import { UtilsDomain } from '@globals/utils/utils.domain';

@Component({
  selector: 'app-products-page',
  standalone: false,
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends HelperPage implements OnInit {
  utils = UtilsDomain;

  constructor(public facade: ProductsMonitorFacade, public homeFacade: HomeFacade) {
    super();
  }

  /**
   * UI Events
   */ 

 

  /**
   * Getters
   */ 

  get totalStores() {
    return this.homeFacade.locations.value?.length ?? 0;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.fetchProducts();
  }
}
