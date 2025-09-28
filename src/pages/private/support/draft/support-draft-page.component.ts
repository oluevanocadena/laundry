import { Component, OnInit } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { HelperPage } from '@components/common/helper.page';
import { UIModule } from '@components/ui.module';

@Component({
  selector: 'support-draft-page',
  standalone: false,
  templateUrl: './support-draft-page.component.html',
  styleUrls: ['./support-draft-page.component.scss'], 
})
export class SupportDraftPageComponent extends HelperPage implements OnInit {
  constructor(public facade: SupportDraftFacade) {
    super();
  }

  ngOnInit() {
    this.facade.initialize();
  }
}
