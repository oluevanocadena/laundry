import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { Order } from '../../../../services/orders.service';
import { Customer } from '../../../../bussiness/customers/customers.interfaces';

@Component({
  selector: 'orders-customer',
  standalone: false,
  templateUrl: './orders-customer.component.html',
  styleUrls: ['./orders-customer.component.scss'],
})
export class OrdersCustomerComponent extends HelperPage implements OnInit {
  //Flag Maganement
  loading: boolean = false;
  showCustomerModal: boolean = false;

  //Input
  @Input() edition: boolean = false;

  // Order
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    if (this._order !== value) {
      this._order = value;
    }
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  constructor() {
    super();
  }

  /**
   * Api Calls
   */

  /**
   * UI Events
   */
  openCustomerModal() {
    this.showCustomerModal = true;
  }

  onSelectCustomer(customer: Customer | null) {
    if (this.order && customer) {
      this.order.customer = customer;
      // this.order.delivery.address = customer.Address;
      // this.order.delivery.distanceKm = customer.address.distanceKm ?? 0;
      this.order = { ...this.order };
      this.orderChange.emit(this.order);
    }
    this.showCustomerModal = false;
  }

  /**
   * Getters
   */

  get googleUrlMap(): string {
    return this.order?.customer?.Address
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          this.order?.customer?.Address
        )}`
      : '';
  }

  get hadCustomer(): boolean {
    return this.order &&
      this.order?.customer !== null &&
      this.order.customer.id?.trim() !== ''
      ? true
      : false;
  }

  get customerDetailUrl(): string {
    return this.order && this.order.customer
      ? `/customers/detail/${this.order.customer.id}`
      : '';
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
