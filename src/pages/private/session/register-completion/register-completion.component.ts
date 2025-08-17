import { Component } from '@angular/core';
import { RegisterFacade } from '@bussiness/session/controllers/register.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-register-completion',
  standalone: false,
  templateUrl: './register-completion.component.html',
  styleUrls: ['./register-completion.component.scss'],
})
export class RegisterCompletionComponent extends HelperPage {

  constructor(public facade: RegisterFacade) {
    super();
  }

  ngOnInit() {}
}
