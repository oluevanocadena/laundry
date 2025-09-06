import { Component, Input, OnInit } from '@angular/core';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'customers-notes',
  standalone: false,
  templateUrl: './customers-notes.component.html',
  styleUrls: ['./customers-notes.component.scss'],
})
export class CustomersNotesComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;

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
