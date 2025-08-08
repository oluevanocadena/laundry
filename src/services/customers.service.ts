import { Injectable } from '@angular/core';
import { HttpService } from './common/http.service';
import { Observable } from 'rxjs';
import {
  CustomerMarketingSubscriptionEnum,
  CustomerStatusEnum,
} from './customers-status.service';
import { Utils } from './common/utils.service';
import moment from 'moment';

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

  /**
   * Fakes
   */
  createFakeCustomer(customer: Customer): Observable<Customer> {
    return new Observable<Customer>((observer) => {
      setTimeout(() => {
        observer.next(customer);
        observer.complete();
      }, 1000);
    });
  }

  getCustomersFake(
    page: number,
    take: number,
    search?: string
  ): Observable<Customer[]> {
    return new Observable<Customer[]>((observer) => {
      setTimeout(() => {
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
      }, 1000);
    });
  }
}

export interface Customer {
  id: string;
  number: string;
  name: string;
  createdAt: string;
  email: string;
  phone: string;
  fullAddress: string;
  totalOrders: number;
  spentAmount?: number;
  latitude?: number;
  longitude?: number;
  statusMarketingId: CustomerMarketingSubscriptionEnum;
  statusMarketing: string;
  statusId: CustomerStatusEnum;
  status: string;
  notes?: string;
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
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
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
    createdAt: '2021-01-01',
    statusMarketingId: CustomerMarketingSubscriptionEnum.Subscribed,
    statusMarketing: 'Subscribed',
    statusId: CustomerStatusEnum.Active,
    status: 'Active',
  },
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
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
    createdAt: '2021-01-01',
    statusMarketingId: CustomerMarketingSubscriptionEnum.Subscribed,
    statusMarketing: 'Subscribed',
    statusId: CustomerStatusEnum.Active,
    status: 'Active',
  },
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
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
    createdAt: '2021-01-01',
    statusMarketingId: CustomerMarketingSubscriptionEnum.Subscribed,
    statusMarketing: 'Subscribed',
    statusId: CustomerStatusEnum.Active,
    status: 'Active',
  },
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
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
    createdAt: '2021-01-01',
    statusMarketingId: CustomerMarketingSubscriptionEnum.Subscribed,
    statusMarketing: 'Subscribed',
    statusId: CustomerStatusEnum.Active,
    status: 'Active',
  },
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
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
    createdAt: '2021-01-01',
    statusMarketingId: CustomerMarketingSubscriptionEnum.Subscribed,
    statusMarketing: 'Subscribed',
    statusId: CustomerStatusEnum.Inactive,
    status: 'Inactive',
  },
];

export const CustomerEmpty: Customer = {
  id: Utils.Text.newGuid(),
  number: Utils.Text.generateRandomHashtagNumber(),
  name: '',
  email: '',
  phone: '',
  address: {
    id: 0,
    street: '',
    externalNumber: '',
    suburb: '',
    city: '',
    state: '',
    zip: '',
  },
  fullAddress: '',
  totalOrders: 0,
  createdAt: moment().format('YYYY-MM-DD'),
  statusMarketingId: CustomerMarketingSubscriptionEnum.Subscribed,
  statusMarketing: 'Subscribed',
  statusId: CustomerStatusEnum.Active,
  status: 'Active',
};
