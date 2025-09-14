import { AfterViewInit, Component } from '@angular/core';
import { NotificationsMonitorFacade } from '@bussiness/notifications/controllers/notifications.monitor.facade';
import { HelperPage } from '@components/common/helper.page';
import { TypeFilterShow } from '@components/common/table-filters/table-filters.component';

@Component({
  selector: 'page-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsPageComponent extends HelperPage implements AfterViewInit {

  showType: TypeFilterShow = {
    calendar: true,
    sort: true,
  };

  constructor(public facade: NotificationsMonitorFacade) {
    super();
  }

  /**
   * Getters
   */

  get data() {
    return this.facade.api.pagedNotifications.value?.data ?? [];
  }

  get rowCount() {
    return this.facade.api.pagedNotifications.value?.count ?? 0;
  }

  get busy() {
    return this.facade.api.busy.value;
  }

  /**
   * Lifecycle
   */
  ngAfterViewInit() {
    this.facade.fetchNotifications();
  }
}
