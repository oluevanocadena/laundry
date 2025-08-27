import { Component, Input, OnInit } from '@angular/core';
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
          case 1: //Draft
            status = 'warning';
            break;
          case 2: //Pending
            status = 'warning';
            break;
          case 3: //Processing
            status = 'info';
            break;
          case 4: //Completed
            status = 'success';
            break;
          case 5: //Cancelled
            status = 'error';
            break;
          case 6: //Refunded
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
          case 1: //NotProccesed
            status = 'warning';
            break;
          case 2: //Processing
            status = 'info';
            break;
          case 3: //Completed
            status = 'success';
            break;
          case 4: //Cancelled
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
