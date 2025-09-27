import { Component, OnInit } from "@angular/core";
import { HelperPage } from "@components/common/helper.page";
import { SupportMonitorFacade } from "@bussiness/support/controllers/support.monitor.facade";
import { TicketStatusIdEnum } from "@bussiness/support/enums/support.enums";
import { SupportTicketPriority } from "@bussiness/support/types/support.types";

@Component({
  selector: 'page-support',
  standalone: false,
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})

export class SupportPageComponent extends HelperPage implements OnInit {
  
  constructor(public facade: SupportMonitorFacade) { 
    super();
  }

  ngOnInit() {
    this.facade.initialize();
  }

  getStatusLabel(statusId: TicketStatusIdEnum): string {
    switch (statusId) {
      case TicketStatusIdEnum.Open:
        return 'Abierto';
      case TicketStatusIdEnum.InProgress:
        return 'En Progreso';
      case TicketStatusIdEnum.Resolved:
        return 'Resuelto';
      case TicketStatusIdEnum.Closed:
        return 'Cerrado';
      case TicketStatusIdEnum.Cancelled:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  getStatusAppearance(statusId: TicketStatusIdEnum): string {
    switch (statusId) {
      case TicketStatusIdEnum.Open:
        return 'warning';
      case TicketStatusIdEnum.InProgress:
        return 'info';
      case TicketStatusIdEnum.Resolved:
        return 'success';
      case TicketStatusIdEnum.Closed:
        return 'default';
      case TicketStatusIdEnum.Cancelled:
        return 'danger';
      default:
        return 'default';
    }
  }

  getPriorityLabel(priority: SupportTicketPriority): string {
    switch (priority) {
      case 'Low':
        return 'Baja';
      case 'Medium':
        return 'Media';
      case 'High':
        return 'Alta';
      default:
        return 'Media';
    }
  }

  getPriorityAppearance(priority: SupportTicketPriority): string {
    switch (priority) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'danger';
      default:
        return 'warning';
    }
  }

  getItemChecked(item: any): boolean {
    return item.Checked || false;
  }

  setItemChecked(item: any, checked: boolean): void {
    item.Checked = checked;
  }
}
