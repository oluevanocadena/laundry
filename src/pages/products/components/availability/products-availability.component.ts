import { Component, OnInit } from '@angular/core';
import { ProductsDraftFacade } from '../../../../bussiness/products/controllers/products.draft.facade';

@Component({
  selector: 'products-availability',
  standalone: false,
  templateUrl: './products-availability.component.html',
  styleUrls: ['./products-availability.component.scss'],
})
export class ProductsAvailabilityComponent implements OnInit {
  constructor(public facade: ProductsDraftFacade) {}

  /**
   * Getters
   */

  get locations() {
    return this.facade.locationApi.locations.value || [];
  }

  ngOnInit() {}
}
