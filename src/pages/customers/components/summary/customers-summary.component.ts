import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../services/customers.service';
import { HelperPage } from '../../../../components/common/helper.page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { CustomersDraftFacade } from '../../../../bussiness/customers/controllers/customers.draft.facade';

@Component({
  selector: 'customers-summary',
  standalone: false,
  templateUrl: './customers-summary.component.html',
  styleUrls: ['./customers-summary.component.scss'],
})
export class CustomersSummaryComponent extends HelperPage implements OnInit {
  @Input() edition: boolean = false;

  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  ngOnInit() {}
}
