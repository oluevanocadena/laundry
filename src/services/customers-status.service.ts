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
export class CustomersStatusService {
  constructor(public http: HttpService) {}

  /**
   * @description
   * @param {string} id
   * @returns {Observable<CustomerStatus>}
   */
  getCustomersStatus(id: string) {
    return this.http.get<CustomerStatus>(`orders/${id}`);
  }

  /**
   * @description
   * @returns {Observable<CustomerStatus[]>}
   */

  getCustomersStatuses() {
    return this.http.get<CustomerStatus[]>('orders');
  }

  /**
   * Fakes
   */
  getFakeCustomerStatuses(): Observable<CustomerStatus[]> {
    return new Observable<CustomerStatus[]>((observer) => {
      setTimeout(() => {
        observer.next(customerStatusesFake);
        observer.complete();
      }, 1000);
    });
  }

  getFakeCustomerMarketingStatuses(): Observable<CustomerMarketingStatus[]> {
    return new Observable<CustomerMarketingStatus[]>((observer) => {
      setTimeout(() => {
        observer.next(customerMarketingStatusesFake);
        observer.complete();
      }, 1000);
    });
  }
}

export interface CustomerStatus {
  id: number;
  name: string;
  description: string;
}

export interface CustomerMarketingStatus {
  id: number;
  name: string;
  description: string;
}

//Active, InACTIVE
const customerStatusesFake: CustomerStatus[] = [
  {
    id: 1,
    name: 'Draft',
    description: 'Draft',
  },
  {
    id: 2,
    name: 'Active',
    description: 'Active',
  },
  {
    id: 3,
    name: 'Inactive',
    description: 'Inactive',
  },
];

const customerMarketingStatusesFake: CustomerMarketingStatus[] = [
  {
    id: 1,
    name: 'Subscribed',
    description: 'Subscribed',
  },
  {
    id: 2,
    name: 'Unsubscribed',
    description: 'Unsubscribed',
  },
];

export enum CustomerStatusEnum { 
  Active = 1,
  Inactive = 2,
}

export enum CustomerCreationStatusEnum {
  Draft = 1,
  Active = 2,
}

export enum CustomerMarketingSubscriptionEnum {
  Subscribed = 1,
  Unsubscribed = 3,
}
