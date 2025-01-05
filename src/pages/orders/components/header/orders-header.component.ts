import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { Order } from '../../../../services/orders.service';

@Component({
  selector: 'orders-header',
  standalone: false,
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent extends HelperPage implements OnInit {
  // Inputs
  @Input() edition: boolean = false;

  //Input
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  //Flag Management
  showMoreOptions: boolean = false;

  //Array
  actionTypes = [
    {
      id: 2,
      name: 'Edit',
    },
    {
      id: 1,
      name: 'Cancel',
    },
    {
      id: 3,
      name: 'Refund',
    },
  ];

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  saveOrder() {
    if (this.order !== null) {
      console.log('Save Order:', this.order);
    }
  }

  /**
   * Getters
   */
  get canSave(): boolean {
    return (
      this.order !== null &&
      this.order.orderItems?.length > 0 &&
      this.order?.customer !== null &&
      this.order?.customer.id > 0
    );
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
