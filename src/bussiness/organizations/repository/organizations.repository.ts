import { Organization } from '@bussiness/organizations/interfaces/organizations.interface';
import { SemiFullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { StorageProp } from '@globals/types/storage.type';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IOrganizationsRepository extends SemiFullRepository<Organization> {
  abstract organization: SubjectProp<ResponseResult<Organization>>;
  abstract organizations: SubjectProp<ResponseResult<Organization[]>>;
  abstract pagedOrganizations: SubjectProp<PagedResults<Organization>>;
  abstract currentOrganization: StorageProp<Organization | null>;
}
