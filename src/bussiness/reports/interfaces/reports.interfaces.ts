export interface SalesReport {
  id?: string;
  created_At?: string;
  updated_At?: string;

  Date: string;
  TotalSales: number;
  TotalProducts: number;
  TotalCustomers: number;
  TotalOrders: number;
  TotalRevenue: number;
}

export interface ProductReport {
  id?: string;
  created_At?: string;
  updated_At?: string;

  Date: string;
  TotalProducts: number;
  TotalSales: number;
}
