import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../components/common/helper.page';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent extends HelperPage {

  //Index
  step = 0;

  //Form Group
  formGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor() {
    super();
  }

  /**
   * UI Events
   */
  register() {
    console.log('Register', this.formGroup.value);
  }

  /**
   * Life cycle hook
   */

  ngOnInit() {}
}
