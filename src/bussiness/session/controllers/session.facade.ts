import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FacadeBase } from '@type/facade.base';
import { FormProp } from '@type/form.type';
import { validators } from '@type/validators.type';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SessionApiService } from '../session.api.service';
import { routes } from '@app/routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionFacade extends FacadeBase {
  //Form Group
  formGroup = new FormGroup({
    email: new FormControl('', validators.Email),
    password: new FormControl('', validators.Required),
  });

  email = new FormProp<string>(this.formGroup, 'email', '');
  password = new FormProp<string>(this.formGroup, 'password', '');

  constructor(
    public api: SessionApiService,
    public nzMessageService: NzMessageService,
    public router: Router
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * UI Events
   */

  login() {
    if (this.formGroup.valid) {
      this.api.signIn(this.email.value!, this.password.value!).then((res) => {
        if (res) {
          this.router.navigate([routes.Home]);
        }
      });
    } else {
      this.nzMessageService.warning('Por favor, complete todos los campos.');
    }
  }

  signOut() {
    this.api.signOut().then((res) => {
      if (res) {
        console.log('signOut');
        this.router.navigate([routes.Login]);
      }
    });
  }
}
