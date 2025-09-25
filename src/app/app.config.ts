import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';

import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { TUI_LANGUAGE, TUI_SPANISH_LANGUAGE } from '@taiga-ui/i18n';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { NativeNotificationChannel } from '@globals/strategies/notifications/native.notification.channel';
import { CompositeNotificationChannel } from '@bussiness/notifications/strategy/notifications.composite';
import { NzMessageNotificationChannel } from '@globals/strategies/notifications/nz-message.notification.channel';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';

import { NotificationsRealtimeService } from '@bussiness/notifications/services/notifications.realtime.service';
import { of } from 'rxjs';
import { routes } from './app.routes';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from '@globals/interceptors/http.interceptor';
registerLocaleData(es);

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
    provideEventPlugins(),
    {
      provide: NotificationsRealtimeService,
      useFactory: (nz: NzNotificationService, router: Router, orders: OrdersApiService) => {
        const composite = new CompositeNotificationChannel([
          new NzMessageNotificationChannel(nz, router),
          new NativeNotificationChannel(),
        ]);
        return new NotificationsRealtimeService(composite);
      },
      deps: [NzNotificationService, Router, OrdersApiService],
    },
    provideNzConfig(ngZorroConfig),
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_SPANISH_LANGUAGE),
    },
    { provide: NzIsMenuInsideDropDownToken, useValue: false },
    { provide: NZ_I18N, useValue: es_ES },
    provideHttpClient(withInterceptors([AuthInterceptor])),
    MenuService,
    NzMenuModule,
    NzModalService,
  ],
};
