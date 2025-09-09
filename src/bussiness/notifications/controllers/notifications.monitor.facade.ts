import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { SupabaseTableSettings } from '@globals/constants/supabase-tables.constants';
import { FilterTableService } from '@globals/services/filter.table.service';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsMonitorFacade extends FacadeBase {
  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'No leídas', value: 'false' },
    { label: 'Leídas', value: 'true' },
  ];

  selectedSegment = new SubjectProp<string>('0');

  constructor(
    public api: NotificationsApiService,
    public router: Router,
    public filterTableService: FilterTableService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.bindEvents();
  }

  bindEvents() {
    this.api.pageNotifications.onChange((notifications) => {
      console.log('👉🏽 notifications', notifications);
      this.filterTableService.calcTotalPages(notifications.length);
    });
  }

  clearState() {}

  submitForm() {}

  /**
   * API Calls
   */

  fetchNotifications() {
    this.api.getPageNotifications({
      page: this.filterTableService.page.value ?? 1,
      pageSize: this.filterTableService.pageSize.value ?? SupabaseTableSettings.PageSize,
      readed: this.selectedSegment.value === 'true' ? true : this.selectedSegment.value === 'false' ? false : null,
    });
  }

  /**
   * UI Events
   */

  onMarkAllAsReadClick() {
    this.api.markAllAsRead().then(() => {
      this.fetchNotifications();
    });
  }

  onSegmentChange(value: string | number) {
    this.selectedSegment.value = value.toString();
    this.fetchNotifications();
  }

  onNotificationClick(notification: Notification) {
    console.log('👉🏽 onNotificationClick', notification);
  }

  onNewNotification() {
    // this.router.navigate([routes.NotificationDraft]);
  }
}
