import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'board-table',
  standalone: false,
  templateUrl: './board-table.component.html',
  styleUrls: ['./board-table.component.scss'],
})
export class BoardTableComponent extends HelperPage implements OnInit {
  @Input() data: any[] = [];

  constructor() {
    super();
  }

  ngOnInit() {}
}
