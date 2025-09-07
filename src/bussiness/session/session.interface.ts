import { Session } from "@supabase/supabase-js";
import { Account, AccountRole } from "@bussiness/users/users.interfaces";
import { Location } from "@bussiness/locations/locations.interfaces";

export interface SessionInfo {
    Session: Session;
    Account: Account;
    Location: Location;
    Roles: AccountRole[];
}