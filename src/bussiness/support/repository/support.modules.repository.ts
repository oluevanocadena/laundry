import { ReadOnlyRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';
import { SupportTicketModule } from '../interfaces/support.interfaces';

export abstract class ISupportModulesRepository extends ReadOnlyRepository<SupportTicketModule> {
  abstract supportModules: SubjectProp<ResponseResult<SupportTicketModule[]>>; // Listado de módulos de soporte
}
