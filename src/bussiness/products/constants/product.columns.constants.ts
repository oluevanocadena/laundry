import { UITableColumn } from '@globals/interfaces/ui.interfaces';

export const ProductPageTableColumns: UITableColumn[] = [
  { label: 'Imagen', key: 'ImageUrl', width: '80px', sortable: true, selected: true },
  { label: 'Fecha', key: 'created_at', width: '150px', sortable: true, selected: true },
  { label: 'Nombre', key: 'Name', width: 'auto', sortable: true, selected: true },
  { label: 'Precio', key: 'Price', width: '120px', sortable: true, selected: true },
  { label: 'Disponibilidad', key: 'QtyStoresAvailable', width: 'auto', sortable: true, selected: true },
  { label: 'Category', key: 'ProductCategory', width: 'auto', sortable: true, selected: true },
  { label: 'Estatus', key: 'Disabled', width: '100px', sortable: true, selected: true },
];
