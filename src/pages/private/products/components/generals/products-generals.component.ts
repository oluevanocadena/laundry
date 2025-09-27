import { Component, OnInit } from '@angular/core';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';

@Component({
  selector: 'products-generals',
  standalone: false,
  templateUrl: './products-generals.component.html',
  styleUrls: ['./products-generals.component.scss'],
})
export class ProductsGeneralsComponent implements OnInit {
  categoryId: string = '';

  constructor(public facade: ProductsDraftFacade) {}
  /**
   * Getters
   */

  get unitMeasures(): UnitMeasure[] {
    return this.facade.repoUnitMeasures.unitMeasures.value?.data ?? [];
  }

  /**
   * Life Cycle
   */
  ngOnInit() {}
}
