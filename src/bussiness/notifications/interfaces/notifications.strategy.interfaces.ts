import { Notification } from './notifications.interfaces';

export interface NotificationChannel {
  show(notification: Notification): void;
}
