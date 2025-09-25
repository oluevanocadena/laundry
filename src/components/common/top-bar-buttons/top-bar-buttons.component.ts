import { Component, Input } from '@angular/core';

import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'top-bar-buttons',
  standalone: false,
  templateUrl:   './top-bar-buttons.component.html',
  styleUrls: ['./top-bar-buttons.component.scss'],
})
export class TopBarButtonsComponent extends HelperPage {
  // Flag Management
  showNotifications: boolean = false;

  // Inputs
  @Input() loading: boolean = false;

  // Properties
  unReadCount: number = 0;

  constructor(public notifService: NotificationsApiService) {
    super();
  }

  /**
   * UI Events
   */

  openNotifications() {
    this.showNotifications = true;
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  /**
   * Getters
   */

  get showDot() {
    return (this.notifService.pagedNotifications.value?.unReadCount ?? 0) > 0;
  }

  /**
   * Life cycle
   */
  ngAfterViewInit() {
    this.notifService.getUnReadCount().then((res) => {
      this.unReadCount = res.count ?? 0;
    });
  }
}
