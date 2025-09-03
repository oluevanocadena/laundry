import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { AccountsApiService } from '@bussiness/session/services/accounts.api.service';
import { OrganizationsApiService } from '@bussiness/session/services/organizations.api.service';
import { Organization } from '@bussiness/session/organizations.interface';
import { SessionService } from '@bussiness/session/services/session.service';
import { SessionInfo } from '@bussiness/session/session.interface';
import { system } from '@environments/environment';
import { FacadeBase } from '../../../globals/types/facade.base';
import { SubjectProp } from '../../../globals/types/subject.type';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class SetupFacade extends FacadeBase {
  formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    organizationName: new FormControl('', [Validators.required]),
  });

  formGroupLocation = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    country: new FormControl({ value: system.defaultCountry, disabled: true }),
    externalNumber: new FormControl(''),
    internalNumber: new FormControl(''),
    municipality: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    default: new FormControl(true),
  });

  step: number = 0;

  organization = new SubjectProp<Organization>(null);

  constructor(
    public locationsApi: LocationsApiService,
    public organizationApi: OrganizationsApiService,
    public accountApi: AccountsApiService,
    public sessionService: SessionService,
    public nzMessageService: NzMessageService,
    public router: Router
  ) {
    super(locationsApi);
  }

  public override initialize(): void {
    super.initialize();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * Ui Events
   */

  onClickNext() {
    this.step = this.step + 1;
  }

  onClickBack() {
    this.step = this.step - 1;
  }

  async onClickComplete() {
    try {
      let account = this.sessionService.SessionInfo.value?.Account;
      let organization = account?.Organization;
      if (organization && organization.id && account) {
        organization = await this.organizationApi.saveOrganization({
          ...organization,
          Name: this.formGroup.value.organizationName!,
        });

        if (!organization) {
          throw new Error('Error al crear la organización');
        }

        const country =
          this.formGroupLocation.value.country || system.defaultCountry;

        account = await this.accountApi.saveAccount({
          id: account.id,
          Email: account.Email,
          FirstName: this.formGroup.value.firstName!,
          LastName: this.formGroup.value.lastName!,
          Phone: this.formGroup.value.phone!,
          ExtNumber: this.formGroupLocation.value.externalNumber!,
          IntNumber: this.formGroupLocation.value.internalNumber!,
          Street: this.formGroupLocation.value.street!,
          Neighborhood: this.formGroupLocation.value.neighborhood!,
          Municipality: this.formGroupLocation.value.municipality!,
          State: this.formGroupLocation.value.state!,
          ZipCode: this.formGroupLocation.value.zipCode!,
          IsOwner: true,
          Country: country,
          OrganizationId: organization.id!,
        });

        if (!account) {
          throw new Error('Error al crear la cuenta');
        }

        const response = await this.locationsApi.saveLocation({
          Name: this.formGroupLocation.value.name!,
          Phone: this.formGroupLocation.value.phone!,
          Country: country,
          ExtNumber: this.formGroupLocation.value.externalNumber!,
          IntNumber: this.formGroupLocation.value.internalNumber!,
          Street: this.formGroupLocation.value.street!,
          Neighborhood: this.formGroupLocation.value.neighborhood!,
          Municipality: this.formGroupLocation.value.municipality!,
          State: this.formGroupLocation.value.state!,
          ZipCode: this.formGroupLocation.value.zipCode!,
          Default: true,
          OrganizationId: organization.id!,
        });

        if (response?.success === false) {
          throw new Error('Error al crear la ubicación');
        }

        this.sessionService.SessionInfo.value = {
          ...this.sessionService.SessionInfo.value,
          Account: {
            ...account,
            Organization: organization,
          },
          Location: response?.response,
        } as SessionInfo;

        this.nzMessageService.success(
          'Se completó la configuración correctamente'
        );
        this.router.navigate([routes.Home]);
      }
    } catch (error: any) {
      this.nzMessageService.error(
        error.message || 'Ocurrió un error al completar el setup'
      );
    }
  }

  /**
   * Getters
   */

  get canNextStepOrganization() {
    return this.formGroup.valid;
  }

  get canComplete() {
    return this.formGroupLocation.valid;
  }
}
