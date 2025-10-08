import { Component, OnDestroy } from '@angular/core';
import { CustomersDraftFacade } from '@bussiness/customers/controllers/customers.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-customers-draft',
  standalone: false,
  templateUrl: './customers-draft.component.html',
  styleUrls: ['./customers-draft.component.scss'],
})
export class CustomersDraftComponent extends HelperPage implements OnDestroy {
  constructor(public facade: CustomersDraftFacade) {
    super();
  }

  ngAfterViewInit() {
    this.facade.initialize();
  }

  ngOnDestroy(): void {
    this.facade.unbindEvents();
  }
}
