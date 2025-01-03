import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(public http: HttpService) {}

  getFakeCustomers(): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            customerId: '1',
            orderDate: '2021-01-01',
            orderTotal: 100,
            orderItems: [
              {
                id: 1,
                name: '8kg',
                category: 'Laundry',
                productId: 1,
                quantity: 1,
                price: 100,
                tax: 10,
                total: 110,
              },
            ],
            addresses: [
              {
                id: '1',
                street: '123 Main St',
                city: 'Springfield',
                state: 'IL',
                zip: '62701',
              },
            ],
          },
          {
            id: '2',
            customerId: '2',
            orderDate: '2021-01-01',
            orderTotal: 100,
            orderItems: [
              {
                id: 1,
                name: '8kg',
                category: 'Laundry',
                productId: 1,
                quantity: 1,
                price: 100,
                tax: 10,
                total: 110,
              },
            ],
            addresses: [
              {
                id: '1',
                street: '123 Main St',
                city: 'Springfield',
                state: 'IL',
                zip: '62701',
              },
            ],
          },
        ]);
      }, 1000);
    });
  }

  /**
   * @description
   * @param {string} id
   * @returns {Observable<Order>}
   */
  getCustomer(id: string) {
    return this.http.get<Order>(`orders/${id}`);
  }

  /**
   * @description
   * @returns {Observable<Order[]>}
   */
  getCustomers() {
    return this.http.get<Order[]>('orders');
  }

  /**
   * @description
   * @param {Order} customer
   * @returns {Observable<Order>}
   */
  createCustomer(customer: Order) {
    return this.http.post<Order>('orders', customer);
  }

  /**
   * @description
   * @param {string} id
   * @param {Order} customer
   * @returns {Observable<Order>}
   */

  updateCustomer(id: string, customer: Order) {
    return this.http.put<Order>(`orders/${id}`, customer);
  }
}

export interface Order {
  id: string;
  customerId: string;
  orderDate: string;
  orderTotal: number;
  orderItems: OrderItem[];
  addresses: Address[];
}

export interface OrderItem {
  id: number;
  name: string;
  category: 'Laundry'| 'Dry Cleaning' | 'Ironing' | 'Others';
  quantity: number;
  price: number;
  total: number;
  tax: number;
  productId: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}
