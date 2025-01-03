import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'orders-header',
  standalone: false,
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent extends HelperPage implements OnInit {
  // Inputs
  @Input() edition: boolean = false;

  //Flag Management
  showMoreOptions: boolean = false;

  //Array
  actionTypes = [
    {
      id: 2,
      name: 'Edit',
    },
    {
      id: 1,
      name: 'Cancel',
    },
    {
      id: 3,
      name: 'Refund',
    },
  ];

  constructor() {
    super();
  }

  ngOnInit() {}
}
