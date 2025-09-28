import { Component, Input } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'support-generals',
  standalone: false,
  templateUrl: './support-generals.component.html',
  styleUrls: ['./support-generals.component.scss'],
})
export class SupportGeneralsComponent extends HelperPage {
  @Input() collapsed: boolean = false;
  constructor(public facade: SupportDraftFacade) {
    super();
  }

  /**
   * Getters
   */
}
