import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

import { NotificationsPageTableColumns } from '@bussiness/notifications/constants/notifications.columns.constant';
import { NotificationsDefaultTableFilter } from '@bussiness/notifications/constants/notifications.constants';
import { Notification, NotificationRequest } from '@bussiness/notifications/interfaces/notifications.interfaces';
import { INotificationsRepository } from '@bussiness/notifications/repository/notifications.repository';
import { SessionService } from '@bussiness/session/services/session.service';

import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableActions, UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsMonitorFacade extends FacadeBase {
  // Flag Management
  showDeleteNotificationsModal = false;

  showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: true,
    sort: true,
  };

  segments: NzSegmentedOption[] = [
    { label: 'Todas', value: '0' },
    { label: 'No leídas', value: 'false' },
    { label: 'Leídas', value: 'true' },
  ];

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteNotificationsModal() },
    { label: 'Marcar como leídas', icon: 'check', appearance: 'default', action: () => this.onMarkManyAsReadClick() },
  ];

  tableFilter = new SubjectProp<UITableFilterBase>(NotificationsDefaultTableFilter);
  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  columns = NotificationsPageTableColumns;

  constructor(
    public repo: INotificationsRepository,
    public router: Router,
    public nzMessageService: NzMessageService,
    public sessionService: SessionService,
    public storageService: StorageService,
  ) {
    super(repo);
  }

  override initialize() {
    super.initialize();
    this.columns = this.storageService.get('NOTIFICATIONS_COLUMNS') || UtilsDomain.clone(NotificationsPageTableColumns);
    this.fetchNotifications();
    this.bindEvents();
  }

  bindEvents() {}

  clearState() {}

  submitForm() {}

  /**
   * API Calls
   */

  fetchNotifications() {
    const pagination = this.tablePagination.value;
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.repo.getPaged({
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
      dateFrom: starDate!,
      dateTo: endDate!,
      readed: this.tableFilter.value?.segment === 'false' ? false : this.tableFilter.value?.segment === 'true' ? true : null,
      select: this.tableFilter.value?.select ?? null,
      search: this.tableFilter.value?.search ?? null,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
    } as NotificationRequest);
  }

  /**
   * UI Events
   */

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.repo.cacheStore.clear();
    this.fetchNotifications();
  }

  onColumnsChange(columns: UITableColumn[]) {
    this.storageService.set('NOTIFICATIONS_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchNotifications();
  }

  onMarkAllAsReadClick() {
    this.repo.markAllAsRead().then((response) => {
      if (response.success) {
        this.nzMessageService.success('Notificaciones actualizadas');
        this.fetchNotifications();
      } else {
        this.nzMessageService.error('Ocurrió un error al actualizar las notificaciones');
      }
    });
  }

  onMarkManyAsReadClick() {
    const ids = this.selectedRows
      .filter((notification) => notification.Readed === false)
      .map((notification) => notification.id!);
    this.repo.markManyAsRead(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Notificaciones actualizadas');
        this.fetchNotifications();
      } else {
        this.nzMessageService.error('Ocurrió un error al actualizar las notificaciones');
      }
    });
  }

  onNotificationClick(notification: Notification) {
    if (notification.Readed === false) {
      this.repo.markAsRead(notification?.id!).then((response) => {
        if (response.success) {
          this.nzMessageService.success('Notificación marcada como leída');
          this.fetchNotifications();
        } else {
          this.nzMessageService.error('Ocurrió un error al marcar la notificación como leída');
        }
      });
    }
  }

  onNewNotification() {
    // this.router.navigate([routes.NotificationDraft]);
  }

  onDeleteNotifications() {
    const ids = this.selectedRows.map((notification) => notification.id!);
    this.repo.deleteMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Notificaciones eliminadas');
        this.fetchNotifications();
      } else {
        this.nzMessageService.error('Ocurrió un error al eliminar las notificaciones');
      }
      this.showDeleteNotificationsModal = false;
    });
  }

  openDeleteNotificationsModal() {
    this.showDeleteNotificationsModal = true;
  }

  /**
   * Getters
   */

  get selectedRows() {
    return this.repo.pagedNotifications.value?.data.filter((notification) => notification.Checked) ?? [];
  }
}
