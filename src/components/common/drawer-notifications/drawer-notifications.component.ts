import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsMonitorFacade } from '@bussiness/notifications/controllers/notifications.monitor.facade';
import { UITableConstants } from '@globals/constants/supabase-tables.constants';
import { HelperPage } from '@components/common/helper.page';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'drawer-notifications',
  standalone: false,
  templateUrl: './drawer-notifications.component.html',
  styleUrls: ['./drawer-notifications.component.scss'],
})
export class DrawerNotificationsComponent extends HelperPage {
  //Flag Management
  showConfirmModal = false;

  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
    if (value) {
      this.refresh(this.selectedSegment);
    }
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedSegment: string | number = '0';

  constructor(
    public facade: NotificationsMonitorFacade,
    public cdr: ChangeDetectorRef,
    public nzMessageService: NzMessageService,
  ) {
    super();
  }

  /**
   * UI Events
   */
  refresh(segment: string | number = '0', showMessage = false) {
    this.selectedSegment = segment;
    this.facade.api
      .getPagedNotifications({
        page: UITableConstants.DefaultPage,
        pageSize: UITableConstants.DefaultPageSize,
        dateFrom: '',
        dateTo: '',
        readed: segment === '0' ? null : segment === 'false' ? false : true,
        select: null,
        search: null,
        sortBy: 'Readed',
        sortOrder: 'asc',
      })
      .then(() => {
        if (showMessage) {
          this.nzMessageService.success('Actualización exitosa');
        }
      });
  }

  markAllAsRead() {
    this.facade.api.markAllAsRead().then((response) => {
      if (response.success) {
        this.refresh();
      }
    });
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  /**
   * Getters
   */
  get notifications() {
    return this.facade.api.pagedNotifications.value?.data ?? [];
  }

  get busy() {
    return this.facade.api.busy.value;
  }

  /**
   * Life Cycle
   */
  ngAfterViewInit() {}
}

export interface INotifications {
  id: number;
  label: string;
  readed?: boolean;
  url?: string;
}
