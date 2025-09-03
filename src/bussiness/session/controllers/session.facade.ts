import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { FacadeBase } from '../../../globals/types/facade.base';
import { FormProp } from '../../../globals/types/form.type';
import { StorageProp } from '../../../globals/types/storage.type';
import { validators } from '../../../globals/types/validators.type';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountsApiService } from '../services/accounts.api.service';
import { SessionApiService } from '../services/session.api.service';
import { SessionInfo } from '../session.interface';
import { SessionService } from '../services/session.service';

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
    public apiAccounts: AccountsApiService,
    public apiLocations: LocationsApiService,
    public nzMessageService: NzMessageService,
    public sessionService: SessionService,
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

  async login() {
    if (!this.formGroup.valid) {
      this.nzMessageService.warning('Por favor, complete todos los campos.');
      return;
    }

    try {
      const session = await this.api.signIn(
        this.email.value!,
        this.password.value!
      );
      if (!session) {
        throw new Error('Session not found');
      }

      const account = await this.apiAccounts.getAccount(session.user?.email!);
      if (!account) {
        throw new Error('Account not found');
      }

      const location = await this.apiLocations.getDefaultLocation(
        account.OrganizationId
      );

      const sessionInfo: SessionInfo = {
        Session: session.session,
        Account: account,
        Location: location ?? null,
      };

      console.log('👉🏽 Logged In SessionInfo', sessionInfo);
      this.sessionService.SessionInfo.value = sessionInfo;
      this.router.navigate([routes.Home]);
    } catch (error) {
      console.error('Error during login:', error);
      this.nzMessageService.error(
        'Ocurrió un error al iniciar sesión, intenta nuevamente.'
      );
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

  /**
   * Methods
   */

  checkProfileCompletion() {
    if (this.sessionService.isLoggedIn) {
      const user = this.sessionService.SessionInfo.value;
      console.log('🚀 Usuario autenticado', user);
      if (!user?.Location && this.router.url !== routes.Setup) {
        console.log('🔒 Usuario pero sin datos completos', user);
        this.router.navigate([routes.Setup]);
      }
    }
  }
}
