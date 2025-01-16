import { Component, Input, OnInit } from '@angular/core';
import { TuiAppearanceOptions } from '@taiga-ui/core';
import {
  OrderItemsStatusEnum,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from '../../../services/order-status.service';
import {
  CustomerMarketingSubscriptionEnum,
  CustomerStatusEnum,
} from '../../../services/customers-status.service';

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
      case StatusTypeBadgeEnum.Payment:
        // OrderPaymentStatusEnum
        switch (this.statusId) {
          case OrderPaymentStatusEnum.Pending:
            status = 'warning';
            break;
          case OrderPaymentStatusEnum.Paid:
            status = 'success';
            break;
          case OrderPaymentStatusEnum.Refunded:
            status = 'error';
            break;
          default:
            status = 'default';
            break;
        }
        break;
      case StatusTypeBadgeEnum.Customer:
        // CustomerStatusEnum
        switch (this.statusId) {
          case CustomerStatusEnum.Draft:
            status = 'warning';
            break;
          case CustomerStatusEnum.Active:
            status = 'success';
            break;
          case CustomerStatusEnum.Inactive:
            status = 'error';
            break;
          default:
            status = 'info';
            break;
        }
        break;
      case StatusTypeBadgeEnum.CustomerMarketing:
        // CustomerMarketingSubscriptionEnum
        switch (this.statusId) {
          case CustomerMarketingSubscriptionEnum.Subscribed:
            status = 'success';
            break;
          case CustomerMarketingSubscriptionEnum.Unsubscribed:
            status = 'error';
            break;
          default:
            status = 'info';
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
  | 'customer'
  | 'customer-marketing';

export enum StatusTypeBadgeEnum {
  Order = 'order',
  OrderItems = 'orderItems',
  Payment = 'payment',
  Refund = 'refund',
  Customer = 'customer',
  CustomerMarketing = 'customer-marketing',
}
