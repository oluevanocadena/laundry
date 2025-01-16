import { Injectable } from '@angular/core';
import moment from 'moment';
import { HttpService } from './common/http.service';
import { Utils } from './common/utils.service';
import { Address, Customer } from './customers.service';
import {
  OrderItemsStatusEnum,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from './order-status.service';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.services';
import { CustomerStatusEnum } from './customers-status.service';

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
  address: Address;
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

const ordersFake: Order[] = [
  {
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
    customerId: 1,
    statusId: 1,
    status: 'Draft',
    statusItems: 'Draft',
    statusItemsId: 1,
    statusPayment: 'Payment Pending',
    statusPaymentId: 1,
    payment: {
      id: Utils.Text.newGuid(),
      method: 'cash',
      date: moment().format('DD/MM/YYYY'),
      transactionNumber: '',
    },
    createdAt: moment().format('DD/MM/YYYY'),
    taxes: 10,
    discount: 0,
    subtotal: 100,
    total: 100,
    totalItems: 1,
    totalQuantity: 1,
    orderItems: [
      {
        id: 0,
        name: '8kg',
        status: 'Not Proccesed',
        statusId: OrderItemsStatusEnum.NotProccesed,
        categoryId: 1,
        category: 'Laundry',
        productId: Utils.Text.newGuid(),
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
      date: moment().format('DD/MM/YYYY'),
      estimatedDate: moment().format('DD/MM/YYYY'),
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
      id: Utils.Text.newGuid(),
      number: Utils.Text.generateRandomHashtagNumber(),
      name: 'John Doe',
      email: 'asd@asd.com',
      phone: '1234567890',
      totalOrders: 1,
      createdAt: '2021-01-01',
      statusMarketingId: 1,
      statusMarketing: 'Subscribed',
      statusId: CustomerStatusEnum.Active,
      status: 'Active',
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
    statusId: 3,
    status: 'In Progress',
    statusItems: 'Draft',
    statusItemsId: 1,
    statusPayment: 'Payment Pending',
    statusPaymentId: 1,
    payment: {
      id: Utils.Text.newGuid(),
      method: 'cash',
      date: moment().format('DD/MM/YYYY'),
      transactionNumber: '',
    },
    createdAt: moment().format('DD/MM/YYYY'),
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
        productId: Utils.Text.newGuid(),
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
      date: moment().format('DD/MM/YYYY'),
      estimatedDate: moment().format('DD/MM/YYYY'),
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
      id: Utils.Text.newGuid(),
      number: Utils.Text.generateRandomHashtagNumber(),
      name: 'Miguel Luevano',
      email: 'asd@asd.com',
      phone: '1234567890',
      totalOrders: 1,
      fullAddress: '123 Main St, Springfield, IL, 62701',
      createdAt: '2021-01-01',
      statusMarketingId: 1,
      statusMarketing: 'Subscribed',
      statusId: CustomerStatusEnum.Active,
      status: 'Active',
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
    customerId: 3,
    statusId: 4,
    status: 'Completed',
    statusItems: 'Draft',
    statusItemsId: 1,
    statusPayment: 'Payment Pending',
    statusPaymentId: 1,
    payment: {
      id: Utils.Text.newGuid(),
      method: 'cash',
      date: moment().format('DD/MM/YYYY'),
      transactionNumber: '',
    },
    createdAt: moment().format('DD/MM/YYYY'),
    taxes: 10,
    discount: 0,
    subtotal: 100,
    total: 100,
    totalItems: 1,
    totalQuantity: 1,
    orderItems: [
      {
        id: 3,
        name: '8kg',
        status: 'Not Proccesed',
        statusId: OrderItemsStatusEnum.NotProccesed,
        categoryId: 1,
        category: 'Laundry',
        productId: Utils.Text.newGuid(),
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
      date: moment().format('DD/MM/YYYY'),
      estimatedDate: moment().format('DD/MM/YYYY'),
      address: {
        id: 3,
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
      id: Utils.Text.newGuid(),
      number: Utils.Text.generateRandomHashtagNumber(),
      name: 'Oscar Luevano',
      email: 'asd@asd.com',
      phone: '1234567890',
      totalOrders: 1,
      createdAt: moment().format('DD/MM/YYYY'),
      statusMarketingId: 1,
      statusMarketing: 'Subscribed',
      statusId: CustomerStatusEnum.Active,
      status: 'Active',
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
    customerId: 3,
    statusId: 4,
    status: 'Completed',
    statusItems: 'Draft',
    statusItemsId: 1,
    statusPayment: 'Payment Pending',
    statusPaymentId: 1,
    payment: {
      id: Utils.Text.newGuid(),
      method: 'cash',
      date: moment().format('DD/MM/YYYY'),
      transactionNumber: '',
    },
    createdAt: moment().format('DD/MM/YYYY'),
    taxes: 10,
    discount: 0,
    subtotal: 100,
    total: 100,
    totalItems: 1,
    totalQuantity: 1,
    orderItems: [
      {
        id: 3,
        name: '8kg',
        status: 'Not Proccesed',
        statusId: OrderItemsStatusEnum.NotProccesed,
        categoryId: 1,
        category: 'Laundry',
        productId: Utils.Text.newGuid(),
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
      date: moment().format('DD/MM/YYYY'),
      estimatedDate: moment().format('DD/MM/YYYY'),
      address: {
        id: 3,
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
      id: Utils.Text.newGuid(),
      number: Utils.Text.generateRandomHashtagNumber(),
      name: 'Oscar Luevano',
      email: 'asd@asd.com',
      phone: '1234567890',
      totalOrders: 1,
      fullAddress: '123 Main St, Springfield, IL, 62701',
      createdAt: '2021-01-01',
      statusMarketingId: 1,
      statusMarketing: 'Subscribed',
      statusId: CustomerStatusEnum.Active,
      status: 'Active',
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
    id: Utils.Text.newGuid(),
    number: Utils.Text.generateRandomHashtagNumber(),
    name: '',
    email: '',
    phone: '',
    totalOrders: 0,
    fullAddress: '',
    createdAt: moment().format('DD/MM/YYYY'),
    statusMarketingId: 1,
    statusMarketing: 'Subscribed',
    statusId: CustomerStatusEnum.Active,
    status: 'Active',
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
