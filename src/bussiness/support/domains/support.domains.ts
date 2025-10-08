import { TuiAppearanceOptions } from '@taiga-ui/core';
import moment from 'moment';

import { SupportTicketPriorityEnum, TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket } from '@bussiness/support/interfaces/support.interfaces';
import { SessionService } from '@bussiness/session/services/session.service';

export class SupportDomain {
  static buildTicket(ticket: SupportTicket, sessionService: SessionService): SupportTicket {
    const ticketToSave: SupportTicket = {
      AccountId: ticket.AccountId || sessionService.sessionInfo.value?.Account.id || '',
      AssignedTo: ticket.AssignedTo ?? null,
      closed_At: ticket.closed_At ?? null,
      created_At: ticket.created_At ?? moment().toISOString(),
      CreatedBy: ticket.CreatedBy || sessionService.sessionInfo.value?.Account.FullName || '',
      Deleted: ticket.Deleted ?? false,
      Description: ticket.Description,
      OrganizationId: ticket.OrganizationId || sessionService.organizationId,
      Priority: ticket.Priority ?? SupportTicketPriorityEnum.Medium,
      resolved_At: ticket.resolved_At ?? null,
      StatusId: ticket.StatusId ?? TicketStatusIdEnum.Open,
      SupportTicketModuleId: ticket.SupportTicketModuleId,
      Title: ticket.Title,
      updated_At: moment().toISOString(),
      id: ticket.id ?? undefined,
    };
    if (!ticketToSave.id) {
      delete ticketToSave.id;
    }
    return ticketToSave;
  }

  static statusName(statusId: TicketStatusIdEnum | null): string {
    if (!statusId) return 'Desconocido';
    switch (statusId) {
      case TicketStatusIdEnum.Open:
        return 'Abierto';
      case TicketStatusIdEnum.Closed:
        return 'Cerrado';
      case TicketStatusIdEnum.Resolved:
        return 'Resuelto';
      case TicketStatusIdEnum.Cancelled:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  static statusAppearance(statusId: TicketStatusIdEnum | null): TuiAppearanceOptions['appearance'] {
    if (!statusId) return 'default';
    switch (statusId) {
      case TicketStatusIdEnum.Open:
        return 'success';
      case TicketStatusIdEnum.Closed:
        return 'error';
      case TicketStatusIdEnum.Resolved:
        return 'success';
      case TicketStatusIdEnum.Cancelled:
        return 'error';
      default:
        return 'default';
    }
  }

  static priorityName(priorityId: SupportTicketPriorityEnum | null): string {
    if (!priorityId) return 'Baja';
    switch (priorityId) {
      case SupportTicketPriorityEnum.Low:
        return 'Baja';
      case SupportTicketPriorityEnum.Medium:
        return 'Media';
      case SupportTicketPriorityEnum.High:
        return 'Alta';
      default:
        return 'Baja';
    }
  }

  static priorityAppearance(priorityId: SupportTicketPriorityEnum | null): TuiAppearanceOptions['appearance'] {
    if (!priorityId) return 'default';
    switch (priorityId) {
      case SupportTicketPriorityEnum.Low:
        return 'error';
      case SupportTicketPriorityEnum.Medium:
        return 'warning';
      case SupportTicketPriorityEnum.High:
        return 'success';
      default:
        return 'default';
    }
  }
}
