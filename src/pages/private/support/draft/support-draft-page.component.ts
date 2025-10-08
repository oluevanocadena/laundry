import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'support-draft-page',
  standalone: false,
  templateUrl: './support-draft-page.component.html',
  styleUrls: ['./support-draft-page.component.scss'],
})
export class SupportDraftPageComponent extends HelperPage implements OnInit, OnDestroy {
  constructor(public facade: SupportDraftFacade) {
    super();
  }
  
  /**
   * Lifecycle
   */

  ngOnInit() {
    this.facade.initialize();
  }

  ngOnDestroy(): void {
    this.facade.unbindEvents();
  }
}
