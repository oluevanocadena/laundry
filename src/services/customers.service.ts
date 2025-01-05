import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { Observable } from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(public http: HttpService) {}

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

  getCustomersFake(
    page: number,
    take: number,
    search?: string
  ): Observable<Customer[]> {
    return new Observable<Customer[]>((observer) => {
      let filtered = customersFake.filter((customer) =>
        search && search.trim() !== ''
          ? customer.name?.includes(search) ||
            customer.email?.includes(search) ||
            customer.phone?.includes(search) ||
            customer.fullAddress?.includes(search) ||
            customer.id?.toString().includes(search)
          : true
      );
      filtered = filtered.slice((page - 1) * take, (page - 1) * take + take);
      observer.next(filtered);
      observer.complete();
    });
  }
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  fullAddress: string;
  totalOrders: number;
  latitude?: number;
  longitude?: number;
  address: Address;
}

export interface Address {
  id: number;
  distanceKm?: number;
  street: string;
  externalNumber: string;
  internalNumber?: string;
  city: string;
  suburb: string;
  state: string;
  zip: string;
}

const customersFake: Customer[] = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'asd@gmail.com',
    phone: '1234567890',
    address: {
      id: 2,
      street: '123 Main St',
      externalNumber: '123',
      suburb: 'Springfield',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    fullAddress:
      'Ceylan 541, Col. Industrial Vallejo, Azcapotzalco, 02300 Ciudad de México, CDMX',
    totalOrders: 0,
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'asd@gmail.com',
    phone: '1234567890',
    address: {
      id: 2,
      street: '123 Main St',
      externalNumber: '123',
      suburb: 'Springfield',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    fullAddress: '123 Main St, Springfield, IL 62701',
    totalOrders: 0,
  },
  {
    id: 3,
    name: 'Oscar Luevano',
    email: 'asd@gmail.com',
    phone: '1234567890',
    address: {
      id: 3,
      street: '123 Main St',
      externalNumber: '123',
      suburb: 'Springfield',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    fullAddress: '123 Main St, Springfield, IL 62701',
    totalOrders: 0,
  },
  {
    id: 4,
    name: 'Miguel Luevano',
    email: 'asd@gmail.com',
    phone: '1234567890',
    address: {
      id: 3,
      street: '123 Main St',
      externalNumber: '123',
      suburb: 'Springfield',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    fullAddress: '123 Main St, Springfield, IL 62701',
    totalOrders: 0,
  },
  {
    id: 5,
    name: 'Lety Callejas',
    email: 'asd@gmail.com',
    phone: '1234567890',
    address: {
      id: 3,
      street: '123 Main St',
      externalNumber: '123',
      suburb: 'Springfield',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    fullAddress: '123 Main St, Springfield, IL 62701',
    totalOrders: 0,
  },
];
