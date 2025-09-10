import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { MenuService } from '@globals/services/menu.service';

@Component({
  selector: 'menu-content',
  standalone: false,
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
})
export class MenuContentComponent extends HelperPage implements OnInit {
  constructor(public notifService: NotificationsApiService, public menuService: MenuService) {
    super();
  }

  /**
   * Getters
   */

  get unReadNotifications() {
    return this.notifService.pagedNotifications.value?.unReadCount ?? 0;
  }

  get collapsed() {
    return this.menuService.collapsed.value;
  }

  ngOnInit() {}
}
