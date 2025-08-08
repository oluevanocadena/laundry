import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../services/customers.service';
import { HelperPage } from '../../../../components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersDraftFacade } from '../../../../bussiness/customers/controllers/customers.draft.facade';

@Component({
  selector: 'customers-address',
  standalone: false,
  templateUrl: './customers-address.component.html',
  styleUrls: ['./customers-address.component.scss'],
})
export class CustomersAddressComponent extends HelperPage implements OnInit {
  @Input() edition: boolean = false;

  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  ngOnInit() {}
}
