import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../services/customers.service';
import { HelperPage } from '../../../../components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'customers-summary',
  standalone: false,
  templateUrl: './customers-summary.component.html',
  styleUrls: ['./customers-summary.component.scss'],
})
export class CustomersSummaryComponent extends HelperPage implements OnInit {
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
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    statusMarketingId: new FormControl(null, [Validators.required]),
  });

  constructor() {
    super();
  }

  ngOnInit() {}
}
