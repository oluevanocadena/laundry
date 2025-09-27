import { FeedbackTypeEnum } from '../enums/feeback.enums';

export interface Feedback {
  id?: string | null;
  OrganizationId: string;
  AccountId: string;
  Type: FeedbackTypeEnum;
  Title: string;
  Description?: string;
  created_At: string;
}
