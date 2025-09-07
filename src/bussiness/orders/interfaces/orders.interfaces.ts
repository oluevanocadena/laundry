// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::
 
import { Organization } from '@bussiness/session/organizations.interface';
import { Customer } from '../../customers/customers.interfaces';
import { DeliveryTypes, DiscountTypes, PaymentMethods } from '../types/orders.types';
import { OrderItem } from './orders.items.interfaces';
import { Account } from '@bussiness/users/users.interfaces';

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

  NotifyDelivery?: boolean; //For UI only

  LocationId?: string;
  Location?: Location; // For UI only

  OrganizationId?: string;
  Organization?: Organization; // For UI only

  AccountId?: string; //Created by account id
  Account?: Account; // For UI only

  Deleted: boolean;
}

export interface OrderStatus {
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
