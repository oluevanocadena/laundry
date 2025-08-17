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
  constructor(public facade: RegisterFacade) {
    super();
  }

  /**
   * Life cycle hook
   */

  ngOnInit() {}
}
