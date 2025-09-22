import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InvitationFacade } from '@bussiness/session/controllers/invitation.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'invitation-confirm',
  standalone: false,
  templateUrl: './invitation-confirm.component.html',
  styleUrls: ['./invitation-confirm.component.scss'],
})
export class InvitationConfirmComponent extends HelperPage implements OnInit {
  constructor(public facade: InvitationFacade, private route: ActivatedRoute, private router: Router) {
    super();
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

  /**
   * Life cycle method
   */

  async ngOnInit(): Promise<void> {
    this.facade.api.client.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log('📩 Usuario invitado:', session);
        const url = new URL(window.location.href);
        const type = url.searchParams.get('type') || url.hash.includes('type=invite') ? 'invite' : null;
        console.log('📩 Tipo:', type);
        if (type === 'invite') {
          this.facade.token.value = session.access_token;
          console.log('📩 Usuario invitado:', session.user.email);
        } else {
          console.log('📢 Usuario no invitado:', session.user.email);
          this.router.navigate([this.routes.Login]);
        }
      } else {
        console.log('❌ Sesión no lista:', _event);
      }
    });
  }
}
