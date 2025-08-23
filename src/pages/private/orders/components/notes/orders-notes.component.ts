import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HelperPage } from '@components/common/helper.page';
import { Order } from '@bussiness/orders/orders.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';

@Component({
  selector: 'orders-notes',
  standalone: false,
  templateUrl: './orders-notes.component.html',
  styleUrls: ['./orders-notes.component.scss'],
})
export class OrdersNotesComponent extends HelperPage implements OnInit {
  

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * Gettters
   */

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
