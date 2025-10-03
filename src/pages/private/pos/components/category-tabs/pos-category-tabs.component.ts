import { Component, OnInit } from '@angular/core';
import { PosFacade } from '@bussiness/pos/controllers/pos.facade';

@Component({
  selector: 'pos-category-tabs',
  standalone: false,
  templateUrl: './pos-category-tabs.component.html',
  styleUrls: ['./pos-category-tabs.component.scss'],
})
export class PosCategoryTabsComponent implements OnInit {
  constructor(public facade: PosFacade) {}

  /**
   * Getters
   */

  get tabsCategories() {
    return this.facade.repoCategories.productCategories.value?.data ?? [];
  }

  ngOnInit() {}
}
