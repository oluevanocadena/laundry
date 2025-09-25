import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends HelperPage {
  // Arrays
  menuOptions: MenuOptions[] = [{ label: 'Inicio', url: this.routes.Home }];

  constructor(public router: Router) {
    super();
  }

  /**
   * UI Events
   */

  protected readonly open = signal(false);

  onClose() {
    this.open.set(false);
  }

  onClickOption(url?: string) {
    if (url) this.router.navigate([url]);
  }
}

export interface MenuOptions {
  label: string;
  url: string;
}
