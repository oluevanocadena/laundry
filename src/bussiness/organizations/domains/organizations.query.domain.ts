import { SupabaseClient } from '@supabase/supabase-js';

import { Organization } from '@bussiness/organizations/interfaces/organizations.interface';
import { OrganizationRequest } from '@bussiness/organizations/interfaces/organizations.request.interface';
import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class OrganizationsQueryDomain {
  static buildGetByIdQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Organizations).select('*').eq('id', id).eq('Deleted', false).single();
  }

  static buildGetAllQuery(client: SupabaseClient) {
    return client.from(SupabaseTables.Organizations).select('*').eq('Deleted', false).order('Name', { ascending: true });
  }

  static buildUpsertQuery(client: SupabaseClient, organization: Organization) {
    return client.from(SupabaseTables.Organizations).upsert(organization).select().single();
  }

  static buildInsertQuery(client: SupabaseClient, organization: Organization) {
    return client.from(SupabaseTables.Organizations).insert(organization).select().single();
  }

  static buildUpdateQuery(client: SupabaseClient, organization: Organization) {
    return client.from(SupabaseTables.Organizations).update(organization).eq('id', organization.id).select().single();
  }

  static buildDeleteQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Organizations).update({ Deleted: true }).eq('id', id).select().single();
  }

  static buildHardDeleteQuery(client: SupabaseClient, id: string) {
    return client.from(SupabaseTables.Organizations).delete().eq('id', id);
  }

  static buildDisableQuery(client: SupabaseClient, id: string, state: boolean) {
    return client.from(SupabaseTables.Organizations).update({ Disabled: state }).eq('id', id).select().single();
  }

  /**
   * Query paginada con filtros
   */
  static buildPagedQuery(request: OrganizationRequest, client: SupabaseClient) {
    let query = client.from(SupabaseTables.Organizations).select('*').eq('Deleted', false);

    // Filtro de búsqueda
    if (request.search) {
      query = query.ilike('Name', `%${request.search}%`);
    }

    // Filtro de disabled
    if (request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    // Ordenamiento
    const orderColumn = request.sortBy || 'Name';
    const orderDirection = request.sortOrder || 'asc';
    query = query.order(orderColumn, { ascending: orderDirection === 'asc' });

    // Paginación
    if (request.page !== undefined && request.pageSize !== undefined) {
      const from = (request.page - 1) * request.pageSize;
      const to = from + request.pageSize - 1;
      query = query.range(from, to);
    }

    return query;
  }

  /**
   * Query para contar total de registros (para paginación)
   */
  static buildTotalCountQuery(request: OrganizationRequest, client: SupabaseClient) {
    let query = client.from(SupabaseTables.Organizations).select('*', { count: 'exact', head: true }).eq('Deleted', false);

    // Aplicar los mismos filtros que en la query paginada
    if (request.search) {
      query = query.ilike('Name', `%${request.search}%`);
    }

    if (request.disabled !== undefined) {
      query = query.eq('Disabled', request.disabled);
    }

    return query;
  }

  /**
   * Query para eliminar múltiples organizaciones (soft delete)
   */
  static buildDeleteManyQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Organizations).update({ Deleted: true }).in('id', ids).select();
  }

  /**
   * Query para alternar el estado de múltiples organizaciones
   */
  static buildToggleEnableManyQuery(client: SupabaseClient, ids: string[]) {
    return client.from(SupabaseTables.Organizations).select('id, Disabled').in('id', ids).eq('Deleted', false);
  }

  /**
   * Query para actualizar múltiples estados
   */
  static buildUpdateDisabledStatesQuery(client: SupabaseClient, updates: { id: string; disabled: boolean }[]) {
    // Supabase no tiene un update masivo directo, así que hacemos upsert
    const updateData = updates.map((u) => ({
      id: u.id,
      Disabled: u.disabled,
    }));

    return client.from(SupabaseTables.Organizations).upsert(updateData).select();
  }
}
