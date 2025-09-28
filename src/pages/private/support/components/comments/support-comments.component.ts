import { Component } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { SupportTicketComment } from '@bussiness/support/interfaces/support.interfaces';

@Component({
  selector: 'support-comments',
  standalone: false,
  templateUrl: './support-comments.component.html',
  styleUrls: ['./support-comments.component.scss'],
})
export class SupportCommentsComponent {
  constructor(public facade: SupportDraftFacade) {}

  /**
   * Getters
   */

  get canAddComment(): boolean {
    return this.facade.formComment.valid;
  }

  get comments(): SupportTicketComment[] {
    return this.facade.ticketComments.value ?? [];
  }
}
