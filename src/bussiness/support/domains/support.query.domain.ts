import { SupabaseClient } from '@supabase/supabase-js';
import moment from 'moment';

import { SessionService } from '@bussiness/session/services/session.service';
import { TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket, SupportTicketComment, SupportTicketImage } from '@bussiness/support/interfaces/support.interfaces';
import { SupabaseBuckets, SupabaseTables } from '@globals/constants/supabase-tables.constants';
import { PagedRequest } from '@globals/interfaces/requests.interface';
import { UtilsDomain } from '@globals/utils/utils.domain';

export class SupportQueryDomain {
  static buildQuery(request: PagedRequest, client: SupabaseClient, sessionService: SessionService) {
    const from = (request.page - 1) * request.pageSize;
    const to = from + request.pageSize - 1;

    let query = client
      .from(SupabaseTables.SupportTickets)
      .select(
        `*, 
          SupportTicketImages: ${SupabaseTables.SupportTicketImages}(*),
          SupportTicketComments: ${SupabaseTables.SupportTicketComments}(*, Author:${SupabaseTables.Accounts}!SupportTicketComments_AuthorId_fkey(FullName)),
          Account: ${SupabaseTables.Accounts}!SupportTickets_AccountId_fkey(*),
          AssignedToAccount: ${SupabaseTables.Accounts}!SupportTickets_AssignedTo_fkey(*), 
          Organization: ${SupabaseTables.Organizations}(*),
          SupportTicketStatus: ${SupabaseTables.SupportTicketStatuses}(*)`,
      )
      .eq('Deleted', false)
      .eq('OrganizationId', sessionService.organizationId);

    // Aplicar filtro de StatusId solo si no es nulo/undefined
    if (request.select !== null && request.select !== undefined) {
      query = query.eq('StatusId', request.select);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();

      // Busca en campos propios de SupportTickets
      query = query.or([`Title.ilike.%${searchTerm}%`, `Description.ilike.%${searchTerm}%`].join(','));
    }

    // if (request.dateFrom) {
    //   query = query.gte('created_At', moment(request.dateFrom).startOf('day').toISOString());
    // }

    // if (request.dateTo) {
    //   query = query.lt('created_At', moment(request.dateTo).add(1, 'day').startOf('day').toISOString());
    // }

    // Aplicar paginación
    query = query.range(from, to);

    // Aplicar ordenamiento (por defecto created_At descendente)
    const sortBy = request.sortBy || 'created_At';
    const sortTicket = request.sortOrder === 'desc';
    query = query.order(sortBy, { ascending: !sortTicket });

    // Result Query
    return query;
  }

  static buildTotalCountQuery(request: PagedRequest, client: SupabaseClient, sessionService: SessionService) {
    let query = client
      .from(SupabaseTables.SupportTickets)
      .select('*', { count: 'exact', head: true })
      .eq('Deleted', false)
      .eq('OrganizationId', sessionService.organizationId);

    // Aplicar filtro de StatusId solo si no es nulo/undefined
    if (request.select !== null && request.select !== undefined) {
      query = query.eq('StatusId', request.select);
    }

    if (request.search && request.search.trim() !== '') {
      const searchTerm = request.search.trim();
      query = query.or([`Title.ilike.%${searchTerm}%`, `Description.ilike.%${searchTerm}%`].join(','));
    }

    if (request.dateFrom) {
      query = query.gte('created_At', moment(request.dateFrom).startOf('day').toISOString());
    }

    if (request.dateTo) {
      query = query.lt('created_At', moment(request.dateTo).add(1, 'day').startOf('day').toISOString());
    }

    return query;
  }

  static buildUploadImageQuery(
    client: SupabaseClient,
    file: File,
    ticketId: string,
    sessionService: SessionService,
    isTicketEdition: boolean = false,
  ): Promise<{ data: SupportTicketImage | null; error: any }> {
    const uniqueFileName = `${UtilsDomain.guid()}.${file.name.split('.').pop()}`;
    const path = `${sessionService.organizationId}/${uniqueFileName}`;
    return client.storage
      .from(SupabaseBuckets.SupportTicketImages)
      .upload(path, file)
      .then(async (response) => {
        if (response.error) {
          throw response.error;
        }

        const uploadBucketResponse = client.storage.from(SupabaseBuckets.SupportTicketImages).getPublicUrl(path);

        const imageData: SupportTicketImage = {
          ImageUrl: uploadBucketResponse.data.publicUrl,
          OrganizationId: sessionService.organizationId,
          SupportTicketId: ticketId,
          UploadedAt: moment().toISOString(),
          UploadedBy: sessionService.accountId,
        };

        //Insert directamente si es edición de ticket
        if (isTicketEdition && uploadBucketResponse.data.publicUrl) {
          const { data, error } = await client.from(SupabaseTables.SupportTicketImages).insert(imageData);
          if (error) throw error;
        }

        return {
          data: imageData,
          error: null,
        };
      });
  }

  static buildDeleteTicketImageQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.SupportTicketImages).delete().eq('id', id).single();
  }

  static buildDeleteTicketsQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.SupportTickets).update({ Deleted: true }).in('id', ids).select('*');
  }

  static buildToggleTicketsQuery(client: SupabaseClient, ids: string[]) {
    return client.rpc('support_toggle_disabled', { ids }).then(async () => {
      return { data: [], error: null };
    });
  }

  static buildGetSingleTicketQuery(client: SupabaseClient, id: string) {
    return client
      .from(SupabaseTables.SupportTickets)
      .select(
        `*, 
          SupportTicketImages: ${SupabaseTables.SupportTicketImages}(*),
          SupportTicketComments: ${SupabaseTables.SupportTicketComments}(*),
          Account: ${SupabaseTables.Accounts}(*),
          Organization: ${SupabaseTables.Organizations}(*),
          SupportTicketStatus: ${SupabaseTables.SupportTicketStatuses}(*)`,
      )
      .eq('id', id)
      .single();
  }

  static buildDeleteTicketQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.SupportTickets).update({ Deleted: true }).eq('id', id).single();
  }

  static buildAddCommentQuery(client: SupabaseClient, comment: SupportTicketComment, ticketId: string) {
    return client.from(SupabaseTables.SupportTicketComments).upsert(comment).select().single();
  }

  static buildUpdateTicketQuery(client: SupabaseClient, ticket: SupportTicket, ticketImages: SupportTicketImage[]) {
    return client.from(SupabaseTables.SupportTickets).upsert(ticket).select().single();
  }

  static buildUpdateTicketImageQuery(client: SupabaseClient, ticketImage: SupportTicketImage) {
    return client.from(SupabaseTables.SupportTicketImages).upsert(ticketImage).select().single();
  }

  static buildDeleteTicketImagesQuery(client: SupabaseClient, ticketId: string) {
    return client.from(SupabaseTables.SupportTicketImages).delete().eq('SupportTicketId', ticketId);
  }

  static buildGetAllTicketsQuery(client: SupabaseClient) {
    return client.from(SupabaseTables.SupportTickets).select('*').eq('Deleted', false);
  }

  static buildGetTicketByIdQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.SupportTickets).select('*').eq('Deleted', false).eq('id', id).single();
  }

  static buildUpdateTicketStatusQuery(client: SupabaseClient, id: string, status: TicketStatusIdEnum) {
    return client.from(SupabaseTables.SupportTickets).update({ StatusId: status }).eq('id', id).select().single();
  }
}
