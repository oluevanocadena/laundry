// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

import { Location } from '@bussiness/locations/locations.interfaces';
import { UISelectOption } from '@components/form-input/form-input.component';

export interface Product {
  id?: string;
  created_at?: string;

  Name: string;
  Description: string;
  Price: number;
  ImageUrl?: string;

  Barcode?: string;
  SKU?: string;
  ProductCategoryId: string;
  QtyStoresAvailable: number;

  Deleted?: boolean;
  Disabled?: boolean;
  Deletable?: boolean;

  OrganizationId: string;

  ProductLocations?: ProductLocation[]; // Only for UI
  ProductCategory?: ProductCategory; // Only for UI
  ProductImages?: ProductImage[]; // Only for UI
  ProductLocationPrice?: ProductLocationPrice[]; // Only for UI
}

export interface ProductLocation {
  id?: string;
  created_at?: string;

  ProductId: string;
  LocationId: string;
  IsEnabled: boolean;

  Location?: Location; // Only for UI
}

export interface ProductImage {
  id?: string; //uuid
  created_at?: string;
  ProductId: string;
  Url: string;
  Deleted?: boolean;
}

export interface ProductLocationPrice {
  id?: string;
  created_at?: string;

  ProductId: string;
  LocationId: string;
  Price: number;

  Location?: Location; // Only for UI
}

export interface ProductCategory extends UISelectOption {
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
