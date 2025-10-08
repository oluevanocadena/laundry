import { PagedRequest } from '@globals/interfaces/requests.interface';

export interface OrganizationRequest extends PagedRequest {
  search?: string;
  disabled?: boolean;
}

