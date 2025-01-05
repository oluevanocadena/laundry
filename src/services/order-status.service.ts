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
export class OrdersStatusService {
  constructor(public http: HttpService) {}

  /**
   * @description
   * @param {string} id
   * @returns {Observable<OrderStatus>}
   */
  getOrderStatus(id: string) {
    return this.http.get<OrderStatus>(`orders/${id}`);
  }

  /**
   * @description
   * @returns {Observable<OrderStatus[]>}
   */

  getOrderStatuses() {
    return this.http.get<OrderStatus[]>('orders');
  }

  getFakeOrderStatuses(): Observable<OrderStatus[]> {
    return new Observable<OrderStatus[]>((observer) => {
      setTimeout(() => {
        observer.next(orderStatusesFake);
        observer.complete();
      }, 1000);
    });
  }
}

export interface OrderStatus {
  id: number;
  name: string;
  description: string;
}

const orderStatusesFake: OrderStatus[] = [
  {
    id: 1,
    name: 'Draft',
    description: 'Draft',
  },
  {
    id: 2,
    name: 'Pending',
    description: 'Pending',
  },
  {
    id: 3,
    name: 'Processing',
    description: 'Processing',
  },
  {
    id: 4,
    name: 'Completed',
    description: 'Completed',
  },
  {
    id: 5,
    name: 'Cancelled',
    description: 'Cancelled',
  },
  {
    id: 6,
    name: 'Refunded',
    description: 'Refunded',
  },
];

export enum OrderStatusEnum {
  Draft = 1,
  Pending = 2,
  Processing = 3,
  Completed = 4,
  Cancelled = 5,
  Refunded = 6,
}