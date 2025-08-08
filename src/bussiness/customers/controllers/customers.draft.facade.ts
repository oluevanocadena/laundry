import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerCreationStatusEnum } from '../../../services/customers-status.service';
import { FacadeBase } from '../../../types/facade.base';
import { StorageProp } from '../../../types/storage.type';
import { CustomersApiService } from '../customers.api.service';
import { Customer } from '../customers.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CustomersDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;

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
  public customer = new StorageProp<Customer | null>(null, 'CUSTOMER_EDITION');

  constructor(public api: CustomersApiService) {
    super(api);
  }

  initialize() {
    this.formGroup.controls.country.setValue('México');
  }

  bindEvents() {}

  clearState() {
    this.formGroup.reset();
    this.customer.value = null;
  }

  fillForm() {
    const value = this.customer.value;
    if (value) {
      this.edition = true;
      console.log('customer', value);
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
      console.log('formGroup', this.formGroup.value);
    }
  }

  submitForm() {
    const value = this.formGroup.value;
    const customer: Customer = {
      id: this.edition ? this.customer.value?.id : undefined,
      AllowNotifications: true,
      Country: 'México',
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
      Status: true,
      StatusCreationId: this.edition
        ? this.customer.value?.StatusCreationId ||
          CustomerCreationStatusEnum.Draft
        : CustomerCreationStatusEnum.Draft,
    };

    this.api.saveCustomer(customer);
  }
}
