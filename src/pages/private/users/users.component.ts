import { AfterViewInit, Component } from '@angular/core';
import { UsersMonitorFacade } from '@bussiness/users/controllers/users.monitor.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersPageComponent extends HelperPage implements AfterViewInit {
  constructor(public facade: UsersMonitorFacade) {
    super();
  }
  /**
   * Lifecycle
   */

  ngAfterViewInit() {
    this.facade.fetchUsers();
  }
}
