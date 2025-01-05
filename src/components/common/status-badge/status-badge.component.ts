import { Component, Input, OnInit } from '@angular/core';
import { TuiAppearanceOptions } from '@taiga-ui/core';
import {
  OrderItemsStatusEnum,
  OrderStatusEnum,
} from '../../../services/order-status.service';

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
          case OrderStatusEnum.Draft:
            status = 'warning';
            break;
          case OrderStatusEnum.Pending:
            status = 'warning';
            break;
          case OrderStatusEnum.Processing:
            status = 'info';
            break;
          case OrderStatusEnum.Completed:
            status = 'success';
            break;
          case OrderStatusEnum.Cancelled:
            status = 'error';
            break;
          case OrderStatusEnum.Refunded:
            status = 'error';
            break;
          default:
            status = 'default';
            break;
        }
        break;
      case StatusTypeBadgeEnum.OrderItems:
        // OrderItemsStatusEnum
        switch (this.statusId) {
          case OrderItemsStatusEnum.NotProccesed:
            status = 'warning';
            break;
          case OrderItemsStatusEnum.Processing:
            status = 'info';
            break;
          case OrderItemsStatusEnum.Completed:
            status = 'success';
            break;
          case OrderItemsStatusEnum.Cancelled:
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
  | 'payment'
  | 'refund'
  | 'csutomer'
  | 'orderItems';
export enum StatusTypeBadgeEnum {
  Order = 'order',
  OrderItems = 'orderItems',
  Payment = 'payment',
  Refund = 'refund',
  Customer = 'csutomer',
}
