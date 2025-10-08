import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { Account, AccountRole } from '@bussiness/accounts/interfaces/accounts.interfaces';
import { Session } from '@supabase/supabase-js';

export interface SessionInfo {
  Session: Session;
  Account: Account;
  Location: Location;
  Roles: AccountRole[];
}

export interface SetPasswordRequest {
  password: string; 
  userId?: string;
}
