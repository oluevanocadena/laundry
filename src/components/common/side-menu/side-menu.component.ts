import { Component, HostListener, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';

@Component({
  selector: 'side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends HelperPage implements OnInit {
  //Flag Management
  @Input() collapsed: boolean = false;

  constructor() {
    super();
  }

  @HostListener('window:resize', ['$event'])
  override onResize(event: any) {
    super.onResize(event);
    this.collapsed = this.isMobileOrTablet;
  }

  /**
   * UI Events
   */

  toggleMenu() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {}
}
