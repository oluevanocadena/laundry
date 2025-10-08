import { Component, Input, OnInit } from '@angular/core';

import { AccountsDraftFacade } from '@bussiness/accounts/controllers/accounts.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'users-generals',
  standalone: false,
  templateUrl: './users-generals.component.html',
  styleUrls: ['./users-generals.component.scss'],
})
export class UsersGeneralsComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;

  constructor(public facade: AccountsDraftFacade) {
    super();
  }

  ngOnInit() {}
}
