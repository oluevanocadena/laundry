import { Component, Input } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'orders-top-bar',
  standalone: false,
  templateUrl: './orders-top-bar.component.html',
  styleUrls: ['./orders-top-bar.component.scss'],
})
export class OrdersTopBarComponent extends HelperPage {
  // Inputs
  @Input() loading: boolean = false;
  @Input() title: string = '';

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  /**
   * Lifecycle
   */
  ngOnInit() {}
}
