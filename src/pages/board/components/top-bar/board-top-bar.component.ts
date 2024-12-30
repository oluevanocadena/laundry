import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'board-top-bar',
  standalone: false,
  templateUrl: './board-top-bar.component.html',
  styleUrls: ['./board-top-bar.component.scss'],
})
export class BoardTopBarComponent extends HelperPage {
  //Flag Management
  showShortMenu: boolean = false;
  showNotifications: boolean = false;

  // Properties
  @Input() title: string = '';
  @Output() onTabChange: EventEmitter<any> = new EventEmitter<any>();

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

  onChangeTab(index: number) {
    this.onTabChange.emit(index);
  }

  /**
   * Lifecycle
   */
  ngOnInit() {}
}
