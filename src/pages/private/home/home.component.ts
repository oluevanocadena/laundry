import { Component } from '@angular/core';
import { HomeFacade } from '@bussiness/home/controllers/home.facade';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends HelperPage {
  constructor(
    public facade: HomeFacade,
    public sessionFacade: SessionFacade
  ) {
    super();
  }

  /**
   * UI Events
   */



  /**
   * LifeCycle
   */

  ngOnInit() {}
}
