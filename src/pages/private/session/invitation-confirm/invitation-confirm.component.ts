import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InvitationFacade } from '@bussiness/session/controllers/invitation.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'invitation-confirm',
  standalone: false,
  templateUrl: './invitation-confirm.component.html',
  styleUrls: ['./invitation-confirm.component.scss'],
})
export class InvitationConfirmComponent extends HelperPage implements OnInit {
  constructor(public facade: InvitationFacade, private router: Router) {
    super();
    this.facade.clearSession();
  }

  /**
   * Getters
   */

  get canSetPassword() {
    return this.facade.formGroup.valid && this.facade.pwd.value === this.facade.pwdConfirm.value;
  }

  get showInstructions() {
    return !(this.facade.pwd.value !== this.facade.pwdConfirm.value && this.facade.pwdConfirm.value !== '');
  }

  get passwordNotMatch() {
    return this.facade.pwd.value !== this.facade.pwdConfirm.value && this.facade.pwdConfirm.value !== '';
  }

  get showSetPasswordForm() {
    return this.facade.session.value?.user.email;
  }

  /**
   * Life cycle method
   */

  async ngOnInit(): Promise<void> {
    this.facade.api.client.auth.onAuthStateChange((_event, session) => {
      if (session) {
        this.logger.log('📩 Usuario invitado:', session);
        const url = new URL(window.location.href);
        const type = url.searchParams.get('type') || url.hash.includes('type=invite') ? 'invite' : null;
        this.logger.log('📩 Tipo:', type);
        if (type === 'invite') {
          this.facade.session.value = session;
          this.logger.log('📩 Usuario invitado:', session.user.email);
        } else {
          this.logger.log('📢 Usuario no invitado:', session.user.email);
          this.router.navigate([this.routes.Login]);
        }
      } else {
        this.logger.critical('❌ Sesión no lista:', _event);
      }
    });
  }
}
