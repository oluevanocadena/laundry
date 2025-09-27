import { TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket, SupportTicketComment } from '@bussiness/support/interfaces/support.interfaces';
import { IRepository } from '@globals/interfaces/repository.interface';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class ISupportTicketRepository extends IRepository<SupportTicket> {
  abstract supportTicketsPaged: SubjectProp<ResponseResult<SupportTicket[]>>;

  abstract addComment(comment: SupportTicketComment, ticketId: string): Promise<ResponseResult<SupportTicketComment>>;
  abstract updateStatus(id: string, status: TicketStatusIdEnum): Promise<ResponseResult<SupportTicket>>;
}
