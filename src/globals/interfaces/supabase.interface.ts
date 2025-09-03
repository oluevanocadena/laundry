import { PostgrestError } from '@supabase/supabase-js';

export interface SupabaseResponse<T> {
  response?: T;
  success: boolean;
  error?: string | PostgrestError | any | null;
}
