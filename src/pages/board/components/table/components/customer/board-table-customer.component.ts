import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../../../../../../components/common/helper.page';

@Component({
  selector: 'board-table-customer',
  standalone: false,
  templateUrl: './board-table-customer.component.html',
  styleUrls: ['./board-table-customer.component.scss'],
})
export class BoardTableCustomerComponent extends HelperPage implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';

  constructor() {
    super();
  }

  ngOnInit() {}
}
