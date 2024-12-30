import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'board-table-amount',
  standalone: false,
  templateUrl: './board-table-amount.component.html',
  styleUrls: ['./board-table-amount.component.scss'],
})
export class BoardTableAmountComponent implements OnInit {
  @Input() amount: number = 0;
  @Input() status: string = '';
  constructor() {}

  ngOnInit() {}
}
