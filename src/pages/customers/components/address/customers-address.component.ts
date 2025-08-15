import { Component, Input, OnInit } from '@angular/core';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { HelperPage } from '../../../../components/common/helper.page';

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
