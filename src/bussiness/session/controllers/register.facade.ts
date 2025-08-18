import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacadeBase } from '@type/facade.base';
import { FormProp } from '@type/form.type';
import { validators } from '@type/validators.type';
import { SessionApiService } from '../session.api.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade extends FacadeBase {
  //Flag Management
  registeredSuccess = false;
  confirming = true;
  confirmedSuccess = false;

  //Form Group
  formGroup = new FormGroup({
    email: new FormControl('', validators.Email),
    password: new FormControl('', validators.Password),
    confirmPassword: new FormControl('', validators.Password),
  });

  pwd = new FormProp<string>(this.formGroup, 'password', '');
  pwdConfirm = new FormProp<string>(this.formGroup, 'confirmPassword', '');

  constructor(public api: SessionApiService, public router: Router) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.clearState();
  }

  bindEvents() {}

  clearState() {
    this.formGroup.reset();
    this.registeredSuccess = false;
  }

  submitForm() {}

  /**
   * UI Events
   */
  register() {
    this.api
      .signUp(this.formGroup.value.email!, this.formGroup.value.password!)
      .then((res) => {
        console.log('👉🏽 res', res);
        this.registeredSuccess = true;
      });
  }

  confirmEmail(email: string, date: string) {
    console.log('👉🏽 email', email);
    console.log('👉🏽 date', date);
    if (moment(moment()).isSameOrBefore(date)) {
      this.api.confirmEmail(email).then((result) => {
        console.log('👉🏽 result', result);
        if (result?.error) {
          this.confirmedSuccess = false;
        } else {
          this.confirmedSuccess = true;
        }
        this.confirming = false;
      });
    } else {
      this.confirming = false;
      this.confirmedSuccess = false;
    }
  }

  /**
   * Getters
   */

  get canRegister() {
    return this.formGroup.valid;
  }
}
