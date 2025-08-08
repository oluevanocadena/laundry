import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

import { Router } from '@angular/router';
import moment from 'moment';
import { CustomersDraftFacade } from '../../../../bussiness/customers/controllers/customers.draft.facade';

@Component({
  selector: 'customers-header',
  standalone: false,
  templateUrl: './customers-header.component.html',
  styleUrls: ['./customers-header.component.scss'],
})
export class CustomersHeaderComponent extends HelperPage implements OnInit {
  showMoreOptions: boolean = false;

  constructor(public facade: CustomersDraftFacade, public router: Router) {
    super();
  }

  /**
   * UI Events
   */

  saveCustomer() {
    this.facade.submitForm();
  }

  onBack() {
    this.router.navigate([this.routes.Customers]);
  }

  /**
   * Getters
   */

  get canSave(): boolean {
    return this.facade.formGroup.valid;
  }

  get dateCreated(): string {
    return (
      this.facade.customer.value?.created_at ||
      moment().locale('es').toDate().toString()
    );
  }

  get customerNumber(): string {
    return this.facade.customer.value?.CustomerNumber || '';
  }

  get busy(): boolean {
    return this.facade.api.busy.value;
  }

  get customerStatus(): string {
    switch (this.facade.customer.value?.StatusCreationId) {
      case 1:
        return 'Borrador';
      case 2:
        return 'Activo';
      case 3:
        return 'Inactivo';
      default:
        return 'Borrador';
    }
  }

  /**
   * Life Cicle
   */
  ngOnInit() {}
}
