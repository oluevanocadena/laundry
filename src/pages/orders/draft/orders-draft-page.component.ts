import { Component, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '../../../components/common/helper.page';

@Component({
  selector: 'app-orders-draft-page',
  standalone: false,
  templateUrl: './orders-draft-page.component.html',
  styleUrls: ['./orders-draft-page.component.scss'],
})
export class OrdersDraftPageComponent extends HelperPage implements OnInit {
  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * Life cycle method
   */
  ngOnInit() {
    this.facade.initialize();
  }
}
