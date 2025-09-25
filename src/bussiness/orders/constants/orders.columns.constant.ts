import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const OrderPageTableColumns: UITableColumn[] = [
  { label: 'Order #', key: 'OrderNumber', width: '80px', sortable: true, selected: true },
  { label: 'Fecha', key: 'createdAt', width: '100px', sortable: true, selected: true },
  { label: 'Estatus', key: 'OrderStatus', width: '100px', sortable: true, selected: true },
  { label: 'Cliente', key: 'Customer', width: 'auto', sortable: true, selected: true },
  { label: 'Tipo de entrega', key: 'DeliveryType', width: '170px', sortable: true, selected: true },
  { label: 'Pago', key: 'Paid', width: '120px', sortable: true, selected: true },
  { label: 'Partidas', key: 'ItemCount', width: '90px', sortable: true, selected: true },
  { label: 'Total', key: 'Total', width: '85px', sortable: true, selected: true },
];
