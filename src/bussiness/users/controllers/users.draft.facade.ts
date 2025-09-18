import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '@app/routes';

import { RolesApiService } from '@bussiness/session/services/roles.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { Account } from '@bussiness/users/interfaces/users.interfaces';
import { AccountsApiService } from '@bussiness/users/services/users.api.service';
import { system } from '@environments/environment';
import { FacadeBase } from '@globals/types/facade.base';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';
import { Role } from '../interfaces/users.roles.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountsDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisabledModal: boolean = false;

  public formGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    Country: new FormControl({ value: system.defaultCountry, disabled: true }),
    ExtNumber: new FormControl(''),
    IntNumber: new FormControl(''),
    Neighborhood: new FormControl(''),
    Municipality: new FormControl(''),
    State: new FormControl(''),
    Street: new FormControl(''),
    ZipCode: new FormControl(''),
  });

  //Subjects
  public account = new StorageProp<Account>(null, 'ACCOUNT_SELECTED');
  public roles = new SubjectProp<Role[]>([]);

  constructor(
    public api: AccountsApiService,
    public rolesApi: RolesApiService,
    public router: Router,
    public sessionService: SessionService,
  ) {
    super(api);
    this.formGroup.controls.Country.disable();
  }

  override initialize() {
    super.initialize();
    this.fetchRoles();
    this.fillForm();
  }

  bindEvents() {}

  clearState() {
    this.formGroup.reset();
    this.account.value = null;
    this.edition = false;
    this.showDeleteModal = false;
    this.showDisabledModal = false;
  }

  submitForm() {
    const value = this.formGroup.value;
    const account: Account = {
      FirstName: value.FirstName || '',
      LastName: value.LastName || '',
      Email: value.Email || '',
      Phone: value.Phone || '',
      Street: value.Street || '',
      Neighborhood: value.Neighborhood || '',
      Municipality: value.Municipality || '',
      State: value.State || '',
      ZipCode: value.ZipCode || '',
      Country: value.Country || '',
      ExtNumber: value.ExtNumber || '',
      IntNumber: value.IntNumber || '',
      OrganizationId: this.sessionService.organizationId,
    };
    this.api.saveAccount(account).then(() => {
      this.router.navigate([routes.Users]);
    });
  }

  /**
   * API Calls
   */

  fetchRoles() {
    this.rolesApi.getRoles().then((response) => {
      response.data?.forEach((role) => {
        role.Checked = this.account.value?.AccountRoles?.some((accountRole) => accountRole.RoleId === role.id);
      });
      this.roles.value = response.data ?? [];
    });
  }

  fillForm() {
    const value = this.account.value;
    if (value) {
      this.edition = true;
      this.formGroup.patchValue({
        FirstName: value.FirstName,
        LastName: value.LastName,
        Email: value.Email,
        Phone: value.Phone,
        Country: value.Country,
        ExtNumber: value.ExtNumber,
        IntNumber: value.IntNumber,
        Neighborhood: value.Neighborhood,
        Municipality: value.Municipality,
        State: value.State,
        Street: value.Street,
        ZipCode: value.ZipCode,
      });
    } else {
      this.clearState();
    }
  }

  onDelete() {
    const account = this.account.value;
    if (account?.id) {
      this.api.deleteAccount(account.id).then((response) => {
        if (response?.success) {
          this.router.navigate([routes.Users]);
        }
      });
    }
  }

  onDisable() {
    const user = this.account.value;
    if (user?.id) {
      if (user.Disabled) {
        this.api.enableAccount(user.id).then(() => {
          if (this.account.value) {
            this.account.value.Disabled = false;
          }
        });
      } else {
        this.api.disableAccount(user.id).then(() => {
          if (this.account.value) {
            this.account.value.Disabled = true;
          }
        });
      }
    }
  }

  onBack() {
    this.router.navigate([routes.Users]);
  }
}
