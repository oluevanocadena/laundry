import { Inject, Injectable } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';

import { NotificationsDomain } from '@bussiness/notifications/domains/notifications.domain';
import { Notification as INotifications } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationChannel } from '@bussiness/notifications/interfaces/notifications.strategy.interfaces';
import { NOTIFICATION_CHANNEL } from '@bussiness/notifications/strategy/notifications.composite';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { ApiBaseService } from '@globals/services/api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsRealtimeService extends ApiBaseService {
  private accountId = '';
  private token = '';
  private channel: RealtimeChannel | null = null;

  public onReceiveNotification = new SubjectProp<INotifications>();

  constructor(
    @Inject(NOTIFICATION_CHANNEL)
    private notificationChannel: NotificationChannel,
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

  private _requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('🔔 Permiso para notificaciones concedido');
        }
      });
    }
  }

  public stopListening() {
    if (this.channel) {
      this.nzMessageService.warning('⚠️ El canal de notificaciones ha sido desconectado, reintentando conectar...');
      this.client.removeChannel(this.channel);
      console.log('👉 unsubscribed from notifications');
      this.channel = null;
    }
  }

  private _notify(notification: INotifications) {
    this.notificationChannel.show(notification);
    this.onReceiveNotification.value = notification;
  }

  /**
   * Broacast Listen Notifications
   */

  async listenNotifications() {
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
          const notification: INotifications = NotificationsDomain.mapNotification(payload);
          this._notify(notification);
        },
      )
      .subscribe((status) => {
        console.log('📢 Notificaciones realtime status ', status);
      });
  }
}
