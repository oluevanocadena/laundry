import { Component, OnInit } from '@angular/core';
import { ProductsMonitorFacade } from '@bussiness/products/controllers/products.monitor.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-products-page',
  standalone: false,
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent extends HelperPage implements OnInit {


  constructor(public facade: ProductsMonitorFacade) {
    super();
  }

  /**
   * UI Events
   */ 

  onImageError(event: ErrorEvent) {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/no-image.png';
  }

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
