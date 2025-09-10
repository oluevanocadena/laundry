import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const OrderPageTableColumns: UITableColumn[] = [
  { label: 'Order #', key: 'Order #', width: '80px', sortable: true },
  { label: 'Fecha', key: 'Fecha', width: '100px', sortable: true },
  { label: 'Estatus', key: 'Estatus', width: '100px', sortable: true },
  { label: 'Cliente', key: 'Cliente', width: 'auto', sortable: true },
  { label: 'Tipo de entrega', key: 'Tipo de entrega', width: '170px', sortable: true },
  { label: 'Pago', key: 'Pago', width: '80px', sortable: true },
  { label: 'Partidas', key: 'Partidas', width: '90px', sortable: true },
  { label: 'Total', key: 'Total', width: '85px', sortable: true },
];
