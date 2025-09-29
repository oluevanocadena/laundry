import { SupportTicketPriorityEnum, TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket } from '@bussiness/support/interfaces/support.interfaces';
import moment from 'moment';

// Constante para ticket vacío
export const SupportTicketEmpty: SupportTicket = {
  id: '',
  AccountId: '',
  CreatedBy: '',
  Title: '',
  Description: '',
  StatusId: TicketStatusIdEnum.Open,
  Priority: SupportTicketPriorityEnum.Low,
  AssignedTo: null,
  created_At: moment().toISOString(),
  updated_At: moment().toISOString(),
  resolved_At: null,
  closed_At: null,
  Deleted: false,
  OrganizationId: '',
  SupportTicketModuleId: null,
};
