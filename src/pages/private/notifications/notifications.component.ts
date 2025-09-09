import { AfterViewInit, Component } from '@angular/core';
import { NotificationsMonitorFacade } from '@bussiness/notifications/controllers/notifications.monitor.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'page-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsPageComponent extends HelperPage implements AfterViewInit {
  constructor(public facade: NotificationsMonitorFacade) {
    super();
  }

  /**
   * Getters
   */

  get data() {
    return this.facade.api.pageNotifications.value;
  }

  get rowCount() {
    return this.facade.api.pageNotifications.value?.length ?? 0;
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
