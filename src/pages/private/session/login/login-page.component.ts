import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { emit } from 'process';
import { HelperPage } from '@components/common/helper.page';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends HelperPage {

  languageModulePath = 'ui.modules.session.login';
  constructor(public facade: SessionFacade) {
    super();
  }
 

  /**
   * Life cycle hook
   */

  ngOnInit() {}
}
