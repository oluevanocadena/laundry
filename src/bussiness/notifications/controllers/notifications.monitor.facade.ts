import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { NotificationsPageTableColumns } from '@bussiness/notifications/constants/notifications.columns.constant';
import { NotificationsDefaultTableFilter } from '@bussiness/notifications/constants/notifications.constants';
import { Notification } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { SessionService } from '@bussiness/session/services/session.service';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsMonitorFacade extends FacadeBase {
  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'No leídas', value: 'false' },
    { label: 'Leídas', value: 'true' },
  ];

  tableFilter = new SubjectProp<UITableFilterBase>(NotificationsDefaultTableFilter);
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  columns = NotificationsPageTableColumns;

  constructor(
    public api: NotificationsApiService,
    public router: Router,
    public nzMessageService: NzMessageService,
    public sessionService: SessionService,
    public storageService: StorageService,
  ) {
    super(api);
  }

  override initialize() {
    super.initialize();
    this.columns = this.storageService.get('NOTIFICATIONS_COLUMNS') || UtilsDomain.clone(NotificationsPageTableColumns);
    this.fetchNotifications();
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
    const pagination = this.tablePagination.value;
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.api.getPagedNotifications({
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
      dateFrom: starDate!,
      dateTo: endDate!,
      readed: this.tableFilter.value?.segment === 'false' ? false : this.tableFilter.value?.segment === 'true' ? true : null,
      select: this.tableFilter.value?.select ?? null,
      search: this.tableFilter.value?.search ?? null,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
    });
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.fetchNotifications();
  }

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('NOTIFICATIONS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    console.log('👉🏽 filter', filter);
    this.tableFilter.value = filter as UITableFilterBase;
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
