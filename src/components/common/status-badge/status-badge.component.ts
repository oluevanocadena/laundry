import { Component, Input, OnInit } from '@angular/core';
import {
  OrderItemStatusEnum,
  OrderStatusEnum,
} from '@bussiness/orders/orders.enums';
import { TuiAppearanceOptions } from '@taiga-ui/core';

@Component({
  selector: 'status-badge',
  standalone: false,
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent implements OnInit {
  @Input() label?: string = '';
  @Input() statusId?: number = 0;
  @Input() type: StatusTypeBadge = 'order';
  @Input() size: 'm' | 's' | 'l' | 'xl' = 'l';
  @Input() appearance: TuiAppearanceOptions['appearance'] = 'warning';

  constructor() {}

  /**
   * UI Events
   */

  /**
   * Getters
   */

  get statusClassColor() {
    let status: TuiAppearanceOptions['appearance'];
    switch (this.type) {
      case StatusTypeBadgeEnum.Order:
        // OrderStatusEnum
        switch (this.statusId) {
          case OrderStatusEnum.Draft: //Draft
            status = 'warning';
            break;
          case OrderStatusEnum.Pending: //Pending
            status = 'warning';
            break;
          case OrderStatusEnum.Processing: //Processing
            status = 'info';
            break;
          case OrderStatusEnum.Completed: //Completed
            status = 'success';
            break;
          case OrderStatusEnum.Cancelled: //Cancelled
            status = 'error';
            break;
          case OrderStatusEnum.Refunded: //Refunded
            status = 'error';
            break;
          default:
            status = 'default';
            break;
        }
        break;
      case StatusTypeBadgeEnum.OrderItems:
        switch (this.statusId) {
          case OrderItemStatusEnum.NotProccesed: //NotProccesed
            status = 'warning';
            break;
          case OrderItemStatusEnum.Processing: //Processing
            status = 'info';
            break;
          case OrderItemStatusEnum.Completed: //Completed
            status = 'success';
            break;
          case OrderItemStatusEnum.Cancelled: //Cancelled
            status = 'error';
            break;
          default:
            status = 'default';
            break;
        }
        break;
      default:
        status = 'default';
        break;
    }
    return status;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}

export type StatusTypeBadge =
  | 'order'
  | 'orderItems'
  | 'payment'
  | 'delivery'
  | 'customer-marketing'
  | 'customer-status-creation';

export enum StatusTypeBadgeEnum {
  Order = 'order',
  OrderItems = 'orderItems',
  Payment = 'payment',
  Refund = 'refund',
  Customer = 'customer',
  CustomerMarketing = 'customer-marketing',
}
