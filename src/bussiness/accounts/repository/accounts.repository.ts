import { SetPasswordRequest } from '@bussiness/session/interfaces/session.interface';
import { Account, AccountRole, InviteUserRequest } from '@bussiness/accounts/interfaces/accounts.interfaces';
import { SemiFullRepository } from '@globals/interfaces/repository.definitions';
import { EdgeFunctionResponse } from '@globals/interfaces/supabase.interface';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';

export interface SaveAccountOptions {
  accountRoles?: AccountRole[];
  sendInvitation?: boolean;
}

export abstract class IAccountsRepository extends SemiFullRepository<Account> {
  abstract account: SubjectProp<ResponseResult<Account>>;
  abstract accounts: SubjectProp<ResponseResult<Account[]>>;
  abstract pagedAccounts: SubjectProp<PagedResults<Account>>;
  abstract currentAccount: StorageProp<Account | null>;

  // Métodos específicos de Accounts
  abstract deleteByEmail(email: string): Promise<ResponseResult<void>>;
  abstract getByEmail(email: string): Promise<ResponseResult<Account> | null>;

  // Métodos para AccountRoles
  abstract getAccountRoles(accountId: string): Promise<ResponseResult<AccountRole[]>>;
  abstract saveAccountRoles(accountRoles: AccountRole[]): Promise<ResponseResult<AccountRole[]>>;
  abstract deleteAccountRoles(ids: number[]): Promise<ResponseResult<void>>;

  // Edge Functions
  abstract inviteUser(request: InviteUserRequest): Promise<EdgeFunctionResponse>;
  abstract changePassword(request: SetPasswordRequest): Promise<EdgeFunctionResponse>;
  abstract hardDelete(email: string): Promise<EdgeFunctionResponse>;
  abstract disable(email: string): Promise<EdgeFunctionResponse>;
  abstract enable(email: string): Promise<EdgeFunctionResponse>;
}

