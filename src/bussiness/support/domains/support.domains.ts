import { TuiAppearanceOptions } from '@taiga-ui/core';
import { SupportTicketPriorityEnum, TicketStatusIdEnum } from '../enums/support.enums';

export class SupportDomain {
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
