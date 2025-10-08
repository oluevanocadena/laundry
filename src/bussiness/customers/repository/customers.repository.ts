import { Customer } from '@bussiness/customers/interfaces/customers.interfaces';
import { FullRepository } from '@globals/interfaces/repository.definitions';
import { ResponseResult } from '@globals/interfaces/requests.interface';
import { PagedResults } from '@globals/interfaces/supabase.interface';
import { SubjectProp } from '@globals/types/subject.type';

export abstract class ICustomersRepository extends FullRepository<Customer> {
  // Subjects Results
  abstract customers: SubjectProp<ResponseResult<Customer[]>>;
  abstract pagedCustomers: SubjectProp<PagedResults<Customer>>;

  // Método específico para obtener el cliente POS (cliente general de mostrador)
  abstract getPosCustomer(organizationId: string, useCache?: boolean): Promise<ResponseResult<Customer>>;
}
