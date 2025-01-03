import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'orders-top-bar',
  standalone: false,
  templateUrl: './orders-top-bar.component.html',
  styleUrls: ['./orders-top-bar.component.scss'],
})
export class OrdersTopBarComponent extends HelperPage {


  // Properties
  @Input() title: string = '';
  @Output() onTabChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  onChangeTab(index: number) {
    this.onTabChange.emit(index);
  }

  /**
   * Lifecycle
   */
  ngOnInit() {}
}
