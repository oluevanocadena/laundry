import { Component } from '@angular/core';
import { RegisterFacade } from '@bussiness/session/controllers/register.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent extends HelperPage {
  languageModulePath = 'ui.modules.session.register';
  constructor(public facade: RegisterFacade) {
    super();
  }

  /**
   * Getters
   */

  get showInstructions() {
    return !(this.facade.pwd.value !== this.facade.pwdConfirm.value && this.facade.pwdConfirm.value !== '');
  }

  get passwordNotMatch() {
    return this.facade.pwd.value !== this.facade.pwdConfirm.value && this.facade.pwdConfirm.value !== '';
  }

  /**
   * Life cycle hook
   */

  ngOnInit() {}
}
