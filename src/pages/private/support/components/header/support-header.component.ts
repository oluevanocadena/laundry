import { Component } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { SupportDomain } from '@bussiness/support/domains/support.domains';
import { SupportTicketPriorityEnum, TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { HelperPage } from '@components/common/helper.page';
import moment from 'moment';

@Component({
  selector: 'support-header',
  standalone: false,
  templateUrl: './support-header.component.html',
  styleUrls: ['./support-header.component.scss'],
})
export class SupportHeaderComponent extends HelperPage {
  SupportDomain = SupportDomain;

  constructor(public facade: SupportDraftFacade) {
    super();
  }

  /**
   * Getter
   */

  get busy(): boolean {
    return this.facade.repo.busy.value;
  }

  get ticketNumber(): string {
    return this.facade.ticket.value?.TicketNumber || '';
  }

  get ticketStatusId(): TicketStatusIdEnum {
    return this.facade.ticket.value?.StatusId || TicketStatusIdEnum.Open;
  }

  get dateCreated(): string {
    return this.facade.ticket.value?.created_At || moment().locale('es').toDate().toString();
  }

  get statusId(): TicketStatusIdEnum {
    return this.facade.ticket.value?.StatusId || TicketStatusIdEnum.Open;
  }

  get priorityId(): SupportTicketPriorityEnum {
    return this.facade.ticket.value?.Priority || SupportTicketPriorityEnum.Medium;
  }

  get canSave(): boolean {
    return !this.busy && this.facade.formGroup.valid;
  }
}
