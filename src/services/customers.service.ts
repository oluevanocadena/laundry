import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
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
   * @returns {Observable<Customer>}
   */
  getCustomer(id: string) {
    return this.http.get<Customer>(`customers/${id}`);
  }

  /**
   * @description
   * @returns {Observable<Customer[]>}
   */
  getCustomers() {
    return this.http.get<Customer[]>('customers');
  }

  /**
   * @description
   * @param {Customer} customer
   * @returns {Observable<Customer>}
   */
  createCustomer(customer: Customer) {
    return this.http.post<Customer>('customers', customer);
  }

  /**
   * @description
   * @param {string} id
   * @param {Customer} customer
   * @returns {Observable<Customer>}
   */

  updateCustomer(id: string, customer: Customer) {
    return this.http.put<Customer>(`customers/${id}`, customer);
  }
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
