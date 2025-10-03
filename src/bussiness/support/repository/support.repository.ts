import { TicketStatusIdEnum } from '@bussiness/support/enums/support.enums';
import { SupportTicket, SupportTicketComment, SupportTicketImage } from '@bussiness/support/interfaces/support.interfaces';
import { SemiFullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class ISupportTicketRepository extends SemiFullRepository<SupportTicket> {
  abstract supportTicketsPaged: SubjectProp<ResponseResult<SupportTicket[]>>;

  abstract addComment(comment: SupportTicketComment, ticketId: string): Promise<ResponseResult<SupportTicketComment>>;
  abstract updateStatus(id: string, status: TicketStatusIdEnum): Promise<ResponseResult<SupportTicket>>;
  abstract deleteImage(id: string): Promise<ResponseResult<SupportTicketImage>>;
  abstract uploadImage(
    file: File,
    ticketId: string,
    orgId: string,
    isTicketEdition: boolean,
  ): Promise<ResponseResult<SupportTicketImage>>;
}
