import { AfterViewInit, Component } from '@angular/core';

import { INotificationsRepository } from '@bussiness/notifications/repository/notifications.repository';
import { HelperPage } from '@components/common/helper.page';
import { UITableConstants } from '@globals/constants/supabase-tables.constants';
import { MenuService } from '@globals/services/menu.service';

@Component({
  selector: 'menu-content',
  standalone: false,
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
})
export class MenuContentComponent extends HelperPage implements AfterViewInit {
  constructor(public notificationsApi: INotificationsRepository, public menuService: MenuService) {
    super();
  }

  /**
   * Getters
   */

  get unReadNotifications() {
    return this.notificationsApi.pagedNotifications.value?.unReadCount ?? 0;
  }

  get collapsed() {
    return this.menuService.collapsed.value;
  }

  ngAfterViewInit() {
    if ((this.notificationsApi.pagedNotifications.value?.data?.length ?? 0) > 0 === false) {
      this.notificationsApi.getPaged({
        page: UITableConstants.DefaultPage,
        pageSize: UITableConstants.DefaultPageSize,
        dateFrom: '',
        dateTo: '',
        readed: null,
        select: null,
        search: null,
        sortBy: 'created_At',
        sortOrder: 'desc',
      });
    }
  }
}
