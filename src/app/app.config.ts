import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { TUI_LANGUAGE, TUI_SPANISH_LANGUAGE } from '@taiga-ui/i18n';
import * as moment from 'moment-timezone';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { routes } from '@app/app.routes';
import { IFeedbackRepository } from '@bussiness/feedback/repository/feeback.repository';
import { FeedbackSupabaseRepository } from '@bussiness/feedback/repository/feeback.supabase.repository';
import { NotificationsRealtimeService } from '@bussiness/notifications/services/notifications.realtime.service';
import { CompositeNotificationChannel } from '@bussiness/notifications/strategy/notifications.composite';
import { IOrdersRepository } from '@bussiness/orders/repository/orders.repository';
import { OrdersSupabaseRepository } from '@bussiness/orders/repository/orders.supabase.repository';
import { IUnitMeasureRepository } from '@bussiness/products/repository/unit.measure.repository';
import { UnitMeasureSupabaseRepository } from '@bussiness/products/repository/unit.measure.supabase.repository';
import { AuthInterceptor } from '@globals/interceptors/http.interceptor';
import { NativeNotificationChannel } from '@globals/strategies/notifications/native.notification.channel';
import { NzMessageNotificationChannel } from '@globals/strategies/notifications/nz-message.notification.channel';

registerLocaleData(es);
moment.tz.setDefault('America/Mexico_City');
// moment.tz.setDefault('UTC');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideEventPlugins(),
    { provide: IOrdersRepository, useClass: OrdersSupabaseRepository },
    { provide: IUnitMeasureRepository, useClass: UnitMeasureSupabaseRepository },
    { provide: IFeedbackRepository, useClass: FeedbackSupabaseRepository },
    {
      provide: NotificationsRealtimeService,
      useFactory: (nz: NzNotificationService, router: Router, orders: OrdersSupabaseRepository) => {
        const composite = new CompositeNotificationChannel([
          new NzMessageNotificationChannel(nz, router),
          new NativeNotificationChannel(),
        ]);
        return new NotificationsRealtimeService(composite);
      },
      deps: [NzNotificationService, Router, OrdersSupabaseRepository],
    },
    { provide: TUI_LANGUAGE, useValue: of(TUI_SPANISH_LANGUAGE) },
    { provide: NzIsMenuInsideDropDownToken, useValue: false },
    { provide: NZ_I18N, useValue: es_ES },
    provideNzConfig({ modal: { nzDirection: 'ltr' } }),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    MenuService,
    NzMenuModule,
    NzModalService,
  ],
};
