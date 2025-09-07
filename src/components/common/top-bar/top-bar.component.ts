import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent extends HelperPage {
  //Flag Management
  showShortMenu: boolean = false;

  //form
  form = new FormGroup({
    search: new FormControl(''),
  });

  // Properties
  @Input() title: string = '';

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  /**
   * UI Events
   */
  //Flag Management
  openMenu() {
    this.showShortMenu = true;
  }

  closeMenu() {
    this.showShortMenu = false;
  }

  /**
   * Lifecycle
   */
  ngAfterViewInit() {}
}
