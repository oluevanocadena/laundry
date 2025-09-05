import { Product, UnitMeasure } from "@bussiness/products/products.interfaces";

export interface OrderItem {
    id?: string;
    createdAt?: string;
  
    Name: string;
    Description: string;
    ImageUrl?: string;
  
    Quantity: number;
  
    UnitMeasureId: string;
    UnitMeasure?: UnitMeasure; // Only for UI
  
    Price: number;
    Total: number; 
  
    ItemStatusId: number;
    ItemStatus?: OrderItemStatus; // For UI only
  
    OrderId?: string;
    ProductId?: string;
    Product?: Product; // For UI only
  
    Deleted: boolean;
  }

  
export interface OrderItemStatus {
    id: number;
    Name: string;
    Deleted: boolean;
  }