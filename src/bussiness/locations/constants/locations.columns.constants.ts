import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const LocationsPageTableColumns: UITableColumn[] = [
  { label: 'Estatus', key: 'Disabled', width: '80px', sortable: true, selected: true },
  { label: 'Nombre', key: 'Name', width: '150px', sortable: true, selected: true },
  { label: 'Fecha de creación', key: 'created_at', width: '130px', sortable: true, selected: true },
  { label: 'Teléfono', key: 'Phone', width: '130px', sortable: true, selected: true },
  { label: 'Dirección', key: 'Address', width: '300px', sortable: true, selected: true },
  { label: 'Predeterminada', key: 'Default', width: 'auto', sortable: true, selected: true },
];
