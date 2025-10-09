import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { createClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';

import { IAccountsRepository } from '@bussiness/accounts/repository/accounts.repository';
import { ILocationsRepository } from '@bussiness/locations/repository/locations.repository';
import { NotificationsRealtimeService } from '@bussiness/notifications/services/notifications.realtime.service';
import { SessionInfo } from '@bussiness/session/interfaces/session.interface';
import { SessionApiService } from '@bussiness/session/services/session.api.service';
import { SessionService } from '@bussiness/session/services/session.service';
import { supabase } from '@environments/environment';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { validators } from '@globals/types/validators.type';
import { ErrorHandlerService } from '@globals/bussiness/error/services/error.handler.service';
import { LoggerService } from '@globals/services/logger.service';

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

  client = createClient(supabase.url, supabase.key);

  constructor(
    public api: SessionApiService,
    public realTimeNotifications: NotificationsRealtimeService,
    public repoAccounts: IAccountsRepository,
    public repoLocations: ILocationsRepository,
    public errorHandlerService: ErrorHandlerService,
    public sessionService: SessionService,
    public router: Router,
    private nzMessageService: NzMessageService,
    private logger: LoggerService,
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
      this.logger.warn('Intento de login con campos incompletos', 'SessionFacade');
      this.nzMessageService.warning('Por favor, complete todos los campos.');
      return;
    }

    try {
      const responseSession = await this.api.signIn(this.email.value!, this.password.value!);
      if (responseSession?.error) {
        throw responseSession.error?.raw;
      }

      const responseAccount = await this.repoAccounts.getByEmail(responseSession.data!.user?.email!);
      if (responseAccount && responseAccount.error) {
        throw new Error(responseAccount.error?.raw);
      }

      const rolesResponse = await this.repoAccounts.getAccountRoles(responseAccount?.data!.id!);
      if (rolesResponse?.error) {
        throw new Error(rolesResponse.error?.raw);
      }

      const responseLocation = await this.repoLocations.getDefaultLocation(responseAccount?.data!.OrganizationId!);
      if (responseLocation?.error) {
        throw new Error(responseLocation.error?.raw);
      }

      const sessionInfo: SessionInfo = {
        Session: responseSession.data!,
        Account: responseAccount?.data!,
        Location: responseLocation.data!,
        Roles: rolesResponse.data ?? [],
      };
      this.sessionService.sessionInfo.value = sessionInfo;
      this.realTimeNotifications.initialize();
      this.router.navigate([routes.Home]);
    } catch (error: any) {
      this.signOut();
      this.errorHandlerService.handleError(error, 'Session Facade');
    }
  }

  signOut() {
    this.api.signOut().then((res) => {
      if (res) {
        console.log('signOut');
        this.router.navigate([routes.Login]);
      }
    });
    this.sessionService.clearSession();
    this.client.removeAllChannels();
  }

  /**
   * Methods
   */

  checkProfileCompletion() {
    if (this.sessionService.isLoggedIn) {
      const user = this.sessionService.sessionInfo.value;
      console.log('🚀 Usuario autenticado', user);
      if (!user?.Location && this.router.url !== routes.Setup) {
        console.log('🔒 Usuario pero sin datos completos', user);
        this.router.navigate([routes.Setup]);
      }
    }
  }
}
