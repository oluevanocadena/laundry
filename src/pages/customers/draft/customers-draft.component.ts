import { Component } from '@angular/core';
import { CustomersDraftFacade } from '../../../bussiness/customers/controllers/customers.draft.facade';
import { HelperPage } from '../../../components/common/helper.page';

@Component({
  selector: 'app-customers-draft',
  standalone: false,
  templateUrl: './customers-draft.component.html',
  styleUrls: ['./customers-draft.component.scss'],
})
export class CustomersDraftComponent extends HelperPage {
  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  ngOnInit() {
    this.facade.fillForm();
  }
}
