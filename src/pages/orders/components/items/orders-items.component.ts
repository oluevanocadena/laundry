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
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

  //Flag Management
  showSearchProduct: boolean = false;
  showAdjustQuantity: boolean = false;

  //Models
  selectedItem: any = {};

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
      this.order?.orderItems.push(orderItem);
    }
    this.order = this.orderservice.calculateTotals(this.order as Order);
    this.orderChange.emit(this.order as Order);
    console.log(orderItem);
  }

  removeItem(item: OrderItem) {
    if (this.order) {
      this.order.orderItems = this.order.orderItems.filter(
        (i) => i.id !== item.id
      );
    }
    this.order = this.orderservice.calculateTotals(this.order as Order);
    this.orderChange.emit(this.order as Order);
    console.log('Remove Item', this.order);
  }

  onAdjustQuantity(event: AdjustQuantityEvent) {
    let item = event.item;
    let quantity = event.quantity;
    if (quantity > 0) {
      item.quantity = quantity;
      item.total = item.price * item.quantity;
    } else {
      this.removeItem(item);
    }
    this.showAdjustQuantity = false;
    this.order = this.orderservice.calculateTotals(this.order as Order);
    this.orderChange.emit(this.order as Order);
  }

  openSearchProduct() {
    this.showSearchProduct = true;
  }

  openAdjustQuantity(item: OrderItem) {
    this.selectedItem = item;
    this.showAdjustQuantity = true;
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
