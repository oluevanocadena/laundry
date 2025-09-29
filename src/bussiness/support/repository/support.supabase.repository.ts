import { Injectable } from '@angular/core';

import { SupportQueryDomain } from '@bussiness/support/domains/support.query.domain';
import { TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket, SupportTicketComment, SupportTicketImage } from '@bussiness/support/interfaces/support.interfaces';
import { ISupportTicketRepository } from '@bussiness/support/repository/support.repository';
import { PagedRequest, ResponseResult } from '@globals/interfaces/requests.interface';
import { SupabaseBaseApiService } from '@globals/services/supabase.api.service.base';
import { SubjectProp } from '@globals/types/subject.type';

@Injectable({
  providedIn: 'root',
})
export class SupportTicketSupabaseRepository extends SupabaseBaseApiService implements ISupportTicketRepository {
  //Results
  public supportTicketsPaged = new SubjectProp<ResponseResult<SupportTicket[]>>(null);
  public supportTickets = new SubjectProp<ResponseResult<SupportTicket[]>>(null);

  constructor() {
    super();
  }

  getPaged(request: PagedRequest): Promise<ResponseResult<SupportTicket[]>> {
    return this.executeWithBusy(async () => {
      // Construir query base y count query usando tu domain actual
      const query = SupportQueryDomain.buildQuery(request, this.client, this.sessionService);
      const countQuery = SupportQueryDomain.buildTotalCountQuery(request, this.client, this.sessionService);

      const [queryResult, totalCountResult] = await Promise.all([query, countQuery]);
      const { data, error } = queryResult;
      const totalCount = totalCountResult.count ?? 0;

      this.supportTicketsPaged.value = super.handleResponse<SupportTicket[]>(
        data as unknown as SupportTicket[],
        error,
        undefined,
        totalCount,
      );
      return this.supportTicketsPaged.value;
    }, 'Fetching Support Tickets');
  }

  deleteImage(id: string): Promise<ResponseResult<SupportTicketImage>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await SupportQueryDomain.buildDeleteTicketImageQuery(this.client, id);
      return super.handleResponse<SupportTicketImage>(data as unknown as SupportTicketImage, error);
    });
  }

  uploadImage(
    file: File,
    ticketId: string,
    orgId: string,
    isTicketEdition: boolean = false,
  ): Promise<ResponseResult<SupportTicketImage>> {
    return this.executeWithBusy(async () => {
      const uploadImageResponse = await SupportQueryDomain.buildUploadImageQuery(
        this.client,
        file,
        ticketId,
        this.sessionService,
        isTicketEdition,
      );
      return super.handleResponse<SupportTicketImage>(
        uploadImageResponse.data as unknown as SupportTicketImage,
        uploadImageResponse.error,
      );
    }, 'Uploading Support Ticket Image');
  }

  getAll(): Promise<ResponseResult<SupportTicket[]>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await SupportQueryDomain.buildGetAllTicketsQuery(this.client);
      this.supportTickets.value = super.handleResponse(data, error);
      return this.supportTickets.value;
    }, 'Fetching Support Tickets');
  }

  getById(id: string): Promise<ResponseResult<SupportTicket> | null> {
    return this.executeWithBusy(async () => {
      const { data, error } = await SupportQueryDomain.buildGetTicketByIdQuery(this.client, id);
      return super.handleResponse(data, error);
    }, 'Fetching Support Ticket');
  }

  save(ticket: SupportTicket, ticketImages: SupportTicketImage[]): Promise<ResponseResult<SupportTicket>> {
    return this._saveOrUpdateTicket(ticket, ticketImages);
  }

  update(ticket: SupportTicket, ticketImages: SupportTicketImage[]): Promise<ResponseResult<SupportTicket>> {
    return this._saveOrUpdateTicket(ticket, ticketImages);
  }

  delete(id: string): Promise<ResponseResult<SupportTicket>> {
    return this.executeWithBusy(async () => {
      const { data, error } = await SupportQueryDomain.buildDeleteTicketQuery(this.client, id);
      return super.handleResponse<SupportTicket>(data as unknown as SupportTicket, error);
    });
  }

  deleteMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = SupportQueryDomain.buildDeleteTicketsQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse<void>(data as unknown as void, error);
    });
  }

  toggleEnableMany(ids: string[]): Promise<ResponseResult<void>> {
    return this.executeWithBusy(async () => {
      const query = SupportQueryDomain.buildToggleTicketsQuery(this.client, ids);
      const { data, error } = await query;
      return super.handleResponse<void>(data as unknown as void, error);
    });
  }

  updateStatus(id: string, status: TicketStatusIdEnum): Promise<ResponseResult<SupportTicket>> {
    return this.executeWithBusy(async () => {
      const { data: ticketSaved, error } = await SupportQueryDomain.buildUpdateTicketStatusQuery(this.client, id, status);
      return super.handleResponse<SupportTicket>(ticketSaved, error);
    }, 'Updating SupportTicket Status');
  }

  addComment(comment: SupportTicketComment, ticketId: string): Promise<ResponseResult<SupportTicketComment>> {
    return this.executeWithBusy(async () => {
      const { data: commentSaved, error } = await SupportQueryDomain.buildAddCommentQuery(this.client, comment, ticketId);
      return super.handleResponse<SupportTicketComment>(commentSaved, error);
    }, 'Adding SupportTicket Comment');
  }

  private _saveOrUpdateTicket(
    ticket: SupportTicket,
    ticketImages: SupportTicketImage[],
  ): Promise<ResponseResult<SupportTicket>> {
    return this.executeWithBusy(async () => {
      // Primero guardar/actualizar el ticket
      const { data: ticketSaved, error } = await SupportQueryDomain.buildUpdateTicketQuery(this.client, ticket, ticketImages);
      if (error) throw error;

      if (ticketSaved.id) {
        // Si hay imágenes, primero eliminar las existentes y luego insertar las nuevas
        if (ticketImages && ticketImages.length > 0) {
          // Eliminar imágenes existentes del ticket
          await SupportQueryDomain.buildDeleteTicketImagesQuery(this.client, ticketSaved.id);

          // Insertar las nuevas imágenes
          for (const image of ticketImages) {
            image.SupportTicketId = ticketSaved.id;
            const { data: imageSaved, error: imageError } = await SupportQueryDomain.buildUpdateTicketImageQuery(
              this.client,
              image,
            );
            if (imageError) throw imageError;
          }
        }
      } else {
        throw new Error('Ocurrió un error al guardar el ticket de soporte, intente nuevamente.');
      }
      return super.handleResponse<SupportTicket>(ticketSaved, error);
    }, 'Updating SupportTicket');
  }
}
