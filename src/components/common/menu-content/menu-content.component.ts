import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';

@Component({
  selector: 'menu-content',
  standalone: false,
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
})
export class MenuContentComponent extends HelperPage implements OnInit {
  @Input() collapsed: boolean = false;

  constructor(public notifService: NotificationsApiService) {
    super();
  }

  /**
   * Getters
   */

  get unReadNotifications() {
    return this.notifService.unReadNotifications.value ?? 0;
  }

  ngOnInit() {}
}
