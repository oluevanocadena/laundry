import { Component, OnInit } from '@angular/core';
import { AccountsDraftFacade } from '@bussiness/users/controllers/users.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-users-draft',
  standalone: false,
  templateUrl: './users-draft.component.html',
  styleUrls: ['./users-draft.component.scss'],
})
export class UsersDraftComponent extends HelperPage implements OnInit {
  constructor(public facade: AccountsDraftFacade) {
    super();
  }

  ngOnInit() {
    this.facade.initialize();
  }
}
