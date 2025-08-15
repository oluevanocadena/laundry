// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

import { Customer } from "../customers/customers.interfaces";

export interface Order {
  id: string;
  createdAt: string;

  number: string;
  statusId: number;
  status: string;
  statusItems: string;
  statusItemsId: number;
  Deleted: boolean;
}

export interface Delivery {
  Date: string;
  Indications?: string;
  EstimatedDate: string;
  EstimatedTime?: string;
  Fee: number;
  DistanceKm: number;
  Address: string;
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
  delivery: any;

  
  customer: Customer; // For UI only
  orderItems: OrderItem[]; // For UI only
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