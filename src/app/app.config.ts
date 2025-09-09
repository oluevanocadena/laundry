import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';

import { TUI_LANGUAGE, TUI_SPANISH_LANGUAGE } from '@taiga-ui/i18n';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { NativeNotificationChannel } from '@bussiness/notifications/strategy/native.notification.channel';
import { CompositeNotificationChannel } from '@bussiness/notifications/strategy/notifications.composite';
import { NzMessageNotificationChannel } from '@bussiness/notifications/strategy/nz-message.notification.channel';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';
import { SessionService } from '@bussiness/session/services/session.service';

import { of } from 'rxjs';
import { routes } from './app.routes';

const ngZorroConfig: NzConfig = {
  modal: {
    nzDirection: 'ltr',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: NotificationsApiService,
      useFactory: (nz: NzNotificationService, router: Router, ss: SessionService, orders: OrdersApiService) => {
        const composite = new CompositeNotificationChannel([
          new NzMessageNotificationChannel(nz, router),
          new NativeNotificationChannel(),
        ]);
        return new NotificationsApiService(composite, nz, router, ss, orders);
      },
      deps: [NzNotificationService, Router, SessionService, OrdersApiService],
    },
    provideNzConfig(ngZorroConfig),
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_SPANISH_LANGUAGE),
    },
    { provide: NzIsMenuInsideDropDownToken, useValue: false },
    MenuService,
    NzMenuModule,
    NzModalService,
  ],
};
