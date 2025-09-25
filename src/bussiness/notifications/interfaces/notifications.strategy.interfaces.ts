import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';

export interface NotificationChannel {
  show(notification: Notification): void;
}
