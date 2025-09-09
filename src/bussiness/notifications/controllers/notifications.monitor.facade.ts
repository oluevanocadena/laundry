import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { TablePagination } from '@globals/types/types';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';

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
  tabelFilter = new SubjectProp<TablePagination>(UIDefaultTablePagination);

  constructor(public api: NotificationsApiService, public router: Router) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.bindEvents();
  }

  bindEvents() {
    this.api.pageNotifications.onChange((notifications) => {
      console.log('👉🏽 notifications', notifications);
    });
  }

  clearState() {}

  submitForm() {}

  /**
   * API Calls
   */

  fetchNotifications() {
    this.api.getPageNotifications({
      page: this.tabelFilter.value?.page ?? UITableConstants.DefaultPage,
      pageSize: this.tabelFilter.value?.pageSize ?? UITableConstants.DefaultPageSize,
      readed: this.selectedSegment.value === 'true' ? true : this.selectedSegment.value === 'false' ? false : null,
    });
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: TablePagination) {
    this.tabelFilter.value = filter;
    console.log('👉🏽 onTablePaginationChange', filter);
    this.fetchNotifications();
  }

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
