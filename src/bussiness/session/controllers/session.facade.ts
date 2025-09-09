import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { LocationsApiService } from '@bussiness/locations/locations.api.service';
import { supabase } from '@environments/environment';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { validators } from '@globals/types/validators.type';
import { createClient } from '@supabase/supabase-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountsApiService } from '../services/accounts.api.service';
import { SessionApiService } from '../services/session.api.service';
import { SessionService } from '../services/session.service';
import { SessionInfo } from '../session.interface';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';

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
    public apiNotifications: NotificationsApiService,
    public apiOrders: OrdersApiService,
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

      const account = await this.apiAccounts.getAccount(
        session.data!.user?.email!
      );
      if (!account) {
        throw new Error('Account not found');
      }

      const roles = await this.apiAccounts.getAccountRoles(account.data!.id!);
      if (!roles) {
        throw new Error('Roles not found');
      }

      const location = await this.apiLocations.getDefaultLocation(
        account.data!.OrganizationId
      );

      const sessionInfo: SessionInfo = {
        Session: session.data!,
        Account: account.data!,
        Location: location ?? null,
        Roles: roles.data ?? [],
      };
      console.log('👉🏽 Logged In SessionInfo', sessionInfo);
      this.sessionService.sessionInfo.value = sessionInfo;
      this.apiNotifications.initialize();
      this.router.navigate([routes.Home]);
    } catch (error: any) {
      console.error(error);
      this.nzMessageService.error(
        error?.message ||
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
