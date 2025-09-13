import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);

  constructor(public api: NotificationsApiService, public router: Router, public nzMessageService: NzMessageService) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.bindEvents();
  }

  bindEvents() {
    this.api.pagedNotifications.onChange((notifications) => {
      console.log('👉🏽 notifications', notifications);
    });
  }

  clearState() {}

  submitForm() {}

  /**
   * API Calls
   */

  fetchNotifications() {
    this.api.getPagedNotifications({
      page: this.tablePagination.value?.page ?? UITableConstants.DefaultPage,
      pageSize: this.tablePagination.value?.pageSize ?? UITableConstants.DefaultPageSize,
      readed: this.selectedSegment.value === 'true' ? true : this.selectedSegment.value === 'false' ? false : null,
    });
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.fetchNotifications();
  }

  onMarkAllAsReadClick() {
    this.api.markAllAsRead().then((response) => {
      if (response.success) {
        this.nzMessageService.success('Notificaciones actualizadas');
        this.fetchNotifications();
      } else {
        this.nzMessageService.error('Ocurrió un error al actualizar las notificaciones');
      }
    });
  }

  onSegmentChange(value: string | number) {
    this.selectedSegment.value = value.toString();
    this.fetchNotifications();
  }

  onNotificationClick(notification: Notification) {
    this.api.markAsRead(notification?.id!).then((response) => {
      console.log('👉🏽 response', response);
      if (response.success) {
        this.nzMessageService.success('Notificación marcada como leída');
        this.fetchNotifications();
      } else {
        this.nzMessageService.error('Ocurrió un error al marcar la notificación como leída');
      }
    });
  }

  onNewNotification() {
    // this.router.navigate([routes.NotificationDraft]);
  }
}
