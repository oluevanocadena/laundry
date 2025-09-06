import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { FacadeBase } from "@globals/types/facade.base";
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

@Injectable({
  providedIn: 'root',
})
export class NotificationsMonitorFacade extends FacadeBase {

    
  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'Activas', value: 'false' },
    { label: 'Leídas', value: 'true' },
  ];

  constructor(public api: NotificationsApiService, public router: Router) {
    super(api);
  }

  override initialize() {
    super.initialize();
  }

  bindEvents() {}
  
  clearState() {}

  submitForm() {}

  /**
   * API Calls
   */
  
  fetchNotifications() {
    this.api.getNotifications();
  }

  /**
   * UI Events
   */

  onMarkAllAsReadClick() {
    this.api.markAllAsRead();
  }

  onSegmentChange(value: string | number) { 
    this.fetchNotifications();
  }
  
  onNotificationClick(notification: Notification) {
    console.log('👉🏽 onNotificationClick', notification);
  }

  onNewNotification() {
    // this.router.navigate([routes.NotificationDraft]);
  }
}
