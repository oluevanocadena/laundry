import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../services/customers.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';
import { CustomersDraftFacade } from '../../../../bussiness/customers/controllers/customers.draft.facade';

@Component({
  selector: 'customers-notes',
  standalone: false,
  templateUrl: './customers-notes.component.html',
  styleUrls: ['./customers-notes.component.scss'],
})
export class CustomersNotesComponent extends HelperPage implements OnInit {
  @Input() edition: boolean = false;

  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  /**
   * Gettters
   */

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
