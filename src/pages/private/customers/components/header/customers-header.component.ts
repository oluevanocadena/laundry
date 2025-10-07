import { Component, OnInit } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

import { Router } from '@angular/router';
import moment from 'moment';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { TuiAppearanceOptions } from '@taiga-ui/core';

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
    return this.facade.repo.busy.value;
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
   * Life Cicle
   */
  ngOnInit() {}
}
