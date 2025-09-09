import { InjectionToken } from '@angular/core';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationChannel } from '@bussiness/notifications/interfaces/notifications.strategy.interfaces';

export class CompositeNotificationChannel implements NotificationChannel {
  private channels: NotificationChannel[] = [];

  constructor(channels: NotificationChannel[] = []) {
    this.channels = channels;
  }

  addChannel(channel: NotificationChannel) {
    this.channels.push(channel);
  }

  removeChannel(channel: NotificationChannel) {
    this.channels = this.channels.filter((c) => c !== channel);
  }

  show(notification: Notification): void {
    for (const channel of this.channels) {
      channel.show(notification);
    }
  }
}

export const NOTIFICATION_CHANNEL = new InjectionToken<NotificationChannel>(
  'NotificationChannel'
);
