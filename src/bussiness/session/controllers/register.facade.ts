import { Injectable } from '@angular/core';
import { FacadeBase } from '@type/facade.base';
import { SessionApiService } from '../session.api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade extends FacadeBase {
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

  constructor(public api: SessionApiService) {
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
  register() {
    console.log('Register', this.formGroup.value);
  }
}
