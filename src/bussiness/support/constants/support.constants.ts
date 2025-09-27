import { TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket } from '@bussiness/support/interfaces/support.interfaces';

// Constante para ticket vacío
export const SupportTicketEmpty: SupportTicket = {
  id: '',
  AccountId: '',
  CreatedBy: '',
  Title: '',
  Description: '',
  StatusId: TicketStatusIdEnum.Open,
  Priority: 'Medium',
  AssignedTo: null,
  created_At: new Date(),
  updated_At: new Date(),
  resolved_At: null,
  closed_At: null,
  Deleted: false,
  OrganizationId: '',
};
