import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const CustomerPageTableColumns: UITableColumn[] = [
  { label: 'Fecha', key: 'created_at', width: '150px', sortable: true, selected: true },
  { label: 'Nombre', key: 'FullName', width: 'auto', sortable: true, selected: true },
  { label: 'Teléfono', key: 'Phone', width: 'auto', sortable: true, selected: true },
  { label: 'Dirección', key: 'Address', width: '200px', sortable: true, selected: true },
  { label: 'Pedidos', key: 'TotalOrders', width: 'auto', sortable: true, selected: true },
  { label: 'Estatus', key: 'Disabled', width: '80px', sortable: true, selected: true },
];
