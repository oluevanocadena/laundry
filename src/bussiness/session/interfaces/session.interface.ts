import { Location } from "@bussiness/locations/locations.interfaces";
import { Account, AccountRole } from "@bussiness/users/users.interfaces";
import { Session } from "@supabase/supabase-js";

export interface SessionInfo {
    Session: Session;
    Account: Account;
    Location: Location;
    Roles: AccountRole[];
}