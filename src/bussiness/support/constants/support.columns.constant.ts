import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const SupportPageTableColumns: UITableColumn[] = [
  { label: 'Título', key: 'Title', width: '80px', sortable: true, selected: true },
  { label: 'Fecha', key: 'createdAt', width: '100px', sortable: true, selected: true },
  { label: 'Estatus', key: 'StatusId', width: '100px', sortable: true, selected: true },
  { label: 'Prioridad', key: 'Priority', width: '100px', sortable: true, selected: true },
  { label: 'Resuelto', key: 'resolved_At', width: '90px', sortable: true, selected: true },
  { label: 'Cerrado', key: 'closed_At', width: '90px', sortable: true, selected: true },
];
