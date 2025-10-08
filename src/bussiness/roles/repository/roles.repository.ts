import { Role } from '@bussiness/roles/interfaces/roles.interfaces';
import { ReadOnlyRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class IRolesRepository extends ReadOnlyRepository<Role> {
  abstract roles: SubjectProp<ResponseResult<Role[]>>;
}

