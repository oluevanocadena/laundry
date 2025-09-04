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
  @Input() label?:  string = ''; 
  @Input() size: 'm' | 's' | 'l' | 'xl' = 'l';
  @Input() appearance?: TuiAppearanceOptions['appearance'];

  constructor() {}

  /**
   * UI Events
   */

  /**
   * Getters
   */
 

  /**
   * Life cycle method
   */
  ngOnInit() {}
} 