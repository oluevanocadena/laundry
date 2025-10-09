import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { Session } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AccountsEmpty, DefaultAccountRoles } from '@bussiness/accounts/constants/accounts.constants';
import { IAccountsRepository } from '@bussiness/accounts/repository/accounts.repository';
import { IOrganizationsRepository } from '@bussiness/organizations/repository/organizations.repository';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { ErrorHandlerService } from '@globals/bussiness/error/services/error.handler.service';
import { AppError } from '@globals/bussiness/error/types/error.types';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { SubjectProp } from '@globals/types/subject.type';
import { validators } from '@globals/types/validators.type';

@Injectable({
  providedIn: 'root',
})
export class InvitationFacade extends FacadeBase {
  formGroup = new FormGroup({
    password: new FormControl('', validators.Password),
    confirmPassword: new FormControl('', validators.Password),
  });

  pwd = new FormProp<string>(this.formGroup, 'password', '');
  pwdConfirm = new FormProp<string>(this.formGroup, 'confirmPassword', '');

  //Id Created
  organizationId: string = '';
  accountId: string = '';
  accountRoleIds: number[] = [];

  session = new SubjectProp<Session>(null);

  constructor(
    public api: SessionApiService,
    public router: Router,
    public nzMessageService: NzMessageService,
    public repoOrganizations: IOrganizationsRepository,
    public repoAccounts: IAccountsRepository,
    public errorHandler: ErrorHandlerService,
    public sessionService: SessionService,
  ) {
    super(api);
  }

  override initialize() {}

  override bindEvents() {}

  override clearState() {}

  override submitForm() {}

  /**
   * UI Events
   */

  async onClickSetPassword() {
    try {
      // Create organization
      //TODO: Add plan id
      const OrganizationResponse = await this.repoOrganizations.save({ Name: '', PlanId: null });
      if (OrganizationResponse.success === true) {
        this.organizationId = OrganizationResponse.data?.id ?? '';
      } else {
        throw new AppError('wofloo', 'DEFAULT', undefined, OrganizationResponse.error?.raw);
      }

      // Create account
      const account = { ...AccountsEmpty, Email: this.email, OrganizationId: this.organizationId };
      const accountResponse = await this.repoAccounts.save(account);
      this.accountId = accountResponse.data?.id ?? '';
      if (accountResponse.success === false) {
        throw new AppError('wofloo', 'DEFAULT', undefined, accountResponse.error?.raw);
      }

      // Create account roles
      const roles = { ...DefaultAccountRoles, AccountId: this.accountId, OrganizationId: this.organizationId };
      const rolesResponse = await this.repoAccounts.saveAccountRoles(roles);
      this.accountRoleIds = rolesResponse.data?.map((role) => role.id!) ?? [];
      if (rolesResponse.success === false) {
        throw new AppError('wofloo', 'DEFAULT', undefined, rolesResponse.error?.raw);
      }

      const response = await this.api.setPassword({ password: this.pwd.value! });
      if (response.success) {
        this.nzMessageService.success('Contraseña establecida correctamente');
        this.router.navigate([routes.Login]);
      } else {
        this.nzMessageService.error('Ocurrió un error al establecer la contraseña, intenta nuevamente.');
      }
    } catch (error: any) {
      this.repoAccounts.delete(this.email);
      this.repoOrganizations.delete(this.organizationId);
      this.repoAccounts.deleteAccountRoles(this.accountRoleIds);
      this.errorHandler.handleError(error);
    }
  }

  clearSession() {
    this.sessionService.clearSession();
    this.api.client.auth.setSession({
      access_token: '',
      refresh_token: '',
    });
    // Extra: Si quieres forzar, limpia manualmente la llave de localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.includes('-auth-token')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Getters
   */

  get email() {
    return this.session.value!.user.email!;
  }
}
