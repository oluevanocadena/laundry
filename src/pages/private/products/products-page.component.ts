import { Component, OnInit } from '@angular/core';
import { ProductsMonitorFacade } from '@bussiness/products/controllers/products.monitor.facade';
import { HelperPage } from '@components/common/helper.page';
import { UtilsDomain } from '@utils/utils.domain';

@Component({
  selector: 'app-products-page',
  standalone: false,
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends HelperPage implements OnInit {
  utils = UtilsDomain;

  constructor(public facade: ProductsMonitorFacade) {
    super();
  }

  /**
   * UI Events
   */ 

 

  /**
   * Getters
   */ 
  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.fetchProducts();
  }
}
