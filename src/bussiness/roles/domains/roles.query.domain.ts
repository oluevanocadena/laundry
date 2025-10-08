import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseTables } from '@globals/constants/supabase-tables.constants';

export class RolesQueryDomain {
  static buildGetAllQuery(client: SupabaseClient) {
    return client.from(SupabaseTables.Roles).select('*').eq('Deleted', false).order('id', { ascending: true });
  }

  static buildGetByIdQuery(client: SupabaseClient, id: number) {
    return client
      .from(SupabaseTables.Roles)
      .select('*')
      .eq('id', id)
      .eq('Deleted', false)
      .order('id', { ascending: true })
      .single();
  }
}
