import { Organization } from '@bussiness/session/organizations.interface';
import { Account } from '@bussiness/users/users.interfaces';
import { SupabasePagedRequest } from '@globals/types/types';

export interface Notification {
  id?: string;
  created_At?: string;
  updated_At?: string;

  Title: string;
  Message: string;

  Entity: Entities;
  Event: Events;

  Metadata: NotificationMetadata;
  Readed?: boolean;

  AccountId: string; //uiid with "Accounts" table campo id:string
  Account?: Account; // For UI only

  OrganizationId: string;
  Organization?: Organization; // For UI only
}

export interface NotificationMetadata {
  id: string;
  createdBy: string; // uuid with "Accounts" table campo id:string
}

export interface NotificationRequest extends SupabasePagedRequest {
  readed: boolean | null;
}

export enum Entities {
  Order = 'order',
  Customer = 'customer',
  Product = 'product',
  Invoice = 'invoice',
  Payment = 'payment',
  Delivery = 'delivery',
}

export enum Events {
  Created = 'created',
  Updated = 'updated',
  Deleted = 'deleted',
  Paid = 'paid',
  Shipped = 'shipped',
  Canceled = 'canceled',
}
