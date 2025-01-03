import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../../../../../../components/common/helper.page';

@Component({
  selector: 'board-table-amount',
  standalone: false,
  templateUrl: './board-table-amount.component.html',
  styleUrls: ['./board-table-amount.component.scss'],
})
export class BoardTableAmountComponent extends HelperPage implements OnInit {
  @Input() amount: number = 0;
  @Input() status: string = '';
  constructor() {
    super();
  }

  ngOnInit() {}
}
