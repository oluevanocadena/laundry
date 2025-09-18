import { Component, Input, OnInit } from '@angular/core';
import { AccountsDraftFacade } from '@bussiness/users/controllers/users.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'users-address',
  standalone: false,
  templateUrl: './users-address.component.html',
  styleUrls: ['./users-address.component.scss'],
})
export class UsersAddressComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;

  constructor(public facade: AccountsDraftFacade) {
    super();
  }

  ngOnInit() {}
}
