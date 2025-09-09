// supabase.client.ts
import { supabase } from '@environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Exportamos una instancia única del cliente Supabase
export const supabaseClient: SupabaseClient = createClient(
  supabase.url,
  supabase.key,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
