import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { routes } from '@app/routes';
import { FacadeBase } from '@type/facade.base';
import { StorageProp } from '@type/storage.type';

import { CustomersApiService } from '@bussiness/customers/customers.api.service';
import { Customer } from '@bussiness/customers/customers.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';
import { system } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisabledModal: boolean = false;

  public formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    notes: new FormControl(''),
    street: new FormControl('', [Validators.required]),
    externalNumber: new FormControl(''),
    internalNumber: new FormControl(''),
    neighborhood: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl({ value: '', disabled: true }),
    zipCode: new FormControl('', [Validators.required]),
  });

  //Subjects
  public customer = new StorageProp<Customer>(null, 'CUSTOMER_EDITION');

  constructor(
    public api: CustomersApiService,
    public router: Router,
    public sessionService: SessionService
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {
    this.formGroup.reset();
    this.customer.value = {
      Deleted: false,
      Disabled: false,
      Country: system.defaultCountry,
      FirstName: '',
      LastName: '',
      FullName: '',
      Email: '',
      Municipality: '',
      Neighborhood: '',
      State: '',
      Street: '',
      ZipCode: '',
      OrganizationId: this.sessionService.organizationId,
    };
    this.edition = false;
    this.formGroup.controls.country.patchValue(system.defaultCountry);
    this.formGroup.controls.country.disable();
  }

  fillForm() {
    const value = this.customer.value;
    if (value) {
      this.edition = true;
      this.formGroup.patchValue({
        firstName: value.FirstName,
        lastName: value.LastName,
        email: value.Email,
        phone: value.Phone,
        notes: value.Notes,
        street: value.Street,
        externalNumber: value.ExtNumber,
        internalNumber: value.IntNumber,
        neighborhood: value.Neighborhood,
        municipality: value.Municipality,
        state: value.State,
        country: value.Country,
        zipCode: value.ZipCode,
      });
    } else {
      this.clearState();
    }
  }

  submitForm() {
    const value = this.formGroup.value;
    const customer: Customer = {
      id: this.edition ? this.customer.value?.id : undefined,
      AllowNotifications: true,
      Country: system.defaultCountry,
      Email: value.email?.toString() || '',
      ExtNumber: value.externalNumber?.toString() || '',
      FirstName: value.firstName?.toString() || '',
      LastName: value.lastName?.toString() || '',
      FullName: `${value.firstName} ${value.lastName}`,
      IntNumber: value.internalNumber?.toString() || '',
      Municipality: value.municipality?.toString() || '',
      Neighborhood: value.neighborhood?.toString() || '',
      Notes: value.notes?.toString() || '',
      Phone: value.phone?.toString() || '',
      State: value.state?.toString() || '',
      Street: value.street?.toString() || '',
      ZipCode: value.zipCode?.toString() || '',
      Deleted: this.customer.value?.Deleted || false,
      Disabled: this.customer.value?.Disabled || false,
      TotalOrders: this.customer.value?.TotalOrders || 0,
      OrganizationId: this.sessionService.organizationId,
    };

    this.api.saveCustomer(customer).then(() => {
      this.router.navigate([routes.Customers]);
    });
  }

  /**
   * UI Events
   */

  onDelete() {
    const customer = this.customer.value;
    if (customer?.id) {
      this.api.deleteCustomer(customer.id).then(() => {
        this.router.navigate([routes.Customers]);
      });
    }
  }

  onDisable() {
    const customer = this.customer.value;
    if (customer?.id) {
      if (customer.Disabled) {
        this.api.enableCustomer(customer.id).then(() => {
          if (this.customer.value) {
            this.customer.value.Disabled = false;
          }
        });
      } else {
        this.api.disableCustomer(customer.id).then(() => {
          if (this.customer.value) {
            this.customer.value.Disabled = true;
          }
        });
      }
    }
  }
}
