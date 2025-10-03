import { Provider } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsRealtimeService } from '@bussiness/notifications/services/notifications.realtime.service';
import { CompositeNotificationChannel } from '@bussiness/notifications/strategy/notifications.composite';
import { OrdersSupabaseRepository } from '@bussiness/orders/repository/orders.supabase.repository';
import { NativeNotificationChannel } from '@globals/strategies/notifications/native.notification.channel';
import { NzMessageNotificationChannel } from '@globals/strategies/notifications/nz-message.notification.channel';
import { NzNotificationService } from 'ng-zorro-antd/notification';

/**
 * Providers para servicios de la aplicación
 */
export const serviceProviders: Provider[] = [
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
];
