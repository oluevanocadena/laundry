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

  getFakeCustomers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'John Doe',
            email: 'aa@gmail.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
          },
          {
            id: '2',
            name: 'Jane Doe',
            email: 'asd@gmail.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
          },
        ]);
      });
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
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
