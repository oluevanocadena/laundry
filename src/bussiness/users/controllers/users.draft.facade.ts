import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RolesApiService } from '@bussiness/session/services/roles.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { Account } from '@bussiness/users/interfaces/users.interfaces';
import { Role } from '@bussiness/users/interfaces/users.roles.interfaces';
import { AccountsApiService } from '@bussiness/users/services/users.api.service';
import { system } from '@environments/environment';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';
import { validators } from '@globals/types/validators.type';

@Injectable({
  providedIn: 'root',
})
export class AccountsDraftFacade extends FacadeBase {
  //Flag Management
  public edition: boolean = false;
  public showDeleteModal: boolean = false;
  public showDisabledModal: boolean = false;
  public showChangePasswordModal: boolean = false;

  public formGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', validators.Email),
    Phone: new FormControl('', []),
    Country: new FormControl({ value: system.defaultCountry, disabled: true }, []),
    ExtNumber: new FormControl('', []),
    IntNumber: new FormControl('', []),
    Neighborhood: new FormControl('', []),
    Municipality: new FormControl('', []),
    State: new FormControl('', []),
    Street: new FormControl('', []),
    ZipCode: new FormControl('', []),
  });

  //Subjects
  public phone = new FormProp<string>(this.formGroup, 'Phone');
  public street = new FormProp<string>(this.formGroup, 'Street');
  public account = new StorageProp<Account>(null, 'ACCOUNT_SELECTED');
  public roles = new SubjectProp<Role[]>([]);

  constructor(
    public api: AccountsApiService,
    public rolesApi: RolesApiService,
    public router: Router,
    public sessionService: SessionService,
    public nzMessageService: NzMessageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.fetchRoles();
    this.fillForm();

    this.formGroup.controls.Country.disable();
    this.formGroup.controls.Country.setValue(system.defaultCountry);
  }

  bindEvents() {
    this.phone.onChange((value) => {
      if (value && value.length > 0) {
        this.formGroup.controls.Phone.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        this.formGroup.controls.Phone.clearValidators();
      }
    });
  }

  clearState() {
    this.formGroup.reset();
    this.formGroup.controls.Country.setValue(system.defaultCountry);
    this.formGroup.controls.Country.disable();
    this.formGroup.controls.Phone.clearValidators();
    this.account.value = null;
    this.edition = false;
    this.showDeleteModal = false;
    this.showDisabledModal = false;
    this.showChangePasswordModal = false;
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

    const accountRoles = (this.roles.value || [])
      .filter((role) => role.Checked)
      .map((role) => ({
        id: role.id! as unknown as number,
        RoleId: role.id as unknown as number,
        AccountId: account.id as string,
        OrganizationId: this.sessionService.organizationId,
      }));
    this.api.saveAccount(account, accountRoles).then((response) => {
      if (response.success) {
        this.router.navigate([routes.Users]);
        this.nzMessageService.success('Usuario guardado correctamente');
      } else {
        this.nzMessageService.error('Ocurrió un error al guardar el usuario, intenta nuevamente.');
      }
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
    console.log(this.formGroup.controls);
  }

  /**
   * API Calls
   */

  fetchRoles() {
    this.rolesApi.getRoles().then((response) => {
      response.data?.forEach((role) => {
        role.Checked = this.account.value?.AccountRoles?.some(
          (accountRole) => accountRole.RoleId.toString() === role.id?.toString(),
        );
      });
      this.roles.value = response.data ?? [];
    });
  }

  onResendInvitation() {
    const account = this.account.value;
    const message = this.nzMessageService.create('info', 'Reenviando invitación...', {
      nzDuration: 0,
      nzPauseOnHover: true,
      nzAnimate: true,
    });
    if (account?.id) {
      this.api.inviteUser({ action: 'resend', email: account.Email }).then((response) => {
        this.nzMessageService.remove(message.messageId);
        if (response.success) {
          this.nzMessageService.success('Invitación reenviada correctamente');
        } else {
          this.nzMessageService.error('Ocurrió un error al reenviar la invitación, intenta nuevamente.');
        }
      });
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

  onChangePassword() {
    this.showChangePasswordModal = false;
  }

  onBack() {
    this.router.navigate([routes.Users]);
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  openDisabledModal() {
    this.showDisabledModal = true;
  }

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }
}
