import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { validators } from '@globals/types/validators.type';

import { IAccountsRepository } from '@bussiness/accounts/repository/accounts.repository';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { ErrorHandlerService } from '@globals/bussiness/error/services/error.handler.service';
import { AppError } from '@globals/bussiness/error/types/error.types';
import { I18nService } from '@globals/services/i18n.service';

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
    email: new FormControl<string>('', validators.Email),
    password: new FormControl<string>('', validators.Password),
    confirmPassword: new FormControl<string>('', validators.Password),
  });

  email = new FormProp<string>(this.formGroup, 'email', '');
  pwd = new FormProp<string>(this.formGroup, 'password', '');
  pwdConfirm = new FormProp<string>(this.formGroup, 'confirmPassword', '');

  //Id Created
  accountId: string = '';

  constructor(
    public api: SessionApiService,
    public repoAccounts: IAccountsRepository,
    public router: Router,
    public nzMessageService: NzMessageService,
    public errorHandler: ErrorHandlerService,
    public i18nService: I18nService,
  ) {
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
  async register() {
    try {
      // Auth Register User
      const responseSignUp = await this.api.registerUser(this.formGroup.value.email!, this.formGroup.value.password!);
      if (responseSignUp?.success === false) {
        throw responseSignUp?.error?.raw;
      }

      // Check if account already exists and red
      const accountEmailResponse = await this.repoAccounts.getByEmail(this.formGroup.value.email!);
      this.accountId = accountEmailResponse?.data?.id ?? '';
      if (this.accountId) {
        throw new AppError('wofloo', 'EMAIL_ALREADY_EXISTS', undefined, accountEmailResponse?.error?.raw);
      }

      // Show success message in UI, and wait for email confirmation
      this.registeredSuccess = true;
      this.nzMessageService.success(this.i18nService.t('messages.success.accountCreated'));
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
  }

  confirmEmail(email: string, date: string) {
    if (moment(moment()).isSameOrBefore(date)) {
      this.api.confirmEmail(email).then((result) => {
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
