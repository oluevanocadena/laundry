// ::::::::::::::::::::::::::::::::::::::
// Models
// ::::::::::::::::::::::::::::::::::::::

import { Location } from '@bussiness/locations/interfaces/locations.interfaces';
import { ProductCategory } from '@bussiness/product-categories/interfaces/product-categories.interfaces';
import { UnitMeasure } from '@bussiness/products/interfaces/product.unitmeasure.interfaces';
import { UITableFilter } from '@globals/interfaces/ui.interfaces';

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

  UnitMeasureId: string;
  UnitMeasure?: UnitMeasure; // Only for UI

  Deleted?: boolean;
  Disabled?: boolean;
  Deletable?: boolean;
  Checked?: boolean; //Only for UI

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

export interface ProductRequest extends Omit<UITableFilter, 'dateFrom' | 'dateTo'> {
  disabled?: boolean | null;
}
