import { Component, HostListener, OnInit } from '@angular/core';

import { HelperPage } from '@components/common/helper.page';
import { MenuService } from '@globals/services/menu.service';

@Component({
  selector: 'side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends HelperPage implements OnInit {
  constructor(public menuService: MenuService) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  override onResize(event: any) {
    super.onResize(event);
    if (this.isMobileOrTablet) {
      this.menuService.collapsed.value = false;
    }
  }

  /**
   * UI Events
   */

  /**
   * Getters
   */
  get collapsed() {
    return this.menuService.collapsed.value;
  }

  ngOnInit() {}
}
