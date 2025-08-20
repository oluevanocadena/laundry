import { Session } from "@supabase/supabase-js";
import { Account } from "./accounts.interface";
import { Location } from "@bussiness/locations/locations.interfaces";

export interface SessionInfo {
    Session: Session;
    Account: Account;
    Location: Location;
}