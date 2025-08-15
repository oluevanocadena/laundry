import { Component, OnInit } from '@angular/core';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';

@Component({
  selector: 'products-princing',
  standalone: false,
  templateUrl: './products-princing.component.html',
  styleUrls: ['./products-princing.component.scss'],
})
export class ProductsPrincingComponent implements OnInit {
  constructor(public facade: ProductsDraftFacade) {}

  /**
   * Getters
   */

  get locationPrices() {
    return this.facade.locationPrices;
  }

  get samePrice() {
    return this.facade.samePrice.value;
  }

  ngOnInit() {}
}
