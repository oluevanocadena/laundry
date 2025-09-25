import { Component, OnInit } from '@angular/core';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'profile-menu',
  standalone: false,
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent extends HelperPage implements OnInit {
  constructor(public facade: SessionFacade) {
    super();
  }

  /**
   * Getters
   */
  get userName() {
    return this.facade.sessionService.sessionInfo.value?.Account?.FullName || '-';
  }

  get email() {
    return this.facade.sessionService.sessionInfo.value?.Account?.Email;
  }

  get userLetter() {
    return this.userName.substring(0, 2)?.toUpperCase() || 'U';
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}

export interface UIOptionProfileMenu {
  id: number;
  label: string;
}
