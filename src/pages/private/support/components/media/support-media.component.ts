import { Component } from '@angular/core';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { SupportTicketImage } from '@bussiness/support/interfaces/support.interfaces';

@Component({
  selector: 'support-media',
  standalone: false,
  templateUrl: './support-media.component.html',
  styleUrls: ['./support-media.component.scss'],
})
export class SupportMediaComponent {
  constructor(public facade: SupportDraftFacade) {}

  removeImage(image: any) {
    this.facade.onRemoveImage(image);
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/placeholder-image.png';
  }

  /**
   * Getters
   */

  get images(): SupportTicketImage[] {
    return this.facade.ticketImages.value ?? [];
  }
}
