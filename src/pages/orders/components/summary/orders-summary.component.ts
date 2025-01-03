import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders-summary',
  standalone: false,
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss'],
})
export class OrdersSummaryComponent implements OnInit {
  //Flag Management
  showCollectPaymentModal: boolean = false;

  constructor() {}

  /**
   * UI Events
   */

  openCollectPayment() {
    this.showCollectPaymentModal = true;
  }

  ngOnInit() {}
}
