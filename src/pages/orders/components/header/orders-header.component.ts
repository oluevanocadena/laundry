import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../../../../components/common/helper.page';
import { Order, OrderEmpty, OrdersService } from '../../../../services/orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'orders-header',
  standalone: false,
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent extends HelperPage implements OnInit {
  //Flag Management
  showMoreOptions: boolean = false;
  busy: boolean = false;

  // Inputs
  @Input() edition: boolean = false;

  //Input
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

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

  constructor(
    public ordersService: OrdersService,
    public nzMessageService: NzMessageService,
    public router: Router
  ) {
    super();
  }

  /**
   * UI Events
   */

  saveOrder() {
    if (this.order !== null) {
      console.log('Save Order:', this.order);
      this.busy = true;
      this.ordersService
        .createFakeOrder(this.order)
        .pipe(
          finalize(() => {
            this.busy = false;
          })
        )
        .subscribe((response) => {
          if (response) {
            this.order = OrderEmpty;
            this.orderChange.emit(this.order);
            this.nzMessageService.success('Order saved successfully');
            this.router.navigate([this.routes.OrdersBoard]);
          } else {
            this.nzMessageService.error('Error saving order');
          }
        });
    }
  }

  /**
   * Getters
   */
  get orderHadOrderItems(): boolean {
    return (
      this.order !== null &&
      this.order.orderItems?.filter((x) => x.isDeliveryFee === false).length > 0
    );
  }

  get canSave(): boolean {
    return (
      this.order !== null &&
      this.orderHadOrderItems &&
      this.order?.customer !== null &&
      this.order?.customer.id > 0
    );
  }

  /**
   * Life cycle method
   */

  ngOnInit() {}
}
