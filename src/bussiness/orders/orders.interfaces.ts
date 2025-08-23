// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

import { UnitMeasure } from '@bussiness/products/products.interfaces';
import { Customer } from '../customers/customers.interfaces';

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
  id?: string;
  createdAt?: string;

  OrderNumber?: string;

  StatusId: number;
  Status?: OrderStatus;

  DiscountType?: DiscountTypes;
  DiscountAmount?: number; //For percentage o amount
  DiscountTotal: number; //Result of the discount conversion

  Taxes: number;
  Subtotal: number;
  Total: number;

  ItemCount: number;
  Notes?: string;

  PaymentId: number;
  Payment?: Payment;

  CustomerId: number;
  Customer?: Customer; // For UI only

  OrderItems: OrderItem[]; // For UI only

  Deleted: boolean;
}

export interface OrderItem {
  id: number;
  createdAt: string;

  Name: string;
  Description: string;
  ImageUrl?: string;

  Quantity: number;
  
  UnitMeasureId: string;
  UnitMeasure?: UnitMeasure; // Only for UI

  Price: number;
  Total: number;
  Tax: number;
  Subtotal: number;

  StatusId: number;
  Status?: OrderItemStatus;

  OrderId?: string;
  ProductId?: string;

  Deleted: boolean;
}

export interface OrderStatus {
  id: number;
  createdAt: string;

  Name: string;

  Deleted: boolean;
}

export interface OrderItemStatus {
  id: number;
  createdAt: string;

  Name: string;

  Deleted: boolean;
}

export interface Payment {
  id: string;
  createdAt: string;

  Method: PaymentMethods;
  Date: string;

  CardTransactionNumber: string;
}

export type PaymentMethods = 'cash' | 'card';
export type DiscountTypes = 'percentage' | 'amount';

export enum OrderStatusEnum {
  Draft = 1,
  Pending = 2,
  Processing = 3,
  Completed = 4,
  Cancelled = 5,
  Refunded = 6,
}

export enum OrderItemStatusEnum {
  NotProccesed = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
  Refunded = 5,
}

export enum PaymentMethodsEnum {
  Cash = 'cash',
  Card = 'card',
}

export enum DiscountTypesEnum {
  Percentage = 'percentage',
  Amount = 'amount',
}
