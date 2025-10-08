import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const AccountsPageTableColumns: UITableColumn[] = [ 
  { label: 'Fecha', key: 'created_at', width: '150px', sortable: true, selected: true },
  { label: 'Nombre', key: 'FullName', width: 'auto', sortable: true, selected: true },
  { label: 'Email', key: 'Email', width: 'auto', sortable: true, selected: true },
  { label: 'Teléfono', key: 'Phone', width: '140px', sortable: true, selected: true },
  { label: 'Tipo', key: 'IsOwner', width: '110px', sortable: true, selected: true },
  { label: 'Estatus', key: 'Disabled', width: '90px', sortable: true, selected: true },
];
