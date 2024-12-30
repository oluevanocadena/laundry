import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { emit } from 'process';
import { HelperPage } from '../../../components/common/helper.page';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends HelperPage {
  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {
    super();
  }

  /**
   * UI Events
   */
  login() {}

  /**
   * Life cycle hook
   */

  ngOnInit() {}
}
