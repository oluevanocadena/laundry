import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { routes } from '@app/routes';
import { FacadeBase } from '@globals/types/facade.base';
import { FormProp } from '@globals/types/form.type';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';

import { SessionService } from '@bussiness/session/services/session.service';
import { SupportTicketEmpty } from '@bussiness/support/constants/support.constants';
import { SupportTicketPriorityEnum, TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import {
  SupportTicket,
  SupportTicketComment,
  SupportTicketImage,
  SupportTicketModule,
} from '@bussiness/support/interfaces/support.interfaces';
import { ISupportTicketRepository } from '@bussiness/support/repository/support.repository';
import moment from 'moment';
import { ISupportModulesRepository } from '../repository/support.modules.repository';

@Injectable({
  providedIn: 'root',
})
export class SupportDraftFacade extends FacadeBase {
  //Flag Management
  edition: boolean = false;
  showCloseTicketModal: boolean = false;
  showConfirmDelete: boolean = false;
  showResolveTicketModal: boolean = false;

  ticket = new SubjectProp<SupportTicket>(UtilsDomain.clone(SupportTicketEmpty));
  selectedTicket = new StorageProp<SupportTicket>(null, 'EDITION_SELECTED_TICKET');

  ticketComments = new SubjectProp<SupportTicketComment[]>([]);
  ticketImages = new SubjectProp<SupportTicketImage[]>([]);
  newComment = new SubjectProp<SupportTicketComment>(null);
  newImage = new SubjectProp<SupportTicketImage>(null);

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    moduleId: new FormControl('', [Validators.required]),
  });

  formComment = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  formImage = new FormGroup({
    imageUrl: new FormControl('', [Validators.required]),
  });

  // Form properties
  title = new FormProp<string>(this.formGroup, 'title', '');
  description = new FormProp<string>(this.formGroup, 'description', '');
  comment = new FormProp<string>(this.formComment, 'comment', '');
  imageUrl = new FormProp<string>(this.formImage, 'imageUrl', '');
  moduleId = new FormProp<string>(this.formGroup, 'moduleId', '');

  constructor(
    public repo: ISupportTicketRepository,
    public modulesRepo: ISupportModulesRepository,
    public nzMessageService: NzMessageService,
    public router: Router,
    public sessionService: SessionService,
  ) {
    super(repo);
  }

  override initialize() {
    super.initialize();
    this.fetchModules();
    if (this.selectedTicket.value) {
      this.ticket.value = this.selectedTicket.value;
      this.edition = true;
      this.fillTicketData();
    } else {
      this.clearState();
    }
  }

  bindEvents() {
    // Eventos para cambios en el ticket
    this.ticket.onChange((ticket) => {
      if (ticket) {
        this.updateFormFromTicket(ticket);
      }
    });
  }

  clearState() {
    const account = this.sessionService.sessionInfo.value?.Account;
    this.ticket.value = UtilsDomain.clone(SupportTicketEmpty);
    this.ticket.value!.CreatedBy = this.ticket.value!.CreatedBy ?? account?.FullName;
    this.ticket.value!.AccountId = this.ticket.value!.AccountId ?? account?.id;
    this.ticket.value!.OrganizationId = this.ticket.value!.OrganizationId ?? account?.OrganizationId;
    this.ticketComments.value = [];
    this.ticketImages.value = [];
    this.newComment.value = null;
    this.newImage.value = null;
    this.selectedTicket.value = null;
    this.formGroup.reset();
    this.formComment.reset();
    this.formImage.reset();
    this.edition = false;
    this.showCloseTicketModal = false;
    this.showConfirmDelete = false;
    this.showResolveTicketModal = false;
  }

  submitForm() {
    if (!this.formGroup.valid) {
      this.nzMessageService.error('Por favor complete todos los campos requeridos');
      return;
    }

    const ticket: SupportTicket = {
      ...this.ticket.value!,
      Title: this.title.value!,
      Description: this.description.value!,
      Priority: SupportTicketPriorityEnum.Medium,
      StatusId: TicketStatusIdEnum.Open,
      AssignedTo: null,
      updated_At: moment().toISOString(),
    };

    const ticketImages: SupportTicketImage[] = this.ticketImages.value || [];

    this.repo.save(ticket, ticketImages).then((response) => {
      if (response.success === false) {
        this.nzMessageService.error('Ocurrió un error al guardar el ticket, intente nuevamente.');
      } else {
        if (this.ticket.value?.StatusId === TicketStatusIdEnum.Open) {
          this.router.navigate([routes.Support]);
          return;
        } else {
          this.selectedTicket.value = response.data as unknown as SupportTicket;
          this.fillTicketData();
          this.nzMessageService.success('Ticket guardado correctamente');
        }
      }
    });
  }

  /**
   * API Methods
   */

  fetchModules() {
    this.modulesRepo.getAll().then(() => {});
  }

  updateTicketStatus(status: TicketStatusIdEnum) {
    if (this.ticket.value?.id) {
      this.repo.updateStatus(this.ticket.value.id, status).then((response) => {
        if (response.success) {
          this.ticket.value = response.data as unknown as SupportTicket;
          this.selectedTicket.value = response.data as unknown as SupportTicket;
          this.nzMessageService.success('Estado del ticket actualizado');
        } else {
          this.nzMessageService.error('Error al actualizar el estado del ticket');
        }
      });
    }
  }

  addComment() {
    if (!this.formComment.valid) {
      this.nzMessageService.error('Por favor ingrese un comentario válido');
      return;
    }

    const comment: SupportTicketComment = {
      id: '',
      SupportTicketId: this.ticket.value!.id,
      OrganizationId: this.sessionService.organizationId,
      AuthorId: this.sessionService.sessionInfo.value?.Account.id || '',
      Comment: this.comment.value!,
      CreatedAt: new Date(),
    };

    this.repo.addComment(comment, this.ticket.value!.id).then((response) => {
      if (response.success) {
        this.ticketComments.value = [...(this.ticketComments.value || []), response.data!];
        this.formComment.reset();
        this.nzMessageService.success('Comentario agregado correctamente');
      } else {
        this.nzMessageService.error('Error al agregar el comentario');
      }
    });
  }

  /**
   * Methods
   */

  fillTicketData() {
    const ticket = this.ticket.value;
    if (!ticket) return;

    this.updateFormFromTicket(ticket);
    this.ticketComments.value = (ticket as any).SupportTicketComments || [];
    this.ticketImages.value = (ticket as any).SupportTicketImages || [];
  }

  updateFormFromTicket(ticket: SupportTicket) {
    this.formGroup.patchValue({
      title: ticket.Title,
      description: ticket.Description,
    });
  }

  onSelectedImage(file: File) {
    this.repo.uploadImage(file, this.ticket.value!.id, this.sessionService.organizationId, this.edition).then((response) => {
      if (response.success) {
        if (this.edition && response.data && response.data.id) {
          this.ticketImages.value = [...(this.ticketImages.value || []), response.data];
        }
      }
    });
  }

  /**
   * UI Events
   */

  goBack() {
    this.router.navigate([routes.Support]);
  }

  onAddComment() {
    this.addComment();
  }

  onAddImage() {
    if (!this.formImage.valid) {
      this.nzMessageService.error('Por favor ingrese una URL de imagen válida');
      return;
    }

    const image: SupportTicketImage = {
      id: '',
      SupportTicketId: this.ticket.value!.id,
      OrganizationId: this.sessionService.organizationId,
      ImageUrl: this.imageUrl.value!,
      UploadedAt: new Date(),
      UploadedBy: this.sessionService.sessionInfo.value?.Account.id || null,
    };

    this.ticketImages.value = [...(this.ticketImages.value || []), image];
    this.formImage.reset();
    this.nzMessageService.success('Imagen agregada correctamente');
  }

  onRemoveImage(image: SupportTicketImage) {
    this.ticketImages.value = this.ticketImages.value?.filter((img) => img.id !== image.id) || [];
  }

  onResolveTicket() {
    this.updateTicketStatus(TicketStatusIdEnum.Resolved);
    this.showResolveTicketModal = false;
  }

  onCloseTicket() {
    this.updateTicketStatus(TicketStatusIdEnum.Closed);
    this.showCloseTicketModal = false;
  }

  onCancelTicket() {
    this.updateTicketStatus(TicketStatusIdEnum.Cancelled);
    this.nzMessageService.success('Ticket cancelado correctamente');
  }

  onAssignTicket(assignedTo: string) {
    this.ticket.value!.AssignedTo = assignedTo;
    this.nzMessageService.success('Ticket asignado correctamente');
  }

  /**
   * Modal Events
   */

  openCloseTicketModal() {
    this.showCloseTicketModal = true;
  }

  openResolveTicketModal() {
    this.showResolveTicketModal = true;
  }

  openConfirmDelete() {
    this.showConfirmDelete = true;
  }

  /**
   * Getters
   */

  get canExit(): boolean {
    return this.ticket.value?.StatusId === TicketStatusIdEnum.Open;
  }

  get isResolved(): boolean {
    return this.ticket.value?.StatusId === TicketStatusIdEnum.Resolved;
  }

  get isClosed(): boolean {
    return this.ticket.value?.StatusId === TicketStatusIdEnum.Closed;
  }

  get isCancelled(): boolean {
    return this.ticket.value?.StatusId === TicketStatusIdEnum.Cancelled;
  }

  get canEdit(): boolean {
    return !this.isClosed && !this.isCancelled;
  }
}
