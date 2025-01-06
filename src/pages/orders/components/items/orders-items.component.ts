import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Order,
  OrderItem,
  OrdersService,
} from '../../../../services/orders.service';
import { AdjustQuantityEvent } from '../adjust-quantity/orders-adjust-quantity.component';
import { HelperPage } from '../../../../components/common/helper.page';
import { OrderPaymentStatusEnum } from '../../../../services/order-status.service';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent extends HelperPage implements OnInit {
  //Input
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order | null> =
    new EventEmitter<Order | null>();

  //Flag Management
  showSearchProduct: boolean = false;
  showAdjustQuantity: boolean = false;

  //Models
  selectedItem: any = {};

  //index
  indexItem: number = 0;

  //Input
  @Input() edition: boolean = false;

  constructor(public orderservice: OrdersService) {
    super();
  }

  /**
   * UI Events
   */
  onSelectItem(orderItem: OrderItem | null) {
    this.showSearchProduct = false;
    if (orderItem !== null) {
      let existProduct: boolean =
        (this.order?.orderItems.filter(
          (x) => x?.productId === orderItem?.productId
        )?.length ?? 0) > 0;
      if (existProduct === false) {
        this.order?.orderItems.push(orderItem);
      } else {
        let index = this.order?.orderItems.findIndex(
          (x) => x.productId === orderItem.productId
        );
        if (index !== -1) {
          if (this.order && index !== undefined && index !== -1) {
            this.order.orderItems[index].quantity += orderItem.quantity;
          }
        }
      }
    }
    this.order = this.orderservice.calculateTotals(this.order as Order);
    this.orderChange.emit(this.order as Order);
    console.log('On Add item', this.order);
  }

  removeItem(index: number) {
    this.order?.orderItems.splice(index, 1);
    this.order = this.orderservice.calculateTotals(this.order as Order);
    this.orderChange.emit(this.order as Order);
  }

  openSearchProduct() {
    this.showSearchProduct = true;
  }

  openAdjustQuantity(item: OrderItem, index: number) {
    this.selectedItem = item;
    this.indexItem = index;
    this.showAdjustQuantity = true;
    console.log('item', item, 'index', index);
  }

  /**
   * Getters
   */

  get itemsCount() {
    return (
      this.order?.orderItems.filter((x) => x.isDeliveryFee === false).length ??
      0
    );
  }

  get orderHaveItems() {
    return (
      this.order?.orderItems?.filter((x) => x.isDeliveryFee === false) ?? []
    ).length > 0
      ? true
      : false;
  }

  get isPendingPayment() {
    return this.order?.statusPaymentId === OrderPaymentStatusEnum.Pending
      ? true
      : false;
  }

  get canModifyItems() {
    return this.isPendingPayment === true && this.edition === true;
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
