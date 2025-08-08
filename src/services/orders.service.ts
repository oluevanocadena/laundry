import { Injectable } from '@angular/core';
import moment from 'moment';
import { HttpService } from './common/http.service';
import { Utils } from './common/utils.service';
import {
  OrderItemsStatusEnum,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from './order-status.service';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.services';
import { Customer } from '../bussiness/customers/customers.interfaces';

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    public http: HttpService,
    public settingsService: SettingsService
  ) {}

  calculateTotals(order: Order): Order {
    if (order) {
      this.sumItems(order);
    }
    return order;
  }

  public sumItems(order: Order) {
    order.totalItems = order.orderItems.length;

    // Procesar los items
    order.orderItems.forEach((item) => {
      const taxRate = this.settingsService.settings.value?.taxes.taxRate || 0;

      // El precio ya incluye IVA, así que primero lo desglosamos
      const priceWithTax = item.price;
      const priceWithoutTax = priceWithTax / (1 + taxRate);

      // Calcular subtotal sin IVA (precio sin IVA * cantidad)
      const subtotal = priceWithoutTax * item.quantity;

      // Si hay descuento, aplicarlo proporcionalmente
      if (order.discount > 0) {
        const discountPart = order.discount / order.orderItems.length;
        item.subtotal = subtotal - discountPart;
      } else {
        item.subtotal = subtotal;
      }

      // Calcular IVA sobre el subtotal (después de descuento si existe)
      item.tax = item.subtotal * taxRate;

      // El total es subtotal + IVA
      item.total = item.subtotal + item.tax;
    });

    // Calcular totales de la orden
    order.subtotal = order.orderItems.reduce((a, item) => a + item.subtotal, 0);
    order.taxes = order.orderItems.reduce((a, item) => a + item.tax, 0);
    order.total = order.orderItems.reduce((a, item) => a + item.total, 0);
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

  getFakeOrders(): Observable<Order[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(ordersFake);
        observer.complete();
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
  statusPayment: string;
  statusPaymentId: number;
  customerId: number;
  deliveryId?: number;
  createdAt: string;
  discountType?: DiscountTypes;
  discountAmount?: number;
  discount: number;
  taxes: number;
  subtotal: number;
  deliveryFee?: number;
  total: number;
  totalItems: number;
  totalQuantity: number;
  notes?: string;
  payment: Payment;
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
  productId?: string;
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
  address: string;
}

export interface Payment {
  id: string;
  method: PaymentMethods;
  date: string;
  transactionNumber: string;
}

export type PaymentMethods = 'cash' | 'card';
export type DiscountTypes = 'percentage' | 'amount';

export enum PaymentMethodsEnum {
  Cash = 'cash',
  Card = 'card',
}
export enum DiscountTypesEnum {
  Percentage = 'percentage',
  Amount = 'amount',
}

const ordersFake: Order[] = [];

export const OrderEmpty: Order = {
  id: Utils.Text.newGuid(),
  number: Utils.Text.generateRandomHashtagNumber(),
  status: '',
  statusId: OrderStatusEnum.Draft,
  statusItems: '',
  statusItemsId: OrderItemsStatusEnum.NotProccesed,
  statusPayment: '',
  statusPaymentId: OrderPaymentStatusEnum.Pending,
  payment: {
    id: Utils.Text.newGuid(),
    method: 'cash',
    date: moment().format('DD/MM/YYYY'),
    transactionNumber: '',
  },
  orderItems: [],
  total: 0,
  discount: 0,
  taxes: 0,
  subtotal: 0,
  totalItems: 0,
  totalQuantity: 0,
  customerId: 0,
  createdAt: moment().format('DD/MM/YYYY'),
  delivery: {
    address: '',
    date: moment().format('DD/MM/YYYY'),
    estimatedDate: moment().format('DD/MM/YYYY'),
    fee: 0,
    distanceKm: 0,
  },
  customer: {
    CustomerNumber: Utils.Text.generateRandomHashtagNumber(),
    FirstName: '',
    LastName: '',
    FullName: '',
    Email: '',
    Phone: '',
    TotalOrders: 0,
    Address: '',
    created_at: moment().format('DD/MM/YYYY'),
    Disabled: false,
    Deleted: false,
    Country: 'México',
    Street: '',
    ZipCode: '',
    IntNumber: '',
    ExtNumber: '',
    Municipality: '',
    Neighborhood: '',
    Notes: '',
    State: '',
  },
};
