// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

export interface Product {
  id?: string;
  created_at?: string;

  Name: string;
  Description: string;
  Price: number;
  Stock: number;
  ImageUrl: string;

  Barcode?: string;
  SKU?: string;
  ProductCategoryId: string;

  Deleted?: boolean;
  Disabled?: boolean;

  OrganizationId: string;

  ProductCategory?: ProductCategory;
  ProductLocations?: ProductLocation[];
}

export interface ProductLocation {
  id?: string;
  created_at?: string;

  ProductId: string;
  LocationId: string;
  IsEnabled: boolean;

  StockByLocation?: number;
  PriceByLocation?: number;
}

export interface ProductCategory {
  id: string;
  Name: string;
  Deleted?: boolean;
}

// ::::::::::::::::::::::::::::::::::::::
// Requests
// ::::::::::::::::::::::::::::::::::::::

// ::::::::::::::::::::::::::::::::::::::
// Responses
// ::::::::::::::::::::::::::::::::::::::
