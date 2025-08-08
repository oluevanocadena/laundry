import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeBase } from '../../../types/facade.base';
import { SubjectProp } from '../../../types/subject.type';
import { CustomersApiService } from '../customers.api.service';
import { Customer } from '../customers.interfaces';
import { routes } from '../../../app/routes';
import { CustomersDraftFacade } from './customers.draft.facade';

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

  initialize() {
    this.fetchCustomers();
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
    this.draftFacade.edition = false;
    this.draftFacade.clearState();
    this.router.navigate([routes.CustomerDraft]);
  }

  onCustomerClick(customer: Customer) {
    this.draftFacade.customer.value = customer;
    this.router.navigate([routes.CustomerDraft]);
  }
}
