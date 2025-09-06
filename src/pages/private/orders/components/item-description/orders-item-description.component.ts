import { Component, Input, OnInit } from '@angular/core';

import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { OrdersDomain } from '@bussiness/orders/domains/orders.domain';
import { OrdersItemsDomain } from '@bussiness/orders/domains/orders.items.domain';
import { Order } from '@bussiness/orders/interfaces/orders.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-item-description',
  standalone: false,
  templateUrl: './orders-item-description.component.html',
  styleUrls: ['./orders-item-description.component.scss'],
})
export class OrdersItemDescriptionComponent
  extends HelperPage
  implements OnInit
{
  ordersDomain = OrdersDomain;
  itemsDomain = OrdersItemsDomain;

  @Input() item: OrderItem | null = null;
  @Input() order: Order | null = null;

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  ngOnInit() {}
}
