import { Component } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-register-confirm',
  standalone: false,
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss'],
})
export class RegisterConfirmComponent extends HelperPage {
  constructor() {
    super();
  }

  ngOnInit() {}
}
