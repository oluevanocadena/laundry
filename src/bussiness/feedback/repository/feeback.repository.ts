import { FullRepository } from '@globals/interfaces/repository.definitions';
import { Feedback } from '@bussiness/feedback/interfaces/feeback.interfaces';

export abstract class IFeedbackRepository extends FullRepository<Feedback> {}
