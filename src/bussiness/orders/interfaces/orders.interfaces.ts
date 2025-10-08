import { Customer } from '@bussiness/customers/interfaces/customers.interfaces';
import { OrderItem } from '@bussiness/orders/interfaces/orders.items.interfaces';
import { DeliveryTypes, DiscountTypes } from '@bussiness/orders/types/orders.types';
import { PaymentMethods } from '@bussiness/orders/types/payments.type';
import { Organization } from '@bussiness/organizations/interfaces/organizations.interface';
import { Account } from '@bussiness/users/interfaces/users.interfaces';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::
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

  PaymentMethod: PaymentMethods | undefined;
  PaymentDate: Date | string | undefined;
  PaymentCardTransactionNumber: string | undefined;
  PaymentStatusId?: number;
  PaymentStatus?: string;

  CustomerId: string | undefined;
  CustomerName?: string;
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
  CreatedBy?: string;
  Checked?: boolean; //Only for UI
}

export interface OrderStatus {
  id: number;
  Name: string;
  Deleted: boolean;
}

export interface OrderTotals {
  DiscountRate?: number;
  Discount: number;

  Delivery: number;
  Taxes: number;
  Subtotal: number;
  Total: number;
}
 