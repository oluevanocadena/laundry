import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const ProductCategoriesPageTableColumns: UITableColumn[] = [
  { label: 'Fecha', key: 'created_At', width: '150px', sortable: true, selected: true },
  { label: 'Nombre', key: 'Name', width: 'auto', sortable: true, selected: true },
  { label: 'Estatus', key: 'Disabled', width: '120px', sortable: true, selected: true },
];
