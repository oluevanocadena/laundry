import { Component } from '@angular/core';
import { ProductsDraftFacade } from '@bussiness/products/controllers/products.draft.facade';
import { HelperPage } from '../../../components/common/helper.page';

@Component({
  selector: 'app-products-draft',
  standalone: false,
  templateUrl: './products-draft.component.html',
  styleUrls: ['./products-draft.component.scss'],
})
export class ProductsDraftComponent extends HelperPage {
  constructor(public facade: ProductsDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.initialize();
  }
}
