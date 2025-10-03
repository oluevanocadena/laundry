import { Organization } from '@bussiness/settings/interfaces/organizations.interface';
import { WritableRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IOrganizationsRepository extends WritableRepository<Organization> {
  abstract organization: SubjectProp<ResponseResult<Organization>>;
}
