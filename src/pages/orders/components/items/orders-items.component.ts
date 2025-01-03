import { Component, Input, OnInit } from '@angular/core';
import { OrderItem, OrdersService } from '../../../../services/orders.service';
import { AdjustQuantityEvent } from '../adjust-quantity/orders-adjust-quantity.component';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent implements OnInit {
  //Flag Management
  showSearchProduct: boolean = false;
  showAdjustQuantity: boolean = false;

  //Models
  selectedItem: any = {};

  //Input
  @Input() edition: boolean = false;
  @Input() items: OrderItem[] = [
    {
      id: 1,
      name: 'Product 1',
      quantity: 1,
      price: 100,
      tax: 10,
      total: 100,
      category: 'Dry Cleaning',
      productId: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      quantity: 2,
      price: 200,
      tax: 20,
      total: 400,
      category: 'Laundry',
      productId: 2,
    },
    {
      id: 3,
      name: 'Product 3',
      quantity: 3,
      price: 300,
      tax: 30,
      total: 900,
      category: 'Dry Cleaning',
      productId: 3,
    },
  ];

  constructor(public orderservice: OrdersService) {}

  /**
   * UI Events
   */
  onSelectProduct(product: any) {
    this.showSearchProduct = false;
    console.log(product);
  }

  openSearchProduct() {
    this.showSearchProduct = true;
  }

  openAdjustQuantity(item: OrderItem) {
    this.selectedItem = item;
    this.showAdjustQuantity = true;
  }

  removeItem(item: OrderItem) {
    this.items = this.items.filter((i) => i.id !== item.id);
    console.log('Remove Item', item);
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
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
