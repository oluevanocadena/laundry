import { Component, Input } from '@angular/core';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'top-bar-buttons',
  standalone: false,
  templateUrl: './top-bar-buttons.component.html',
  styleUrls: ['./top-bar-buttons.component.scss'],
})
export class TopBarButtonsComponent extends HelperPage {
  showNotifications: boolean = false;

  @Input() loading: boolean = false;

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
    return (this.notifService.unReadNotifications.value ?? 0) > 0;
  }

  /**
   * Life cycle
   */
  ngAfterViewInit() {
    this.notifService.getNotifications();
  }
}
