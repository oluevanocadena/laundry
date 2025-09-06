import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { validators } from '@globals/types/validators.type';

import { routes } from '@app/routes';
import { Organization } from '@bussiness/session/organizations.interface';
import { AccountsApiService } from '@bussiness/session/services/accounts.api.service';
import { OrganizationsApiService } from '@bussiness/session/services/organizations.api.service';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { Account } from '@bussiness/users/users.interfaces';

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

  constructor(
    public api: SessionApiService,
    public apiAccounts: AccountsApiService,
    public apiOrganizations: OrganizationsApiService,
    public router: Router,
    public nzMessageService: NzMessageService
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
  register() {
    try {
      this.api
        .signUp(this.formGroup.value.email!, this.formGroup.value.password!)
        .then((res) => {
          this.apiAccounts
            .getAccount(this.formGroup.value.email!)
            .then((account) => {
              console.log('👉🏽 account', account);
              if (account && account.OrganizationId) {
                this.router.navigate([routes.Home]);
              } else {
                this.apiOrganizations
                  .saveOrganization({
                    Name: '',
                    PlanId: null,
                  })
                  .then((organization: Organization | null) => {
                    console.log('👉🏽 organization created', organization);
                    if (organization) {
                      this.apiAccounts
                        .saveAccount({
                          Email: this.formGroup.value.email!,
                          OrganizationId: organization?.id!,
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
                        })
                        .then((account: Account | null) => {
                          console.log('👉🏽 account created', account);
                          if (account) {
                            this.registeredSuccess = true;
                          } else {
                            this.nzMessageService.error(
                              'Ocurrió un error al crear la cuenta, intenta nuevamente.'
                            );
                          }
                        });
                    } else {
                      throw new Error(
                        'Ocurrió un error al crear la organización, intenta nuevamente.'
                      );
                    }
                  });
              }
            });
        });
    } catch (error) {
      this.apiAccounts.deleteAccount(this.formGroup.value.email!);
      this.nzMessageService.error(
        'Ocurrió un error al crear la cuenta, intenta nuevamente.'
      );
    }
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
