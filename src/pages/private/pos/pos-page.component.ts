import { AfterViewInit, Component } from '@angular/core';

import { PosFacade } from '@bussiness/pos/controllers/pos.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'pos-page',
  standalone: false,
  templateUrl: './pos-page.component.html',
  styleUrls: ['./pos-page.component.scss'],
})
export class PosPageComponent extends HelperPage implements AfterViewInit {
  tabs = [1, 2, 3];

  constructor(public facade: PosFacade) {
    super();
  }

  /**
   * Getters
   */
 

  /**
   * Lifecycle
   */

  ngAfterViewInit() {
    this.facade.initialize();
  }
}
