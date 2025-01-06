import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'top-bar-buttons',
  standalone: false,
  templateUrl: './top-bar-buttons.component.html',
  styleUrls: ['./top-bar-buttons.component.scss'],
})
export class TopBarButtonsComponent extends HelperPage implements OnInit {
  //Flag Management
  showShortMenu: boolean = false;
  showNotifications: boolean = false;

  @Input() loading: boolean = false;

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  openMenu() {
    this.showShortMenu = true;
  }

  closeMenu() {
    this.showShortMenu = false;
  }

  openNotifications() {
    this.showNotifications = true;
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  /**
   * Life cycle
   */
  ngOnInit() {}
}
