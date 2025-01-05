import { Injectable } from '@angular/core';
import moment from 'moment';
import { HttpService } from './common/http.service';
import { Utils } from './common/utils.service';
import { Address, Customer } from './customers.service';
import { OrderItemsStatusEnum } from './order-status.service';
import { Observable } from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(public http: HttpService) {}

  calculateTotals(order: Order): Order {
    if (order) {
      order.total = order.orderItems.reduce((acc, item) => acc + item.total, 0);
      order.subtotal = order.orderItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
      order.taxes = order.total - order.subtotal;
      order.totalItems = order.orderItems.length;
    }
    return order;
  }

  /**
   * @description
   * @param {string} id
   * @returns {Observable<Order>}
   */
  getOrder(id: string) {
    return this.http.get<Order>(`orders/${id}`);
  }

  /**
   * @description
   * @returns {Observable<Order[]>}
   */
  getOrders() {
    return this.http.get<Order[]>('orders');
  }

  /**
   * @description
   * @param {Order} Order
   * @returns {Observable<Order>}
   */
  createOrder(Order: Order) {
    return this.http.post<any>('orders', Order);
  }

  /**
   * @description
   * @param {string} id
   * @param {Order} Order
   * @returns {Observable<Order>}
   */

  updateOrder(id: string, Order: Order) {
    return this.http.put<Order>(`orders/${id}`, Order);
  }

  /**
   * Fakes
   */
  createFakeOrder(Order: Order): Observable<Order> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(Order);
        observer.complete();
      }, 1000);
    });
  }

  getFakeOrders(): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ordersFake);
      }, 1000);
    });
  }
}

export interface Order {
  id: string;
  number: string;
  statusId: number;
  status: string;
  statusItems: string;
  statusItemsId: number;
  customerId: number;
  deliveryId?: number;
  orderDate: string;
  discount: number;
  taxes: number;
  subtotal: number;
  deliveryFee?: number;
  total: number;
  totalItems: number;
  totalQuantity: number;
  notes?: string;
  customer: Customer;
  orderItems: OrderItem[];
  delivery: Delivery;
}

export interface OrderItem {
  id: number;
  name: string;
  status: string;
  statusId: number;
  categoryId: number;
  category:
    | 'Laundry'
    | 'Dry Cleaning'
    | 'Ironing'
    | 'Others'
    | 'Delivery'
    | string;
  quantity: number;
  price: number;
  total: number;
  tax: number;
  subtotal: number;
  productId: number;
  isDeliveryFee: boolean;
  oderId?: string;
}

export interface Delivery {
  date: string;
  indications?: string;
  estimatedDate: string;
  estimatedTime?: string;
  fee: number;
  distanceKm: number;
  address: Address;
}

const ordersFake: Order[] = [
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
    customerId: 1,
    statusId: 1,
    status: 'Draft',
    statusItems: 'Draft',
    statusItemsId: 1,
    orderDate: '2021-01-01',
    taxes: 10,
    discount: 0,
    subtotal: 100,
    total: 100,
    totalItems: 1,
    totalQuantity: 1,
    orderItems: [
      {
        id: 1,
        name: '8kg',
        status: 'Not Proccesed',
        statusId: OrderItemsStatusEnum.NotProccesed,
        categoryId: 1,
        category: 'Laundry',
        productId: 1,
        quantity: 1,
        price: 100,
        tax: 10,
        subtotal: 110,
        total: 110,
        isDeliveryFee: false,
      },
    ],
    delivery: {
      fee: 10,
      distanceKm: 5,
      date: '2021-01-01',
      estimatedDate: '2021-01-01',
      address: {
        id: 1,
        distanceKm: 5,
        externalNumber: '123',
        internalNumber: 'A',
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        suburb: 'Springfield',
        zip: '62701',
      },
    },
    customer: {
      id: 1,
      name: 'John Doe',
      email: 'asd@asd.com',
      phone: '1234567890',
      totalOrders: 1,
      fullAddress: '123 Main St, Springfield, IL, 62701',
      address: {
        id: 1,
        distanceKm: 5,
        externalNumber: '123',
        internalNumber: 'A',
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        suburb: 'Springfield',
        zip: '62701',
      },
    },
  },
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
    customerId: 2,
    statusId: 2,
    status: 'In Progress',
    statusItems: 'Draft',
    statusItemsId: 1,
    orderDate: '2021-01-01',
    taxes: 10,
    discount: 0,
    subtotal: 100,
    total: 100,
    totalItems: 1,
    totalQuantity: 1,
    orderItems: [
      {
        id: 2,
        name: '8kg',
        status: 'Not Proccesed',
        statusId: OrderItemsStatusEnum.NotProccesed,
        categoryId: 1,
        category: 'Laundry',
        productId: 1,
        quantity: 1,
        price: 100,
        tax: 10,
        subtotal: 110,
        total: 110,
        isDeliveryFee: false,
      },
    ],
    delivery: {
      fee: 10,
      distanceKm: 5,
      date: '2021-01-01',
      estimatedDate: '2021-01-01',
      address: {
        id: 2,
        distanceKm: 5,
        externalNumber: '123',
        internalNumber: 'A',
        suburb: 'Springfield',
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zip: '62701',
      },
    },
    customer: {
      id: 1,
      name: 'John Doe',
      email: 'asd@asd.com',
      phone: '1234567890',
      totalOrders: 1,
      fullAddress: '123 Main St, Springfield, IL, 62701',
      address: {
        id: 1,
        distanceKm: 5,
        externalNumber: '123',
        internalNumber: 'A',
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        suburb: 'Springfield',
        zip: '62701',
      },
    },
  },
];

export const OrderEmpty: Order = {
  id: Utils.Text.newGuid(),
  number: Utils.Text.generateRandomHashtagNumber(),
  status: '',
  statusId: 1,
  statusItems: '',
  statusItemsId: 1,
  orderItems: [],
  total: 0,
  discount: 0,
  taxes: 0,
  subtotal: 0,
  totalItems: 0,
  totalQuantity: 0,
  customerId: 0,
  orderDate: moment().format('DD/MM/YYYY'),
  delivery: {
    address: {
      id: 0,
      distanceKm: 0,
      externalNumber: '',
      internalNumber: '',
      suburb: '',
      city: '',
      state: '',
      street: '',
      zip: '',
    },
    date: moment().format('DD/MM/YYYY'),
    estimatedDate: moment().format('DD/MM/YYYY'),
    fee: 0,
    distanceKm: 0,
  },
  customer: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    totalOrders: 0,
    fullAddress: '',
    address: {
      id: 0,
      distanceKm: 0,
      externalNumber: '',
      internalNumber: '',
      suburb: '',
      city: '',
      state: '',
      street: '',
      zip: '',
    },
  },
};
