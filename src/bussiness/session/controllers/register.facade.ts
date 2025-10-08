import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { validators } from '@globals/types/validators.type';

import { IAccountsRepository } from '@bussiness/accounts/repository/accounts.repository';
import { IOrganizationsRepository } from '@bussiness/organizations/repository/organizations.repository';
import { RoleEnum } from '@bussiness/session/enums/role.enums';
import { SessionApiService } from '@bussiness/session/services/session.api.service';

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

  //Id Created
  organizationId: string = '';
  accountId: string = '';
  accountRoleIds: number[] = [];

  constructor(
    public api: SessionApiService,
    public repoAccounts: IAccountsRepository,
    public repoOrganizations: IOrganizationsRepository,
    public router: Router,
    public nzMessageService: NzMessageService,
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
      await this._registerAccount();

      // Check if account already exists and red
      const accountResponse = await this.repoAccounts.getByEmail(this.formGroup.value.email!);
      this.accountId = accountResponse?.data?.id ?? '';
      if (this.accountId) {
        const message = 'No se puede crear la cuenta, ya existe una cuenta con esta cuenta de correo.';
        this.nzMessageService.error(message);
        return;
      }

      // Create organization
      await this._createNewOrganization();

      // Create account
      await this._createNewAccount();

      // Create account roles
      await this._createNewAccountRoles();

      // Show success message in UI, and wait for email confirmation
      this.registeredSuccess = true;
      this.nzMessageService.success('Felicidades, se completó el registro correctamente');
    } catch (error: any) {
      this.repoAccounts.delete(this.formGroup.value.email!);
      this.repoOrganizations.delete(this.organizationId);
      this.repoAccounts.deleteAccountRoles(this.accountRoleIds);
      this.nzMessageService.error(error?.message || 'Ocurrió un error al crear la cuenta, intenta nuevamente.');
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
   * Private Methods
   */

  async _registerAccount() {
    const signUpResponse = await this.api.registerUser(this.formGroup.value.email!, this.formGroup.value.password!);
    if (signUpResponse?.success === false) {
      throw new Error(signUpResponse?.error?.message);
    }
    return signUpResponse;
  }

  async _createNewOrganization() {
    const responseOrg = await this.repoOrganizations.save({
      Name: '',
      PlanId: null, //TODO: Add plan id
    });
    if (responseOrg.success === false) {
      throw new Error('Ocurrió un error al crear la organización');
    } else {
      this.organizationId = responseOrg.data?.id ?? '';
    }
  }

  async _createNewAccountRoles() {
    const rolesResponse = await this.repoAccounts.saveAccountRoles([
      {
        AccountId: this.accountId,
        RoleId: RoleEnum.Owner,
        OrganizationId: this.organizationId,
      },
      {
        AccountId: this.accountId,
        RoleId: RoleEnum.Admin,
        OrganizationId: this.organizationId,
      },
    ]);
    this.accountRoleIds = rolesResponse.data?.map((role) => role.id!) ?? [];
    if (rolesResponse.success === false) {
      throw new Error('Ocurrió un error al crear los roles');
    }
  }

  async _createNewAccount() {
    const responseAccount = await this.repoAccounts.save({
      Email: this.formGroup.value.email!,
      OrganizationId: this.organizationId,
      FirstName: '',
      LastName: '',
      Phone: '',
      Street: '',
      Neighborhood: '',
      Municipality: '',
      State: '',
      Country: '',
      ZipCode: '',
      BillingAddress: '',
      IsOwner: true,
    });
    this.accountId = responseAccount.data?.id ?? '';
    if (responseAccount.success === false) {
      throw new Error('Ocurrió un error al crear la cuenta');
    }
  }

  /**
   * Getters
   */

  get canRegister() {
    return this.formGroup.valid;
  }
}
