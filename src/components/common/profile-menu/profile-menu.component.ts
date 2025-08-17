import { Component, OnInit } from '@angular/core';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';

@Component({
  selector: 'profile-menu',
  standalone: false,
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
 
  constructor(public facade: SessionFacade) {}

  /**
   * Getters
   */
  get userName() {
    return this.facade.api.account.value?.FullName || 'Usuario apellido largos prueba';
  }

  get email() {
    return this.facade.api.session.value?.user?.email;
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
