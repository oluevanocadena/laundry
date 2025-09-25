import { NotificationsEntitiesEnum, NotificationsEventsEnum } from '@bussiness/notifications/enums/notifications.enums';
import { Organization } from '@bussiness/session/interfaces/organizations.interface';
import { Account } from '@bussiness/users/interfaces/users.interfaces';

import { PagedResults } from '@globals/interfaces/supabase.interface';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

export interface Notification {
  id?: string;
  created_At?: string;
  updated_At?: string;

  Title: string;
  Message: string;

  Entity: NotificationsEntitiesEnum;
  Event: NotificationsEventsEnum;

  Metadata: NotificationMetadata;
  Readed?: boolean;

  AccountId: string; //uiid with "Accounts" table campo id:string
  Account?: Account; // For UI only

  OrganizationId: string;
  Organization?: Organization; // For UI only

  Checked?: boolean; // For UI only
}

export interface NotificationMetadata {
  id: string;
  createdBy: string; // uuid with "Accounts" table campo id:string
}

export interface NotificationRequest extends UITableFilter {
  readed?: boolean | null;
}

export interface NotificationPagedResults extends PagedResults<Notification> {
  unReadCount: number;
}
