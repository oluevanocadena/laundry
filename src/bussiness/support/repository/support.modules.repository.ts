import { IRepositoryReadOnly } from '@globals/interfaces/repository.interface';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';
import { SupportTicketModule } from '../interfaces/support.interfaces';

export abstract class ISupportModulesRepository extends IRepositoryReadOnly<SupportTicketModule> {
  abstract supportModules: SubjectProp<ResponseResult<SupportTicketModule[]>>; // Listado de módulos de soporte
}
