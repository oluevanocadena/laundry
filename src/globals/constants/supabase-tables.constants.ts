import { UISelectOption } from '@components/form-input/form-input.component';
import { UITablePagination } from '@globals/interfaces/ui.interfaces';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';
import moment from 'moment';
export const SupabaseTables = {
  Accounts: 'Accounts',
  Roles: 'Roles',
  AccountRoles: 'AccountRoles',
  Customers: 'Customers',
  Locations: 'Locations',
  OrderItems: 'OrderItems',
  OrderItemStatuses: 'OrderItemStatuses',
  Orders: 'Orders',
  OrderStatuses: 'OrderStatuses',
  Organizations: 'Organizations',
  ProductCategories: 'ProductCategories',
  ProductImages: 'ProductImages',
  ProductLocationPrices: 'ProductLocationPrices',
  ProductLocations: 'ProductLocations',
  Products: 'Products',
  UnitMeasures: 'UnitMeasures',
  Notifications: 'Notifications',
  Statistics: 'Statistics',
  Analytics: 'Analytics',
};

export const SupabaseBuckets = {
  Products: 'products',
};

export const UITableConstants = {
  DefaultPage: 1,
  DefaultPageSize: 50,
};

export const UIDefaultTablePagination: UITablePagination = {
  page: UITableConstants.DefaultPage,
  pageSize: UITableConstants.DefaultPageSize,
  rowCount: 0,
  totalPages: 0,
};

export const UIDefaultTableFilter: UITableFilter = {
  page: UITableConstants.DefaultPage,
  pageSize: UITableConstants.DefaultPageSize,
  dateFrom: moment().toDate(),
  dateTo: moment().toDate(),
  statusId: 0,
  sortBy: '',
  sortOrder: 'asc',
};

export const UIPageSizesOptions: UISelectOption[] = [
  {
    id: 10,
    Name: '10',
  },
  {
    id: 20,
    Name: '20',
  },
  {
    id: 50,
    Name: '50',
  },
  {
    id: 100,
    Name: '100',
  },
];
