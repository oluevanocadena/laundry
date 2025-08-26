import { Component, Input, OnInit } from '@angular/core';
import { TuiAppearanceOptions } from '@taiga-ui/core';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-customer',
  standalone: false,
  templateUrl: './orders-customer.component.html',
  styleUrls: ['./orders-customer.component.scss'],
})
export class OrdersCustomerComponent extends HelperPage implements OnInit {
  //Input
  @Input() edition: boolean = false;

  constructor(public facade: OrdersDraftFacade) {
    super();
  }

  /**
   * UI Events
   */

  onSelectCustomer(customer: Customer | null) {
    this.facade.onSelectCustomer(customer);
  }

  /**
   * Getters
   */

  get googleUrlMap(): string {
    return this.facade.orderCustomer.value?.Address
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          this.facade.orderCustomer.value?.Address
        )}`
      : '';
  }

  get hadCustomer(): boolean {
    return this.facade.orderCustomer.value !== null;
  }

  get order() {
    return this.facade.order.value;
  }

  get customer() {
    return this.facade.orderCustomer.value;
  }

  get customerStatus(): string {
    switch (this.facade.orderCustomer.value?.Disabled) {
      case true:
        return 'Inactivo';
      case false:
        return 'Activo';
      default:
        return 'Activo';
    }
  }

  get customerStatusAppearance(): TuiAppearanceOptions['appearance'] {
    return this.facade.orderCustomer.value?.Disabled ? 'error' : 'success';
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
