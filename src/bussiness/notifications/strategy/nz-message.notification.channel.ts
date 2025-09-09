// nz-message-notification.channel.ts
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { NotificationsDomain } from '@bussiness/notifications/domains/notifications.domain';
import { Notification as INotification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationChannel } from '@bussiness/notifications/interfaces/notifications.strategy.interfaces';

export class NzMessageNotificationChannel implements NotificationChannel {
  constructor(
    private readonly nzNotificationService: NzNotificationService,
    private readonly router: Router
  ) {}

  show(n: INotification): void {
    const type = NotificationsDomain.notificationType(n.Event);
    const notification = this.nzNotificationService.create(
      type,
      n.Title,
      n.Message,
      { nzDuration: 10000 }
    );

    notification.onClick.subscribe(() => {
      this.router.navigate([
        NotificationsDomain.getUrlMap(n.Entity, n.Metadata.id),
      ]);
    });
  }
}
