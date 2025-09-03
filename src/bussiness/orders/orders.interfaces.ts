// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

import { Product, UnitMeasure } from '@bussiness/products/products.interfaces';
import { Customer } from '../customers/customers.interfaces';
import { Organization } from '@bussiness/session/organizations.interface';

export interface Delivery {
  DeliveryType: DeliveryTypes;
  Date: Date | string | undefined;
  Time: string | undefined;
  Indications?: string;
  Cost: number;
  Address: string;
}

export interface Order {
  id?: string;
  createdAt?: string;
  updatedAt?: string;

  OrderNumber?: string;

  StatusId: number;
  OrderStatus?: OrderStatus; // For UI only

  DiscountType?: DiscountTypes;
  DiscountRate: number; //For percentage o amount
  Discount: number; //Result of the discount conversion

  Taxes: number;
  Subtotal: number;
  Total: number;

  ItemCount: number;
  Notes?: string;

  Paid: boolean;
  PaymentMethod: PaymentMethods | undefined;
  PaymentDate: Date | string | undefined;
  PaymentCardTransactionNumber: string | undefined;

  CustomerId: string | undefined;
  Customer?: Customer; // For UI only

  OrderItems?: OrderItem[]; // For UI only

  DeliveryType: DeliveryTypes;
  DeliveryDate: Date | string | null;
  DeliveryTime: string | null;
  DeliveryIndications?: string;
  DeliveryCost?: number;
  DeliveryAddress?: string;
  DeliveryTrackingNumber?: string;
  DeliveryTransportCompany?: string;

  NotifyDelivery?: boolean;  //For UI only
  
  LocationId?: string;
  Location?: Location; // For UI only

  OrganizationId?: string;
  Organization?: Organization; // For UI only
  
  Deleted: boolean;
}

export interface OrderItem {
  id?: number;
  createdAt?: string;

  Name: string;
  Description: string;
  ImageUrl?: string;

  Quantity: number;

  UnitMeasureId: string;
  UnitMeasure?: UnitMeasure; // Only for UI

  Price: number;
  Total: number; 

  ItemStatusId: number;
  ItemStatus?: OrderItemStatus; // For UI only

  OrderId?: string;
  ProductId?: string;
  Product?: Product; // For UI only

  Deleted: boolean;
}

export interface OrderStatus {
  id: number;
  Name: string;
  Deleted: boolean;
}

export interface OrderItemStatus {
  id: number;
  Name: string;
  Deleted: boolean;
}

export interface OrderTotals {
  DiscountRate?: number; //Stores percentage (0-1) or fixed amount depending on discount type
  Discount: number; //Result of the discount conversion

  Delivery: number;
  Taxes: number;
  Subtotal: number;
  Total: number; //Total after discount and taxes
}

export type PaymentMethods = 'cash' | 'card' | 'none';
export type DiscountTypes = 'percentage' | 'amount';
export type DeliveryTypes = 'pickup' | 'delivery' | 'showroom';
