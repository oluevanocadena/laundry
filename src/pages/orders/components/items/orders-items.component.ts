import { Component, Input, OnInit } from '@angular/core';
import { OrderItem, OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'orders-items',
  standalone: false,
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.scss'],
})
export class OrdersItemsComponent implements OnInit {
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
    }
  ];

  constructor(public orderservice: OrdersService) {}

  ngOnInit() {}
}
