import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { FacadeBase } from '../../../globals/types/facade.base';

import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CustomersMonitorFacade extends FacadeBase {
  constructor(
    public api: CustomersApiService,
    public router: Router,
    private draftFacade: CustomersDraftFacade
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    this.api.customers.value = [];
  }

  submitForm() {}

  /**
   * API Calls
   */
  fetchCustomers() {
    return this.api.getCustomers();
  }

  /**
   * UI Events
   */
  onNewCustomer() {
    this.router.navigate([routes.CustomerDraft]);
    this.draftFacade.customer.value = null;
  }

  onCustomerClick(customer: Customer) {
    this.draftFacade.customer.value = customer;
    this.router.navigate([routes.CustomerDraft]);
  }
}
