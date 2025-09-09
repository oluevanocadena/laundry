import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { NotificationsDomain } from '@bussiness/notifications/domains/notifications.domain';
import { Entities, Notification as INotification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationChannel } from '@bussiness/notifications/interfaces/notifications.strategy.interfaces';
import { NOTIFICATION_CHANNEL } from '@bussiness/notifications/strategy/notifications.composite';
import { SessionService } from '@bussiness/session/services/session.service';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';
import { OrdersApiService } from '@bussiness/orders/services/orders.api.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService extends ApiBaseService {
  public notifications = new SubjectProp<INotification[]>([]);
  public unReadNotifications = new SubjectProp<number>(0);

  private accountId = '';
  private token = '';
  private channel: RealtimeChannel | null = null;

  constructor(
    @Inject(NOTIFICATION_CHANNEL)
    private notificationChannel: NotificationChannel,
    private nzNotificationService: NzNotificationService,
    private router: Router,
    private sessionService: SessionService,
    private ordersApiService: OrdersApiService,
  ) {
    super();
    this.initialize();
  }

  async initialize() {
    if (this.sessionService.isLoggedIn) {
      this.accountId = this.sessionService.accountId;
      this.token = (await this.sessionService.getToken()) ?? '';
      this.client.realtime.logLevel = 'info';
      this._requestPermission();
      this.listenNotifications();
    }
  }

  getNotifications() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .select('*')
        .eq('AccountId', this.sessionService.sessionInfo.value?.Account?.id ?? '');
      if (error) throw error;
      this.notifications.value = data as unknown as INotification[];
      this.unReadNotifications.value = data?.filter((n) => !n.Readed).length ?? 0;
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }

  markAllAsRead() {
    return this.executeWithBusy(async () => {
      const { data, error } = await this.client
        .from(SupabaseTables.Notifications)
        .update({ Readed: true })
        .eq('Readed', false);
      return super.handleResponse(data as unknown as INotification[], error);
    });
  }

  /**
   * Broacast Listen Notifications
   */

  async listenNotifications() {
    // this.client.removeAllChannels();
    if (this.channel) {
      console.log('👉 Channel already exists', this.channel);
      return;
    }

    if (this.token) {
      this.client.realtime.setAuth(this.token);
    }
    this.channel = this.client
      .channel(`notifications-channel`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: SupabaseTables.Notifications,
          filter: `AccountId=eq.${this.accountId}`,
        },
        (payload) => {
          const notification: INotification = NotificationsDomain.mapNotification(payload);
          this.notify(notification);
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('👉 channel status ', status);
        }
      });
  }

  notify(notification: INotification) {
    this.notificationChannel.show(notification);
    this.getNotifications();
    if (notification.Entity === Entities.Order) {
      this.ordersApiService.getOrders();
    }
  }

  private _requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('✅ Permiso para notificaciones concedido');
        }
      });
    }
  }

  stopListening() {
    if (this.channel) {
      this.nzMessageService.warning('⚠️ El canal de notificaciones ha sido desconectado, reintentando conectar...');
      this.client.removeChannel(this.channel);
      console.log('👉 unsubscribed from notifications');
      this.channel = null;
    }
  }
}
