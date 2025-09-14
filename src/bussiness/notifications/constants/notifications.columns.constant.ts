import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const NotificationsPageTableColumns: UITableColumn[] = [
  { label: 'Fecha', key: 'created_At', width: '130px', sortable: true, selected: true },
  { label: 'Titulo', key: 'Title', width: 'auto', sortable: true, selected: true },
  { label: 'Mensaje', key: 'Message', width: '150px', sortable: true, selected: true },
  { label: 'Estatus', key: 'Readed', width: '130px', sortable: true, selected: true },
];
