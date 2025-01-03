import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'orders-summary',
  standalone: false,
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss'],
})
export class OrdersSummaryComponent extends HelperPage implements OnInit {
  //Flag Management
  showCollectPaymentModal: boolean = false;

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  openCollectPayment() {
    this.showCollectPaymentModal = true;
  }

  ngOnInit() {}
}
