import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'home-section-banner',
  standalone: false,
  templateUrl: './section-banner.component.html',
  styleUrls: ['./section-banner.component.scss'],
})
export class HomeSectionBannerComponent extends HelperPage {
  constructor() {
    super();
  }

  ngOnInit() {}
}
