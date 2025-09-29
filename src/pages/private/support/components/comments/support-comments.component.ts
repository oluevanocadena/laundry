import { Component } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { SupportTicketComment } from '@bussiness/support/interfaces/support.interfaces';
import { Account } from '@bussiness/users/interfaces/users.interfaces';
import moment from 'moment';

@Component({
  selector: 'support-comments',
  standalone: false,
  templateUrl: './support-comments.component.html',
  styleUrls: ['./support-comments.component.scss'],
})
export class SupportCommentsComponent {
  constructor(public facade: SupportDraftFacade) {}

  getUserLetter(account: Account): string {
    return account?.FullName?.substring(0, 2)?.toUpperCase() || 'U';
  }

  getCreatedAt(createdAt: string): string {
    return moment(createdAt).fromNow();
  }

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
