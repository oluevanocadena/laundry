import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountsDraftFacade } from '@bussiness/accounts/controllers/accounts.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-users-draft',
  standalone: false,
  templateUrl: './users-draft.component.html',
  styleUrls: ['./users-draft.component.scss'],
})
export class UsersDraftComponent extends HelperPage implements OnInit, OnDestroy {
  constructor(public facade: AccountsDraftFacade) {
    super();
  }

  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.initialize();
  }

  ngOnDestroy(): void {
    this.facade.unbindEvents();
  }
}
