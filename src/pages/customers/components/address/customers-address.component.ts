import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../services/customers.service';
import { HelperPage } from '../../../../components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'customers-address',
  standalone: false,
  templateUrl: './customers-address.component.html',
  styleUrls: ['./customers-address.component.scss'],
})
export class CustomersAddressComponent extends HelperPage implements OnInit {
  @Input() edition: boolean = false;

  //Input
  private _order: Customer | null = null;
  @Input() set customer(value: Customer) {
    this._order = value;
  }
  get customer(): Customer | null {
    return this._order;
  }
  @Output() customerChange: EventEmitter<Customer> =
    new EventEmitter<Customer>();

  //formGroup
  formGroup = new FormGroup({
    street: new FormControl('', [Validators.required]),
    externalNumber: new FormControl('', [Validators.required]),
    internalNumber: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required]),
  });

  constructor() {
    super();
  }

  ngOnInit() {}
}
