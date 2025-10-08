import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { NzMessageService } from 'ng-zorro-antd/message';

import { IAccountsRepository } from '@bussiness/accounts/repository/accounts.repository';
import { IRolesRepository } from '@bussiness/roles/repository/roles.repository';
import { SessionService } from '@bussiness/session/services/session.service';
import { Account } from '@bussiness/accounts/interfaces/users.interfaces';
import { Role } from '@bussiness/accounts/interfaces/users.roles.interfaces';
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

  public formGroupPassword = new FormGroup({
    password: new FormControl('', validators.Password),
    confirmPassword: new FormControl('', validators.Password),
  });

  //Subjects
  public phone = new FormProp<string>(this.formGroup, 'Phone');
  public street = new FormProp<string>(this.formGroup, 'Street');
  public account = new StorageProp<Account>(null, 'ACCOUNT_SELECTED');
  public password = new FormProp<string>(this.formGroupPassword, 'password');
  public roles = new SubjectProp<Role[]>([]);

  constructor(
    public repoAccounts: IAccountsRepository,
    public rolesRepo: IRolesRepository,
    public router: Router,
    public sessionService: SessionService,
    public nzMessageService: NzMessageService,
  ) {
    super(repoAccounts);
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
    this.account.value = null;
    this.edition = false;
    this.formGroup.controls.Country.disable();
    this.formGroup.controls.Country.setValue(system.defaultCountry);
    this.formGroup.controls.Phone.clearValidators();
    this.formGroup.reset();
    this.formGroupPassword.reset();
    this.showChangePasswordModal = false;
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

    const accountRoles = (this.roles.value || [])
      .filter((role) => role.Checked)
      .map((role) => ({
        id: role.id! as unknown as number,
        RoleId: role.id as unknown as number,
        AccountId: this.account.value?.id as string,
        OrganizationId: this.sessionService.organizationId,
      }));
    console.log('accountRoles to save', accountRoles);
    this.repoAccounts.save(account, accountRoles).then((response) => {
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
      this.showChangePasswordModal = false;
      this.showDeleteModal = false;
      this.showDisabledModal = false;
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
      setTimeout(() => {
        this.clearState();
      }, 1);
    }
    console.log(this.formGroup.controls);
  }

  /**
   * API Calls
   */

  fetchRoles() {
    this.rolesRepo.getAll().then((response) => {
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
      this.repoAccounts.inviteUser({ action: 'resend', email: account.Email }).then((response) => {
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
    const error = 'Ocurrió un error al intentar borrar el usuario, intenta nuevamente.';
    const account = this.account.value;
    if (account?.Email) {
      this.repoAccounts.hardDelete(account.Email).then((response) => {
        if (response?.success) {
          this.router.navigate([routes.Users]);
        } else {
          this.showDeleteModal = false;
          this.nzMessageService.error(error);
        }
      });
    }
  }

  onDisable() {
    const error = 'Ocurrió un error al intentar realizar la acción, intenta nuevamente.';
    const user = this.account.value;
    if (user?.id) {
      if (user.Disabled) {
        this.repoAccounts.enable(user.Email).then((response) => {
          if (response.success) {
            this.nzMessageService.success('Usuario habilitado correctamente');
            this.router.navigate([routes.Users]);
          } else {
            this.showDisabledModal = false;
            this.nzMessageService.error(error);
          }
        });
      } else {
        this.repoAccounts.disable(user.Email).then((response) => {
          if (response.success) {
            this.nzMessageService.success('Usuario deshabilitado correctamente');
            this.router.navigate([routes.Users]);
          } else {
            this.showDisabledModal = false;
            this.nzMessageService.error(error);
          }
        });
      }
    }
  }

  async onChangePassword() {
    const account = this.account.value;
    if (account?.id) {
      this.repoAccounts.changePassword({ userId: account.UserId, password: this.password.value! }).then((response) => {
        if (response.success) {
          this.nzMessageService.success('Contraseña cambiada correctamente');
        } else {
          this.nzMessageService.error('Ocurrió un error al cambiar la contraseña, intenta nuevamente.');
        }
        this.showChangePasswordModal = false;
      });
    }
  }

  /**
   * UI Events
   */

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
