import { Customer } from '@bussiness/customers/customers.interfaces';
import { UIDefaultTableFilter } from '@globals/constants/supabase-tables.constants';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import { UtilsDomain } from '@globals/utils/utils.domain';

export const CustomerDefaultTableFilter: UITableFilter = {
  ...UIDefaultTableFilter,
  sortBy: 'created_at',
};

export const CustomerForGeneralSale: Customer = {
  id: UtilsDomain.guid(),
  Country: 'México',
  Email: 'cliente@ventageneral.com',
  FirstName: 'Cliente',
  LastName: 'General',
  FullName: 'Cliente público en general',
  Phone: '0000000000',
  Address: 'Venta en mostrador',
  Municipality: 'Municipio',
  Neighborhood: 'Colonia',
  Street: 'Calle',
  OrganizationId: '',
  State: 'Estado',
  ZipCode: '00000',
  Disabled: false,
  TotalOrders: 0,
};
