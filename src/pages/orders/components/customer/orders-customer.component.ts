import { Component, Input, OnInit } from '@angular/core';
import { TuiAppearanceOptions } from '@taiga-ui/core';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { OrdersDraftFacade } from '@bussiness/orders/controllers/orders.draft.facade';
import { HelperPage } from '../../../../components/common/helper.page';

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
    if (customer !== null) {
      this.facade.customer.value = customer;
      this.facade.showCustomerModal = false;
      this.facade.delivery.value = {
        Address: customer.Address || '',
        Date: '',
        EstimatedDate: '',
        Fee: 0,
        DistanceKm: 0,
      };
    }
  }

  /**
   * Getters
   */

  get googleUrlMap(): string {
    return this.facade.customer.value?.Address
      ? `https://www.google.com/maps/search/${encodeURIComponent(
          this.facade.customer.value?.Address
        )}`
      : '';
  }

  get hadCustomer(): boolean {
    return this.facade.customer.value !== null;
  }

  get order() {
    return this.facade.order.value;
  }

  get customer() {
    return this.facade.customer.value;
  }

  get customerStatus(): string {
    switch (this.facade.customer.value?.Disabled) {
      case true:
        return 'Inactivo';
      case false:
        return 'Activo';
      default:
        return 'Activo';
    }
  }

  get customerStatusAppearance(): TuiAppearanceOptions['appearance'] {
    return this.facade.customer.value?.Disabled ? 'error' : 'success';
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
