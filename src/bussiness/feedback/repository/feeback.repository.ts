import { IRepository } from '@globals/interfaces/repository.interface';
import { Feedback } from '@bussiness/feedback/interfaces/feeback.interfaces';

export abstract class IFeedbackRepository extends IRepository<Feedback> {}
