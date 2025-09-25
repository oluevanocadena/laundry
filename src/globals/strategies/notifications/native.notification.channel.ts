import { NotificationsDomain } from '@bussiness/notifications/domains/notifications.domain';
import { Notification as INotification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationChannel } from '@bussiness/notifications/interfaces/notifications.strategy.interfaces';

export class NativeNotificationChannel implements NotificationChannel {
  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('❌ Permiso de notificación denegado');
      }
    }
  }

  show(notification: INotification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      const n = new Notification(notification.Title, {
        body: notification.Message,
        icon: '/logo.png',
      });

      n.onclick = () => {
        window.focus();
        const url = NotificationsDomain.getUrlMap(
          notification.Entity,
          notification.Metadata.id
        );
        window.location.href = url;
      };
    }
  }
  
}
