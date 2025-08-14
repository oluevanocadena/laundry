// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

export interface Order {
  id: string;
  createdAt: string;

  number: string;
  statusId: number;
  status: string;
  statusItems: string;
  statusItemsId: number;

  Deleted: boolean;
}
