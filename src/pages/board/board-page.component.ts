import { Component, OnInit } from '@angular/core';
import {
  HelperTablePage,
  UINavigationDirection,
} from '../../components/common/helper.table.page';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-board-page',
  standalone: false,
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent extends HelperTablePage<any> implements OnInit {
  constructor(public OrdersService: OrdersService) {
    super();
  }

  /**
   * UI Events
   */
  onTabChange(index: number) {
    console.log('Change tab:', index);
  }

  onDirectionChange(direction: UINavigationDirection) {
    console.log('Change direction:', direction);
  }

  /**
   * LifeCycle method
   */

  ngOnInit() {
    this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  
}
